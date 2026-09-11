export const leadFields = ['name', 'email', 'phone', 'location'] as const;
export type LeadField = (typeof leadFields)[number];
export type LeadDetails = Record<LeadField, string>;
export const emptyLead: LeadDetails = { name: '', email: '', phone: '', location: '' };
export const leadLimits: Record<LeadField, number> = { name: 120, email: 254, phone: 40, location: 160 };

export function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function validPhone(value: string) {
  const digits = value.replace(/\D/g, '');
  return /^[+\d\s().-]+$/.test(value.trim()) && digits.length >= 7 && digits.length <= 15;
}

export function leadErrors(details: LeadDetails): Partial<Record<LeadField, string>> {
  return {
    ...(!details.name.trim() ? { name: 'Please enter your name.' } : {}),
    ...(!validEmail(details.email) ? { email: 'Please enter a valid email address.' } : {}),
    ...(!validPhone(details.phone) ? { phone: 'Please enter a valid phone number, including your country code.' } : {}),
    ...(!details.location.trim() ? { location: 'Please enter your city or location.' } : {})
  };
}

export function hasContact(details: LeadDetails) {
  return validEmail(details.email) || validPhone(details.phone);
}
