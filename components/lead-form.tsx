'use client';

import Link from 'next/link';
import { ArrowUpRight, Check } from 'lucide-react';
import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import { emptyLead, hasContact, leadErrors, leadFields, leadLimits, type LeadDetails, type LeadField } from '@/lib/lead';

const labels = { name: 'Name', email: 'Email', phone: 'Phone', location: 'Location' };
const autocomplete = { name: 'name', email: 'email', phone: 'tel', location: 'address-level2' };

export function LeadForm() {
  const [details, setDetails] = useState<LeadDetails>({ ...emptyLead });
  const [errors, setErrors] = useState<Partial<Record<LeadField, string>>>({});
  const [status, setStatus] = useState('');
  const [saveError, setSaveError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const id = useRef('');
  const saved = useRef('');
  const queue = useRef<Promise<boolean>>(Promise.resolve(true));
  const trap = useRef<HTMLInputElement>(null);
  const successHeading = useRef<HTMLHeadingElement>(null);

  const save = useCallback((values: LeadDetails, action: 'draft' | 'submit') => {
    const snapshot = Object.fromEntries(leadFields.map((key) => [key, values[key].trim()])) as LeadDetails;
    if (!hasContact(snapshot)) return Promise.resolve(false);
    const serialized = JSON.stringify(snapshot);
    const task = async () => {
      if (saved.current === serialized) return true;
      if (!id.current) {
        try {
          id.current = sessionStorage.getItem('blue-lotus-lead-id') || crypto.randomUUID();
          sessionStorage.setItem('blue-lotus-lead-id', id.current);
        } catch { id.current = crypto.randomUUID(); }
      }
      setStatus('Saving your details…');
      setSaveError('');
      try {
        const response = await fetch('/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          keepalive: true,
          body: JSON.stringify({ id: id.current, details: snapshot, action, website: trap.current?.value || '' })
        });
        if (!response.ok) throw new Error('save failed');
        const result = await response.json();
        if (!result.ok) throw new Error('save failed');
        saved.current = serialized;
        setStatus('Your details have been saved.');
        return true;
      } catch {
        setStatus('');
        setSaveError('Your details could not be saved. Please check your connection and press Submit to try again.');
        return false;
      }
    };
    // Serialize snapshots so typing and Submit cannot race or send the same details twice.
    queue.current = queue.current.then(task, task);
    return queue.current;
  }, []);

  useEffect(() => {
    if (success || submitting || Object.keys(leadErrors(details)).length) return;
    const timer = window.setTimeout(() => { void save(details, 'draft'); }, 900);
    return () => window.clearTimeout(timer);
  }, [details, save, submitting, success]);

  useEffect(() => {
    if (success) successHeading.current?.focus();
  }, [success]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    const nextErrors = leadErrors(details);
    setErrors(nextErrors);
    const firstInvalid = leadFields.find((key) => nextErrors[key]);
    if (firstInvalid) {
      document.getElementById(`lead-${firstInvalid}`)?.focus();
      return;
    }
    setSubmitting(true);
    const ok = await save(details, 'submit');
    setSubmitting(false);
    if (ok) setSuccess(true);
  }

  if (success) return (
    <div className="mt-9 border-t border-white/15 pt-8">
      <Check className="mb-5 h-7 w-7 text-gold" strokeWidth={1.5} aria-hidden="true" />
      <h2 ref={successHeading} tabIndex={-1} className="font-display text-3xl leading-snug text-text focus:outline-none">
        Thank you. You’re on your way.
      </h2>
      <p className="mt-4 text-base leading-7 text-muted">Your details have reached us. Take a moment to explore the experience.</p>
      <Link href="/" className="mt-7 inline-flex min-h-12 items-center justify-center gap-3 border border-gold/60 bg-gold/10 px-6 py-4 text-sm text-text transition-colors hover:bg-gold/20">
        Explore the website <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  );

  return (
    <form onSubmit={submit} noValidate className="mt-7" aria-label="Retreat enquiry" aria-describedby="lead-notice">
      <p id="lead-notice" className="mb-6 text-sm leading-6 text-muted">
        Your details are shared with the Blue Lotus team as you fill in this form, so we can contact you about the retreat.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {leadFields.map((key) => (
          <div key={key}>
            <label htmlFor={`lead-${key}`} className="mb-2 block text-sm text-text">{labels[key]}</label>
            <input
              id={`lead-${key}`}
              name={key}
              type={key === 'email' ? 'email' : key === 'phone' ? 'tel' : 'text'}
              autoComplete={autocomplete[key]}
              inputMode={key === 'phone' ? 'tel' : key === 'email' ? 'email' : 'text'}
              maxLength={leadLimits[key]}
              required
              disabled={submitting}
              value={details[key]}
              onChange={(event) => {
                setDetails((current) => ({ ...current, [key]: event.target.value }));
                setErrors((current) => ({ ...current, [key]: undefined }));
                setStatus('');
              }}
              onBlur={() => { if (!submitting) void save(details, 'draft'); }}
              aria-invalid={Boolean(errors[key])}
              aria-describedby={errors[key] ? `lead-${key}-error` : undefined}
              className="min-h-12 w-full rounded-none border border-white/25 bg-background/60 px-4 py-3 text-base text-text transition-colors hover:border-white/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold disabled:opacity-60"
            />
            {errors[key] && <p id={`lead-${key}-error`} className="mt-2 text-sm text-red-200">{errors[key]}</p>}
          </div>
        ))}
      </div>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="lead-website">Website</label>
        <input ref={trap} id="lead-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <p className="mt-4 min-h-6 text-sm leading-6 text-muted" role="status" aria-live="polite">{status}</p>
      {saveError && <p role="alert" className="mt-2 text-sm leading-6 text-red-200">{saveError}</p>}
      <button type="submit" disabled={submitting} className="mt-4 flex min-h-14 w-full items-center justify-center gap-3 border border-gold/60 bg-gold/10 px-6 py-4 text-sm text-text transition-colors hover:bg-gold/20 disabled:cursor-wait disabled:opacity-60">
        {submitting ? 'Submitting…' : 'Submit'} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </form>
  );
}
