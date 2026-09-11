# Blue Lotus Experience

Project assets for the November 2026 Kodaikanal retreat.

## Files
- `01_Blue_Lotus_Experience_Retreat_Concept.pdf`
- `02_Blue_Lotus_Experience_Instagram_Creatives.pdf`


## Ad enquiry landing page

`/apply` collects Name, Email, Phone, and Location. It uses `/api/lead` and the same `RESEND_API_KEY`, `APPLICATION_SENDER_EMAIL`, and `APPLICATION_RECIPIENT_EMAIL` settings as the existing application email endpoint. No database is required.

A completed field triggers capture after a valid email or phone is available. All four valid fields also trigger capture after a short pause. Each changed snapshot is emailed with a common enquiry reference; incomplete enquiries are labeled in progress. The visible notice explains capture before Submit. Submit validates all four fields, waits for confirmed delivery to Resend, and shows the website link. Unchanged snapshots are deduplicated in the browser and with Resend idempotency keys (24-hour provider window). Resend acceptance does not guarantee inbox delivery. Personal details are not stored in browser storage; only an anonymous enquiry ID is kept for the tab session.

Run API behavior checks with `npx --yes tsx --test tests/lead-route.test.ts`. These mock Resend and do not send email.
