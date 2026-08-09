export type AgeRange = '18-24' | '25-34' | '35-44' | '45-54' | '55+';

export const AGE_RANGES: AgeRange[] = ['18-24', '25-34', '35-44', '45-54', '55+'];

export type SeasonOfLife =
  | 'Looking to slow down'
  | 'Feeling creatively stuck'
  | 'Seeking clarity'
  | 'Reconnecting with nature'
  | 'Simply curious';

export const SEASONS_OF_LIFE: SeasonOfLife[] = [
  'Looking to slow down',
  'Feeling creatively stuck',
  'Seeking clarity',
  'Reconnecting with nature',
  'Simply curious'
];

export type DietaryPreference = 'Vegan' | 'Gluten-free' | 'No restrictions' | 'Other';

export const DIETARY_PREFERENCES: DietaryPreference[] = [
  'Vegan',
  'Gluten-free',
  'No restrictions',
  'Other'
];

export type ApplicationFormData = {
  fullName: string;
  ageRange: AgeRange | '';
  email: string;
  phone: string;
  location: string;
  seasonOfLife: SeasonOfLife | '';
  meaningfulNote: string;
  dietaryPreferences: DietaryPreference[];
  dietaryOther: string;
  healthNotes: string;
  agreedToTerms: boolean;
};

export const INITIAL_APPLICATION_FORM_DATA: ApplicationFormData = {
  fullName: '',
  ageRange: '',
  email: '',
  phone: '',
  location: '',
  seasonOfLife: '',
  meaningfulNote: '',
  dietaryPreferences: [],
  dietaryOther: '',
  healthNotes: '',
  agreedToTerms: false
};
