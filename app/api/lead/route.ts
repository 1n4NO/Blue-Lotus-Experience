import { createHash } from 'node:crypto';
import { NextResponse } from 'next/server';
import { hasContact, leadErrors, leadFields, leadLimits, validEmail, type LeadDetails } from '@/lib/lead';

function escapeHtml(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;').replaceAll("'", '&#039;');
}

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) {
    return NextResponse.json({ error: 'Please use the form on our website.' }, { status: 403 });
  }
  const raw = await request.text();
  if (raw.length > 4096) return NextResponse.json({ error: 'Request too large.' }, { status: 413 });

  let payload;
  try { payload = JSON.parse(raw); } catch {
    return NextResponse.json({ error: 'Invalid form data.' }, { status: 400 });
  }
  if (!payload || typeof payload !== 'object' || !payload.details ||
      typeof payload.id !== 'string' || !/^[a-f0-9-]{36}$/i.test(payload.id) ||
      !['draft', 'submit'].includes(payload.action)) {
    return NextResponse.json({ error: 'Invalid form data.' }, { status: 400 });
  }
  if (payload.website) return NextResponse.json({ error: 'Unable to accept this request.' }, { status: 400 });
  const details = {} as LeadDetails;
  for (const key of leadFields) {
    if (typeof payload.details[key] !== 'string' || payload.details[key].length > leadLimits[key]) {
      return NextResponse.json({ error: 'Please check your details.' }, { status: 400 });
    }
    details[key] = payload.details[key].trim();
  }
  if (!hasContact(details) || (payload.action === 'submit' && Object.keys(leadErrors(details)).length)) {
    return NextResponse.json({ error: 'Please check your contact details.', fields: leadErrors(details) }, { status: 400 });
  }
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: 'We could not save your details. Please try again shortly.' }, { status: 503 });
  }

  // Resend deduplicates retries and the final Submit when the captured details are unchanged.
  const fingerprint = createHash('sha256').update(JSON.stringify(details)).digest('hex');
  const complete = Object.keys(leadErrors(details)).length === 0;
  const labels = { name: 'Name', email: 'Email', phone: 'Phone', location: 'Location' };
  const content = leadFields.map((key) => `${labels[key]}: ${details[key] || 'Not yet provided'}`).join('\n');
  const html = leadFields.map((key) => `<p><strong>${labels[key]}:</strong> ${escapeHtml(details[key] || 'Not yet provided')}</p>`).join('');
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': `lead-${payload.id}-${fingerprint}`
      },
      signal: AbortSignal.timeout(12000),
      body: JSON.stringify({
        from: `Blue Lotus Experience <${process.env.APPLICATION_SENDER_EMAIL ?? 'retreat@blue-lotus-experience.com'}>`,
        to: [process.env.APPLICATION_RECIPIENT_EMAIL ?? 'pratik@thehighlama.com'],
        ...(validEmail(details.email) ? { reply_to: details.email } : {}),
        subject: `Retreat enquiry${complete ? '' : ' (in progress)'}: ${details.name || 'New visitor'}`,
        text: `Blue Lotus Experience /apply\n${complete ? 'All four details captured.' : 'Partial details captured before Submit.'}\n\n${content}\n\nEnquiry reference: ${payload.id}\nUpdates with this reference belong to the same visitor.`,
        html: `<h2>Blue Lotus Experience enquiry</h2><p>Source: /apply. ${complete ? 'All four details captured.' : 'Partial details captured before Submit.'}</p>${html}<p>Enquiry reference: ${payload.id}<br />Updates with this reference belong to the same visitor.</p>`
      })
    });
    if (!response.ok) {
      console.error('Lead email failed', response.status);
      return NextResponse.json({ error: 'We could not save your details. Please try again.' }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'We could not save your details. Check your connection and try again.' }, { status: 502 });
  }
}
