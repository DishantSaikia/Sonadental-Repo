import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { name, phone, email, notes, service, date, time } = await req.json()

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    // Still mark as success so the patient sees confirmation
    return NextResponse.json({ ok: true })
  }

  const lines = [
    '🦷 *New Appointment Request*',
    '',
    `👤 *Patient:* ${name}`,
    `📞 *Phone:* ${phone}`,
    email ? `📧 *Email:* ${email}` : null,
    `💉 *Treatment:* ${service}`,
    `📅 *Date:* ${date}`,
    `🕐 *Time:* ${time}`,
    notes ? `📝 *Notes:* ${notes}` : null,
  ].filter(Boolean).join('\n')

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: lines, parse_mode: 'Markdown' }),
  })

  return NextResponse.json({ ok: true })
}
