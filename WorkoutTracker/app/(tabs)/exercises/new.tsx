import React, { useState } from 'react';
import { View, ScrollView, Pressable, TextInput, Alert } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { exerciseDB } from '@/services/database';

const equipmentTypes = ['Barbell', 'Dumbbell', 'Cable', 'Machine', 'Bodyweight'];
const muscleGroups = ['Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 'Legs', 'Core'];

export default function NewExerciseScreen() {
  const [name, setName] = useState('');
  const [equipment, setEquipment] = useState('');
  const [primaryMuscles, setPrimaryMuscles] = useState<string[]>([]);
  const [secondaryMuscles, setSecondaryMuscles] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Exercise name is required');
      return;
    }
    if (!equipment) {
      Alert.alert('Error', 'Please select equipment type');
      return;
    }
    if (primaryMuscles.length === 0) {
      Alert.alert('Error', 'Please select at least one primary muscle');
      return;
    }

    try {
      setIsSaving(true);
      await exerciseDB.add({
        name: name.trim(),
        equipment,
        muscleGroups: {
          primary: primaryMuscles,
          secondary: secondaryMuscles
        }
      });
      router.back();
    } catch (error) {
      console.error('Failed to save exercise:', error);
      Alert.alert('Error', 'Failed to save exercise');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ThemedView style={{ flex: 1 }}>
      <View style={{ padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <ThemedText style={{ fontSize: 24, fontWeight: 'bold' }}>New Exercise</ThemedText>
        <Pressable onPress={handleSave} disabled={isSaving}>
          <ThemedText style={{ fontSize: 16, color: isSaving ? '#999' : '#007AFF' }}>
            {isSaving ? 'Saving...' : 'Save'}
          </ThemedText>
        </Pressable>
      </View>

      <ScrollView style={{ flex: 1, padding: 16 }}>
        <View style={{ marginBottom: 20 }}>
          <ThemedText style={{ marginBottom: 8 }}>Exercise Name</ThemedText>
          <TextInput
            value={name}
            onChangeText={setName}
            style={{
              padding: 12,
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 8,
              color: '#000',
            }}
          />
        </View>

        <View style={{ marginBottom: 20 }}>
          <ThemedText style={{ marginBottom: 8 }}>Equipment Type</ThemedText>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {equipmentTypes.map((type) => (
              <Pressable
                key={type}
                onPress={() => setEquipment(type)}
                style={{
                  padding: 8,
                  borderRadius: 8,
                  backgroundColor: equipment === type ? '#007AFF' : '#f0f0f0',
                }}>
                <ThemedText style={{ color: equipment === type ? '#fff' : '#000' }}>
                  {type}
                </ThemedText>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={{ marginBottom: 20 }}>
          <ThemedText style={{ marginBottom: 8 }}>Primary Muscles</ThemedText>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {muscleGroups.map((muscle) => (
              <Pressable
                key={muscle}
                onPress={() => {
                  if (primaryMuscles.includes(muscle)) {
                    setPrimaryMuscles(primaryMuscles.filter(m => m !== muscle));
                  } else {
                    setPrimaryMuscles([...primaryMuscles, muscle]);
                  }
                }}
                style={{
                  padding: 8,
                  borderRadius: 8,
                  backgroundColor: primaryMuscles.includes(muscle) ? '#007AFF' : '#f0f0f0',
                }}>
                <ThemedText style={{ color: primaryMuscles.includes(muscle) ? '#fff' : '#000' }}>
                  {muscle}
                </ThemedText>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={{ marginBottom: 20 }}>
          <ThemedText style={{ marginBottom: 8 }}>Secondary Muscles</ThemedText>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {muscleGroups.map((muscle) => (
              <Pressable
                key={muscle}
                onPress={() => {
                  if (secondaryMuscles.includes(muscle)) {
                    setSecondaryMuscles(secondaryMuscles.filter(m => m !== muscle));
                  } else {
                    setSecondaryMuscles([...secondaryMuscles, muscle]);
                  }
                }}
                style={{
                  padding: 8,
                  borderRadius: 8,
                  backgroundColor: secondaryMuscles.includes(muscle) ? '#007AFF' : '#f0f0f0',
                }}>
                <ThemedText style={{ color: secondaryMuscles.includes(muscle) ? '#fff' : '#000' }}>
                  {muscle}
                </ThemedText>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}