'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, X } from 'lucide-react';

import { cn } from '@/lib/cn';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import {
  AGE_RANGES,
  DIETARY_PREFERENCES,
  INITIAL_APPLICATION_FORM_DATA,
  SEASONS_OF_LIFE,
  type ApplicationFormData,
  type DietaryPreference
} from '@/types/application';

type Status = 'idle' | 'submitting' | 'success' | 'error';

type StepConfig = {
  title: string;
  image: string;
};

const STEPS: StepConfig[] = [
  { title: "Let's start with you.", image: '/images/gallery/1.png' },
  { title: 'How can we reach you?', image: '/images/gallery/3.png' },
  { title: 'Where are you, right now?', image: '/images/gallery/12.png' },
  { title: 'A few preferences.', image: '/images/gallery/6.png' },
  { title: 'Anything we should know?', image: '/images/gallery/18.png' },
  { title: 'One last thing.', image: '/images/gallery/11.png' }
];

const STEP_COUNT = STEPS.length;

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function ApplicationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<ApplicationFormData>(INITIAL_APPLICATION_FORM_DATA);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const reduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const resetForm = () => {
    setStep(0);
    setFormData(INITIAL_APPLICATION_FORM_DATA);
    setStatus('idle');
    setErrorMessage('');
  };

  const updateField = <K extends keyof ApplicationFormData>(key: K, value: ApplicationFormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const toggleDietary = (option: DietaryPreference) => {
    setFormData((prev) => {
      if (option === 'No restrictions') {
        const isSelected = prev.dietaryPreferences.includes('No restrictions');
        return {
          ...prev,
          dietaryPreferences: isSelected ? [] : ['No restrictions'],
          dietaryOther: ''
        };
      }

      const withoutBlanket = prev.dietaryPreferences.filter((item) => item !== 'No restrictions');
      const isSelected = withoutBlanket.includes(option);
      const next = isSelected
        ? withoutBlanket.filter((item) => item !== option)
        : [...withoutBlanket, option];

      return {
        ...prev,
        dietaryPreferences: next,
        dietaryOther: next.includes('Other') ? prev.dietaryOther : ''
      };
    });
  };

  const canContinue = (() => {
    switch (step) {
      case 0:
        return formData.fullName.trim().length > 1 && formData.ageRange !== '';
      case 1:
        return (
          isValidEmail(formData.email) &&
          formData.phone.trim().length > 5 &&
          formData.location.trim().length > 1
        );
      case 2:
        return formData.seasonOfLife !== '';
      case 3:
        return (
          formData.dietaryPreferences.length > 0 &&
          (!formData.dietaryPreferences.includes('Other') || formData.dietaryOther.trim().length > 0)
        );
      case 4:
        return true;
      case 5:
        return formData.agreedToTerms;
      default:
        return false;
    }
  })();

  const isLastStep = step === STEP_COUNT - 1;

  const handleSubmit = async () => {
    setStatus('submitting');
    setErrorMessage('');

    if (!isSupabaseConfigured) {
      setStatus('error');
      setErrorMessage(
        'The application form is not connected yet. Add your Supabase keys to .env.local and restart the dev server.'
      );
      return;
    }

    const { error } = await supabase.from('applications').insert({
      full_name: formData.fullName.trim(),
      age_range: formData.ageRange,
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      location: formData.location.trim(),
      season_of_life: formData.seasonOfLife,
      meaningful_note: formData.meaningfulNote.trim() || null,
      dietary_preferences: formData.dietaryPreferences,
      dietary_other: formData.dietaryOther.trim() || null,
      health_notes: formData.healthNotes.trim() || null,
      agreed_to_terms: formData.agreedToTerms
    });

    if (error) {
      setStatus('error');
      setErrorMessage('Something went wrong sending your application. Please try again in a moment.');
      return;
    }

    setStatus('success');
  };

  const handleContinue = () => {
    if (!canContinue || status === 'submitting') return;

    if (isLastStep) {
      void handleSubmit();
      return;
    }

    setStep((value) => Math.min(value + 1, STEP_COUNT - 1));
  };

  const handleBack = () => {
    if (status === 'submitting') return;
    setStep((value) => Math.max(value - 1, 0));
  };

  const handleClose = () => {
    if (status === 'submitting') return;
    onClose();
  };

  const hasHealthNotes = formData.healthNotes.trim().length > 0;

  return (
    <AnimatePresence onExitComplete={resetForm}>
      {isOpen ? (
        <motion.div
          key="application-modal-backdrop"
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            aria-hidden="true"
            onClick={handleClose}
            className="absolute inset-0 bg-black/72 backdrop-blur-sm"
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Apply to Blue Lotus Experience"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 24, scale: 0.98 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: reduceMotion ? 0.12 : 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-surface shadow-[0_60px_140px_rgba(0,0,0,0.6)] sm:flex-row"
          >
            <button
              type="button"
              onClick={handleClose}
              disabled={status === 'submitting'}
              aria-label="Close application form"
              className="absolute right-4 top-4 z-30 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/30 text-text/70 backdrop-blur transition duration-300 hover:border-white/30 hover:text-text disabled:opacity-40"
            >
              <X className="h-4 w-4" />
            </button>

            {status === 'success' ? (
              <SuccessPanel onClose={handleClose} />
            ) : (
              <>
                <div className="relative h-36 flex-none overflow-hidden sm:h-auto sm:w-[36%]">
                  <Image
                    src={STEPS[step].image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, 36vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/5 sm:bg-gradient-to-r sm:from-black/75 sm:via-black/25 sm:to-black/10" />
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:bottom-7 sm:left-6 sm:right-6 sm:p-0">
                    <p className="font-ui text-[0.6rem] uppercase tracking-[0.32em] text-gold/90">
                      Step {step + 1} of {STEP_COUNT}
                    </p>
                    <p className="mt-2 max-w-[16rem] font-display text-[1.35rem] font-normal leading-[1.2] tracking-normal text-text text-balance">
                      {STEPS[step].title}
                    </p>
                  </div>
                </div>

                <div className="flex min-h-0 flex-1 flex-col">
                  <div className="flex flex-none gap-1.5 px-6 pt-6 sm:px-8">
                    {STEPS.map((_, index) => (
                      <span
                        key={index}
                        className={cn(
                          'h-[3px] flex-1 rounded-full transition-colors duration-500',
                          index <= step ? 'bg-gold/80' : 'bg-white/10'
                        )}
                      />
                    ))}
                  </div>

                  <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-8">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={step}
                        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -16 }}
                        transition={{ duration: reduceMotion ? 0.1 : 0.32, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {step === 0 ? (
                          <StepBasics formData={formData} updateField={updateField} />
                        ) : null}
                        {step === 1 ? (
                          <StepContact formData={formData} updateField={updateField} />
                        ) : null}
                        {step === 2 ? (
                          <StepSeason formData={formData} updateField={updateField} />
                        ) : null}
                        {step === 3 ? (
                          <StepPreferences formData={formData} updateField={updateField} toggleDietary={toggleDietary} />
                        ) : null}
                        {step === 4 ? (
                          <StepHealth formData={formData} updateField={updateField} />
                        ) : null}
                        {step === 5 ? (
                          <StepConfirm
                            formData={formData}
                            updateField={updateField}
                            hasHealthNotes={hasHealthNotes}
                          />
                        ) : null}
                      </motion.div>
                    </AnimatePresence>

                    {status === 'error' ? (
                      <p className="mt-5 text-sm leading-6 text-red-400">{errorMessage}</p>
                    ) : null}
                  </div>

                  <div className="flex flex-none items-center justify-between gap-4 border-t border-white/8 px-6 py-5 sm:px-8">
                    <button
                      type="button"
                      onClick={handleBack}
                      disabled={step === 0 || status === 'submitting'}
                      className="font-ui text-[0.68rem] uppercase tracking-[0.28em] text-muted transition duration-300 hover:text-text disabled:opacity-30"
                    >
                      Back
                    </button>

                    <button
                      type="button"
                      onClick={handleContinue}
                      disabled={!canContinue || status === 'submitting'}
                      className="inline-flex items-center gap-2 border border-white/12 bg-white/8 px-5 py-2.5 font-ui text-[0.68rem] uppercase tracking-[0.28em] text-text transition duration-500 ease-calm hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/12 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
                    >
                      {status === 'submitting' ? 'Submitting' : isLastStep ? 'Submit Application' : 'Continue'}
                      {status !== 'submitting' ? <ArrowRight className="h-3.5 w-3.5" /> : null}
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function FieldLabel({ children }: { children: string }) {
  return (
    <label className="mb-2 block font-ui text-[0.62rem] uppercase tracking-[0.3em] text-gold/75">
      {children}
    </label>
  );
}

const inputClasses =
  'w-full border border-white/12 bg-white/[0.04] px-4 py-3 font-body text-[0.95rem] text-text placeholder:text-white/30 outline-none transition duration-300 focus:border-white/30 focus:bg-white/[0.06]';

function PillOption({
  label,
  active,
  onClick
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'w-full border px-4 py-3 text-left font-body text-[0.92rem] leading-[1.3] transition duration-300',
        active
          ? 'border-gold/60 bg-gold/10 text-text'
          : 'border-white/12 bg-white/[0.02] text-muted hover:border-white/24 hover:text-text'
      )}
    >
      {label}
    </button>
  );
}

function CheckOption({
  label,
  active,
  onClick
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'flex w-full items-center gap-3 border px-4 py-3 text-left font-body text-[0.92rem] transition duration-300',
        active
          ? 'border-gold/60 bg-gold/10 text-text'
          : 'border-white/12 bg-white/[0.02] text-muted hover:border-white/24 hover:text-text'
      )}
    >
      <span
        className={cn(
          'flex h-4 w-4 flex-none items-center justify-center rounded-[4px] border transition duration-300',
          active ? 'border-gold/70 bg-gold/80' : 'border-white/25 bg-transparent'
        )}
      >
        {active ? <Check className="h-3 w-3 text-background" strokeWidth={3} /> : null}
      </span>
      {label}
    </button>
  );
}

function StepHeading({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-6">
      <h3 className="font-display text-[1.5rem] font-normal leading-[1.2] tracking-normal text-text">
        {title}
      </h3>
      {description ? <p className="mt-2 text-sm leading-6 text-muted">{description}</p> : null}
    </div>
  );
}

function StepBasics({
  formData,
  updateField
}: {
  formData: ApplicationFormData;
  updateField: <K extends keyof ApplicationFormData>(key: K, value: ApplicationFormData[K]) => void;
}) {
  return (
    <div className="space-y-6">
      <StepHeading title="Let's start with you." />

      <div>
        <FieldLabel>Full name</FieldLabel>
        <input
          type="text"
          value={formData.fullName}
          onChange={(event) => updateField('fullName', event.target.value)}
          placeholder="Your name"
          className={inputClasses}
        />
      </div>

      <div>
        <FieldLabel>Age range</FieldLabel>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {AGE_RANGES.map((range) => (
            <PillOption
              key={range}
              label={range}
              active={formData.ageRange === range}
              onClick={() => updateField('ageRange', range)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function StepContact({
  formData,
  updateField
}: {
  formData: ApplicationFormData;
  updateField: <K extends keyof ApplicationFormData>(key: K, value: ApplicationFormData[K]) => void;
}) {
  return (
    <div className="space-y-6">
      <StepHeading title="How can we reach you?" />

      <div>
        <FieldLabel>Email</FieldLabel>
        <input
          type="email"
          value={formData.email}
          onChange={(event) => updateField('email', event.target.value)}
          placeholder="you@example.com"
          className={inputClasses}
        />
      </div>

      <div>
        <FieldLabel>Phone number</FieldLabel>
        <input
          type="tel"
          value={formData.phone}
          onChange={(event) => updateField('phone', event.target.value)}
          placeholder="+91 00000 00000"
          className={inputClasses}
        />
      </div>

      <div>
        <FieldLabel>Location</FieldLabel>
        <input
          type="text"
          value={formData.location}
          onChange={(event) => updateField('location', event.target.value)}
          placeholder="City, country"
          className={inputClasses}
        />
      </div>
    </div>
  );
}

function StepSeason({
  formData,
  updateField
}: {
  formData: ApplicationFormData;
  updateField: <K extends keyof ApplicationFormData>(key: K, value: ApplicationFormData[K]) => void;
}) {
  return (
    <div className="space-y-6">
      <StepHeading title="Where are you, right now?" description="Choose whichever feels closest." />

      <div className="space-y-2.5">
        {SEASONS_OF_LIFE.map((season) => (
          <PillOption
            key={season}
            label={season}
            active={formData.seasonOfLife === season}
            onClick={() => updateField('seasonOfLife', season)}
          />
        ))}
      </div>

      <div>
        <FieldLabel>What would make these two days meaningful for you? (optional)</FieldLabel>
        <textarea
          value={formData.meaningfulNote}
          onChange={(event) => updateField('meaningfulNote', event.target.value)}
          rows={3}
          placeholder="Share as much or as little as you'd like."
          className={cn(inputClasses, 'resize-none')}
        />
      </div>
    </div>
  );
}

function StepPreferences({
  formData,
  updateField,
  toggleDietary
}: {
  formData: ApplicationFormData;
  updateField: <K extends keyof ApplicationFormData>(key: K, value: ApplicationFormData[K]) => void;
  toggleDietary: (option: DietaryPreference) => void;
}) {
  return (
    <div className="space-y-6">
      <StepHeading title="A few preferences." description="For meals during the retreat." />

      <div className="space-y-2.5">
        {DIETARY_PREFERENCES.map((option) => (
          <CheckOption
            key={option}
            label={option}
            active={formData.dietaryPreferences.includes(option)}
            onClick={() => toggleDietary(option)}
          />
        ))}
      </div>

      {formData.dietaryPreferences.includes('Other') ? (
        <div>
          <FieldLabel>Tell us more</FieldLabel>
          <textarea
            value={formData.dietaryOther}
            onChange={(event) => updateField('dietaryOther', event.target.value)}
            rows={2}
            placeholder="Any other dietary needs we should know about."
            className={cn(inputClasses, 'resize-none')}
          />
        </div>
      ) : null}
    </div>
  );
}

function StepHealth({
  formData,
  updateField
}: {
  formData: ApplicationFormData;
  updateField: <K extends keyof ApplicationFormData>(key: K, value: ApplicationFormData[K]) => void;
}) {
  return (
    <div className="space-y-6">
      <StepHeading title="Anything we should know?" />

      <div>
        <FieldLabel>
          Are there any accessibility needs, medical considerations, allergies, or other health
          information you'd like us to know about? (optional)
        </FieldLabel>
        <textarea
          value={formData.healthNotes}
          onChange={(event) => updateField('healthNotes', event.target.value)}
          rows={4}
          placeholder="Share whatever would help us take good care of you."
          className={cn(inputClasses, 'resize-none')}
        />
      </div>
    </div>
  );
}

function StepConfirm({
  formData,
  updateField,
  hasHealthNotes
}: {
  formData: ApplicationFormData;
  updateField: <K extends keyof ApplicationFormData>(key: K, value: ApplicationFormData[K]) => void;
  hasHealthNotes: boolean;
}) {
  return (
    <div className="space-y-6">
      <StepHeading title="One last thing." />

      <p className="text-sm leading-7 text-muted">
        {hasHealthNotes
          ? "Thank you. We've noted what you shared about accessibility, medical considerations, or allergies."
          : "Thank you. We've noted that there are no accessibility or medical considerations to flag."}{' '}
        One final step is to confirm that you understand this is an intimate retreat limited to
        eleven participants, and that you agree to the retreat's terms and expectations. Do you
        agree?
      </p>

      <p className="text-sm italic leading-7 text-muted/80">
        I understand this retreat is intentionally small, transportation and accommodation are not
        included, and my application does not guarantee a seat.
      </p>

      <div className="space-y-3">
        <CheckOption
          label="Yes, I agree to the terms and expectations above."
          active={formData.agreedToTerms}
          onClick={() => updateField('agreedToTerms', !formData.agreedToTerms)}
        />

        <Link
          href="/terms"
          target="_blank"
          rel="noreferrer"
          className="inline-block border-b border-white/20 pb-0.5 font-ui text-[0.68rem] uppercase tracking-[0.24em] text-gold/80 transition duration-300 hover:border-white/40 hover:text-gold"
        >
          Read the full terms and conditions
        </Link>
      </div>
    </div>
  );
}

function SuccessPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 py-20 text-center">
      <p className="font-ui text-[0.68rem] uppercase tracking-[0.34em] text-gold/80">
        Application Received
      </p>
      <h3 className="max-w-sm font-display text-[1.9rem] font-normal leading-[1.2] tracking-normal text-text text-balance">
        Thank you. We'll be in touch soon.
      </h3>
      <p className="max-w-sm text-sm leading-7 text-muted">
        Applications are reviewed personally. If selected, you'll receive a confirmation and
        payment details by email.
      </p>
      <button
        type="button"
        onClick={onClose}
        className="mt-2 inline-flex items-center justify-center border border-white/12 bg-white/8 px-6 py-3 font-ui text-[0.68rem] uppercase tracking-[0.28em] text-text transition duration-500 ease-calm hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/12"
      >
        Close
      </button>
    </div>
  );
}
