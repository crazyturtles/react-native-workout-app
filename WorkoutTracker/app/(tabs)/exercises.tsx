import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { exerciseDB, Exercise } from '@/services/database';

export default function ExercisesScreen() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadExercises();
  }, []);

  const loadExercises = async () => {
    try {
      setIsLoading(true);
      const data = await exerciseDB.getAll();
      setExercises(data);
    } catch (error) {
      console.error('Failed to load exercises:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ThemedText>Loading exercises...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={{ flex: 1 }}>
      <View style={{ padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <ThemedText style={{ fontSize: 24, fontWeight: 'bold' }}>Exercises</ThemedText>
        <Link href="/exercises/new" asChild>
          <Pressable>
            <ThemedText style={{ fontSize: 16, color: '#007AFF' }}>Add New</ThemedText>
          </Pressable>
        </Link>
      </View>

      <ScrollView style={{ flex: 1 }}>
        {exercises.length === 0 ? (
          <View style={{ padding: 16, alignItems: 'center' }}>
            <ThemedText>No exercises added yet</ThemedText>
          </View>
        ) : (
          exercises.map((exercise) => (
            <Link key={exercise.id} href={`/exercises/${exercise.id}`} asChild>
              <Pressable>
                <ThemedView style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                  <ThemedText style={{ fontSize: 18 }}>{exercise.name}</ThemedText>
                  <ThemedText style={{ color: '#666' }}>{exercise.equipment}</ThemedText>
                  <View style={{ flexDirection: 'row', marginTop: 4 }}>
                    {exercise.muscleGroups.primary.map((muscle) => (
                      <ThemedText key={muscle} style={{ marginRight: 8, color: '#007AFF' }}>
                        {muscle}
                      </ThemedText>
                    ))}
                  </View>
                </ThemedView>
              </Pressable>
            </Link>
          ))
        )}
      </ScrollView>
    </ThemedView>
  );
}