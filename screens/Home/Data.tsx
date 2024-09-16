export type ItemType = {
  title: string;
  subtitle: string;
  options?: string[];
  type: string;
};

export const Item = [
  {
    title: 'Menstrual Period',
    options: ['I’m on my period', 'I’m not having my period'],
    type: 'radio',
  },
  {
    title: 'Menstrual Flow',
    options: ['Light', 'Moderate', 'Heavy'],
    type: 'radio',
  },
  {
    title: 'Menstrual Mood Tracker',
    subtitle: 'What is your current mood?',
    options: [
      'Anxious',
      'Angry',
      'Agitated/Restless',
      'Difficulty concentrating',
      'Forgetful',
      'Exhausted',
    ],
    type: 'radio',
  },
  {
    title: 'Menstrual Symptoms',
    subtitle: 'What symptoms are you experiencing?',
    options: [
      'Acne',
      'Headache',
      'Menstrual cramps',
      'Breast pain',
      'Backache',
      'Constipation',
      'Diarrhea',
    ],
    type: 'radio',
  },
  {
    title: 'Menstrual Flow Color',
    subtitle: 'What color is your period blood right now?',
    options: [
      'Bright red',
      'Dark red and clotted',
      'Red and gray (with unpleasant odor)',
      'Dark brown',
      'Pink',
      'Pale and watery',
    ],
    type: 'radio',
  },
  {
    title: 'Sleep Quality',
    options: [
      'Get enough sleep',
      'Normal sleep',
      'Sleep deprivation',
      'Restless sleep',
      'Difficulty falling asleep',
    ],
    type: 'radio',
  },
  {title: 'Temperature', options: ['Temperature'], type: 'dropdown'},
  {
    title: 'Sexual Activity',
    subtitle: 'Sexual status',
    options: ['Acne', 'Headache'],
    type: 'radio',
  },
  {
    title: 'Sexual Activity',
    subtitle: 'Birth control',
    options: [
      'Condom',
      'Birth control implant',
      'Intrauterine device',
      'Birth control pill',
      'Not using any',
    ],
    type: 'radio',
  },
];
