import React, { useEffect, useState } from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { exerciseDB, Exercise } from '@/services/database';

export default function ExerciseDetailScreen() {
  const { id } = useLocalSearchParams();
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadExercise();
  }, [id]);

  const loadExercise = async () => {
    try {
      setIsLoading(true);
      const data = await exerciseDB.getById(id as string);
      setExercise(data);
    } catch (error) {
      console.error('Failed to load exercise:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    router.push(`../edit/${id}`);
  };

  if (isLoading || !exercise) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ThemedText>Loading...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={{ flex: 1 }}>
      <View style={{ padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Pressable onPress={() => router.back()}>
          <IconSymbol size={28} name="chevron.left" color={''} />
        </Pressable>
        <ThemedText style={{ fontSize: 24, fontWeight: 'bold' }}>{exercise.name}</ThemedText>
        <Pressable onPress={handleEdit}>
          <IconSymbol size={28} name="square.and.pencil" color={''} />
        </Pressable>
      </View>

      <ScrollView style={{ flex: 1, padding: 16 }}>
        <View style={{ marginBottom: 20 }}>
          <ThemedText style={{ fontSize: 18, marginBottom: 8 }}>Equipment</ThemedText>
          <ThemedText>{exercise.equipment}</ThemedText>
        </View>

        <View style={{ marginBottom: 20 }}>
          <ThemedText style={{ fontSize: 18, marginBottom: 8 }}>Primary Muscles</ThemedText>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {exercise.muscleGroups.primary.map((muscle) => (
              <View key={muscle} style={{ padding: 8, backgroundColor: '#007AFF', borderRadius: 8 }}>
                <ThemedText style={{ color: '#fff' }}>{muscle}</ThemedText>
              </View>
            ))}
          </View>
        </View>

        <View style={{ marginBottom: 20 }}>
          <ThemedText style={{ fontSize: 18, marginBottom: 8 }}>Secondary Muscles</ThemedText>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {exercise.muscleGroups.secondary.map((muscle) => (
              <View key={muscle} style={{ padding: 8, backgroundColor: '#f0f0f0', borderRadius: 8 }}>
                <ThemedText>{muscle}</ThemedText>
              </View>
            ))}
          </View>
        </View>

        <View>
          <ThemedText style={{ fontSize: 18, marginBottom: 8 }}>Recent History</ThemedText>
          {/* Add exercise history component here */}
        </View>
      </ScrollView>
    </ThemedView>
  );
}