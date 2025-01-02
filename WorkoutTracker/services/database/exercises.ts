import AsyncStorage from '@react-native-async-storage/async-storage';
import { Exercise } from './types';

const EXERCISES_KEY = '@exercises';

export const exerciseDB = {
  async getAll(): Promise<Exercise[]> {
    const data = await AsyncStorage.getItem(EXERCISES_KEY);
    return data ? JSON.parse(data) : [];
  },

  async getById(id: string): Promise<Exercise | null> {
    const exercises = await this.getAll();
    return exercises.find(ex => ex.id === id) || null;
  },

  async add(exercise: Omit<Exercise, 'id' | 'createdAt'>): Promise<Exercise> {
    const exercises = await this.getAll();
    const newExercise: Exercise = {
      ...exercise,
      id: Date.now().toString(),
      createdAt: Date.now()
    };
    
    await AsyncStorage.setItem(EXERCISES_KEY, JSON.stringify([...exercises, newExercise]));
    return newExercise;
  },

  async update(id: string, exercise: Partial<Exercise>): Promise<Exercise | null> {
    const exercises = await this.getAll();
    const index = exercises.findIndex(ex => ex.id === id);
    
    if (index === -1) return null;
    
    exercises[index] = { ...exercises[index], ...exercise };
    await AsyncStorage.setItem(EXERCISES_KEY, JSON.stringify(exercises));
    return exercises[index];
  },

  async delete(id: string): Promise<boolean> {
    const exercises = await this.getAll();
    const filtered = exercises.filter(ex => ex.id !== id);
    
    if (filtered.length === exercises.length) return false;
    
    await AsyncStorage.setItem(EXERCISES_KEY, JSON.stringify(filtered));
    return true;
  }
};