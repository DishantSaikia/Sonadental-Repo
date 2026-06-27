import { NextResponse } from 'next/server'

export const revalidate = 86400 // cache for 24 hours

interface GoogleReview {
  author_name: string
  author_url: string
  profile_photo_url: string
  rating: number
  relative_time_description: string
  text: string
  time: number
}

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID

  if (!apiKey || !placeId || apiKey === 'YOUR_API_KEY_HERE' || placeId === 'YOUR_PLACE_ID_HERE') {
    return NextResponse.json({ reviews: [], rating: null, configured: false })
  }

  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews&reviews_sort=newest&key=${apiKey}`,
      { next: { revalidate: 86400 } }
    )

    const data = await res.json()

    if (data.status !== 'OK') {
      console.error('Places API error:', data.status, data.error_message)
      return NextResponse.json({ reviews: [], rating: null, configured: true, error: data.status })
    }

    const allReviews: GoogleReview[] = data.result?.reviews ?? []
    const fiveStarReviews = allReviews
      .filter((r) => r.rating === 5 && r.text?.trim().length > 20)
      .slice(0, 6)

    return NextResponse.json({
      reviews: fiveStarReviews,
      rating: data.result?.rating ?? null,
      totalRatings: data.result?.user_ratings_total ?? null,
      configured: true,
    })
  } catch (err) {
    console.error('Failed to fetch reviews:', err)
    return NextResponse.json({ reviews: [], rating: null, configured: true, error: 'fetch_failed' })
  }
}
