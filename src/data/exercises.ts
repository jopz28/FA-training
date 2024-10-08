export const predeterminedExercises = [
  'Bench Press',
  'Squat',
  'Deadlift',
  'Overhead Press',
  'Barbell Row',
  'Pull-up',
  'Dip',
  'Leg Press',
  'Lat Pulldown',
  'Bicep Curl'
];

export interface Exercise {
  name: string;
  percentage: number;
  isIndependent: boolean;
  sets: number;
  reps: number;
  comment?: string; // New field for trainer comments
}

export interface Day {
  name: string;
  exercises: Exercise[];
}

export interface Week {
  days: Day[];
}

export interface Program {
  id: number;
  name: string;
  weeks: Week[];
}