export interface Exercise {
  id: string;
  name: string;
  equipment: string;
  muscleGroups: {
    primary: string[];
    secondary: string[];
  };
  createdAt: number;
}