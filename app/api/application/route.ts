import { NextResponse } from 'next/server';

const RECIPIENT = process.env.APPLICATION_RECIPIENT_EMAIL ?? 'pratik@thehighlama.com';
const SENDER = process.env.APPLICATION_SENDER_EMAIL ?? 'retreat@blue-lotus-experience.com';

type ApplicationPayload = {
  fullName: string;
  ageRange: string;
  email: string;
  phone: string;
  location: string;
  seasonOfLife: string;
  meaningfulNote?: string;
  dietaryPreferences: string[];
  dietaryOther?: string;
  healthNotes?: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function field(label: string, value: string) {
  return `<p><strong>${escapeHtml(label)}:</strong><br />${escapeHtml(value || '—').replaceAll('\n', '<br />')}</p>`;
}

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: 'Email service is not configured.' }, { status: 503 });
  }

  const payload = (await request.json()) as ApplicationPayload;
  const required = [payload.fullName, payload.ageRange, payload.email, payload.phone, payload.location, payload.seasonOfLife];

  if (required.some((value) => typeof value !== 'string' || !value.trim())) {
    return NextResponse.json({ error: 'Missing required application details.' }, { status: 400 });
  }

  const html = [
    '<h2>New Blue Lotus Experience enquiry</h2>',
    field('Full name', payload.fullName),
    field('Age range', payload.ageRange),
    field('Email', payload.email),
    field('Phone', payload.phone),
    field('Location', payload.location),
    field('Season of life', payload.seasonOfLife),
    field('Meaningful note', payload.meaningfulNote ?? ''),
    field('Dietary preferences', payload.dietaryPreferences.join(', ')),
    field('Other dietary needs', payload.dietaryOther ?? ''),
    field('Health notes', payload.healthNotes ?? '')
  ].join('');

  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: `Blue Lotus Experience <${SENDER}>`,
      to: [RECIPIENT],
      reply_to: payload.email,
      subject: `New retreat enquiry from ${payload.fullName}`,
      html
    })
  });

  if (!resendResponse.ok) {
    console.error('Resend email failed', await resendResponse.text());
    return NextResponse.json({ error: 'Email delivery failed.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
