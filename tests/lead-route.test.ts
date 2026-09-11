import assert from 'node:assert/strict';
import { afterEach, test } from 'node:test';
import { POST } from '../app/api/lead/route';

const originalFetch = global.fetch;
const originalKey = process.env.RESEND_API_KEY;
afterEach(() => {
  global.fetch = originalFetch;
  if (originalKey === undefined) delete process.env.RESEND_API_KEY;
  else process.env.RESEND_API_KEY = originalKey;
});
const details = { name: 'Test Visitor', email: 'visitor@example.com', phone: '+91 9999999999', location: 'Test City' };
const id = 'bc9c6654-48b3-43ab-b8c9-9ed5585ddf21';
function request(body: unknown) {
  return new Request('http://localhost:3000/api/lead', { method: 'POST', body: JSON.stringify(body) });
}

test('rejects invalid and incomplete final submissions without contacting Resend', async () => {
  global.fetch = async () => { throw new Error('must not send'); };
  for (const body of [null, {}, { id, action: 'submit', details: { ...details, phone: '' } },
    { id, action: 'draft', details: { ...details, email: '', phone: '' } },
    { id, action: 'submit', details, website: 'spam.example' }]) {
    assert.equal((await POST(request(body))).status, 400);
  }
  assert.equal((await POST(new Request('http://localhost:3000/api/lead', { method: 'POST', body: '{' }))).status, 400);
});

test('captures partial contact, escapes HTML, and uses identical keys for autosave and submit', async () => {
  process.env.RESEND_API_KEY = 'test-only';
  const calls: RequestInit[] = [];
  global.fetch = async (_url, init) => { calls.push(init!); return Response.json({ id: 'provider-id' }); };
  const partial = { ...details, name: '<b>Test</b>', phone: '', location: '' };
  assert.equal((await POST(request({ id, action: 'draft', details: partial }))).status, 200);
  const message = JSON.parse(calls[0].body as string);
  assert.match(message.html, /&lt;b&gt;Test&lt;\/b&gt;/);
  assert.match(message.subject, /in progress/);
  assert.equal(message.reply_to, details.email);
  await POST(request({ id, action: 'draft', details }));
  await POST(request({ id, action: 'submit', details }));
  assert.equal(new Headers(calls[1].headers).get('Idempotency-Key'), new Headers(calls[2].headers).get('Idempotency-Key'));
  assert.equal(calls[1].body, calls[2].body);
});

test('reports provider failure and missing configuration instead of false success', async () => {
  delete process.env.RESEND_API_KEY;
  assert.equal((await POST(request({ id, action: 'submit', details }))).status, 503);
  process.env.RESEND_API_KEY = 'test-only';
  global.fetch = async () => Response.json({ error: 'unavailable' }, { status: 429 });
  assert.equal((await POST(request({ id, action: 'submit', details }))).status, 502);
  global.fetch = async () => { throw new Error('network failure'); };
  assert.equal((await POST(request({ id, action: 'submit', details }))).status, 502);
});
