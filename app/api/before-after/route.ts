import { NextResponse } from 'next/server'

export const revalidate = 0

function slugToLabel(slug: string): string {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

export async function GET(req: Request) {
  const cloud = process.env.CLOUDINARY_CLOUD_NAME
  const key = process.env.CLOUDINARY_API_KEY
  const secret = process.env.CLOUDINARY_API_SECRET

  if (!cloud || !key || !secret) return NextResponse.json({ error: 'missing env vars' })

  const auth = Buffer.from(`${key}:${secret}`).toString('base64')
  const url = new URL(req.url)
  const debug = url.searchParams.get('debug') === '1'

  // Try the DAM folder assets endpoint first, fall back to standard resources
  const folderRes = await fetch(
    `https://api.cloudinary.com/v1_1/${cloud}/folders/before-after/assets?max_results=200`,
    { headers: { Authorization: `Basic ${auth}` } }
  )
  const folderData = await folderRes.json()

  // Also try standard resources endpoint with asset_folder filter
  const stdRes = await fetch(
    `https://api.cloudinary.com/v1_1/${cloud}/resources/image?type=upload&max_results=200`,
    { headers: { Authorization: `Basic ${auth}` } }
  )
  const stdData = await stdRes.json()

  // Also check account usage (confirms creds are right) and try without image filter
  const usageRes = await fetch(
    `https://api.cloudinary.com/v1_1/${cloud}/usage`,
    { headers: { Authorization: `Basic ${auth}` } }
  )
  const usageData = await usageRes.json()

  const allRes = await fetch(
    `https://api.cloudinary.com/v1_1/${cloud}/resources?max_results=10`,
    { headers: { Authorization: `Basic ${auth}` } }
  )
  const allData = await allRes.json()

  if (debug) {
    return NextResponse.json({
      usage_status: usageRes.status,
      usage: { plan: usageData.plan, objects: usageData.objects, bandwidth: usageData.bandwidth },
      usage_error: usageData.error,
      all_resources_status: allRes.status,
      all_resources_count: allData.resources?.length ?? 0,
      all_resources_sample: allData.resources?.slice(0, 3),
      all_error: allData.error,
      std_status: stdRes.status,
      std_raw: stdData,
    })
  }

  // Prefer folder API assets, fall back to standard filtered by folder
  const folderResources = folderData.resources ?? folderData.assets ?? []
  const stdResources = (stdData.resources ?? []).filter((r: { asset_folder?: string; public_id: string }) =>
    r.asset_folder === 'before-after' || r.public_id.startsWith('before-after/')
  )
  const allResources = folderResources.length > 0 ? folderResources : stdResources

  const resources: Array<{
    public_id: string
    secure_url: string
    created_at: string
    asset_folder?: string
    display_name?: string
  }> = allResources

  const inFolder = resources.filter(r =>
    r.asset_folder === 'before-after' ||
    r.public_id.startsWith('before-after/')
  )

  const map: Record<string, { before?: string; after?: string; created_at?: string }> = {}

  for (const r of inFolder) {
    const filename = r.display_name ?? (r.public_id.includes('/') ? r.public_id.split('/').pop()! : r.public_id)
    const isBefore = filename.toLowerCase().endsWith('-before')
    const isAfter = filename.toLowerCase().endsWith('-after')
    if (!isBefore && !isAfter) continue

    const slug = filename.replace(/-before$/i, '').replace(/-after$/i, '')
    if (!map[slug]) map[slug] = {}
    if (isBefore) { map[slug].before = r.secure_url; map[slug].created_at = r.created_at }
    if (isAfter) map[slug].after = r.secure_url
  }

  const pairs = Object.entries(map)
    .filter(([, v]) => v.before && v.after)
    .sort((a, b) => (b[1].created_at ?? '').localeCompare(a[1].created_at ?? ''))
    .map(([slug, v]) => ({
      slug,
      label: slugToLabel(slug),
      before: v.before!,
      after: v.after!,
    }))

  return NextResponse.json(pairs)
}
