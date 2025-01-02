import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, TextInput, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { exerciseDB, Exercise } from '@/services/database';

const equipmentTypes = ['Barbell', 'Dumbbell', 'Cable', 'Machine', 'Bodyweight'];
const muscleGroups = ['Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 'Legs', 'Core'];

export default function EditExerciseScreen() {
  const { id } = useLocalSearchParams();
  const [name, setName] = useState('');
  const [equipment, setEquipment] = useState('');
  const [primaryMuscles, setPrimaryMuscles] = useState<string[]>([]);
  const [secondaryMuscles, setSecondaryMuscles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadExercise();
  }, [id]);

  const loadExercise = async () => {
    try {
      setIsLoading(true);
      const data = await exerciseDB.getById(id as string);
      if (data) {
        setName(data.name);
        setEquipment(data.equipment);
        setPrimaryMuscles(data.muscleGroups.primary);
        setSecondaryMuscles(data.muscleGroups.secondary);
      }
    } catch (error) {
      console.error('Failed to load exercise:', error);
      Alert.alert('Error', 'Failed to load exercise');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!name.trim() || !equipment || primaryMuscles.length === 0) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    try {
      setIsSaving(true);
      await exerciseDB.update(id as string, {
        name: name.trim(),
        equipment,
        muscleGroups: {
          primary: primaryMuscles,
          secondary: secondaryMuscles
        }
      });
      router.back();
    } catch (error) {
      console.error('Failed to update exercise:', error);
      Alert.alert('Error', 'Failed to update exercise');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    Alert.alert(
      'Delete Exercise',
      'Are you sure you want to delete this exercise?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await exerciseDB.delete(id as string);
              router.back();
            } catch (error) {
              console.error('Failed to delete exercise:', error);
              Alert.alert('Error', 'Failed to delete exercise');
            }
          }
        }
      ]
    );
  };

  if (isLoading) {
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
        <ThemedText style={{ fontSize: 24, fontWeight: 'bold' }}>Edit Exercise</ThemedText>
        <Pressable onPress={handleSave}>
          <ThemedText style={{ fontSize: 16, color: '#007AFF' }}>Save</ThemedText>
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

        <Pressable 
          onPress={handleDelete}
          style={{ 
            padding: 16, 
            backgroundColor: '#FF3B30',
            borderRadius: 8,
            alignItems: 'center'
          }}>
          <ThemedText style={{ color: '#fff' }}>Delete Exercise</ThemedText>
        </Pressable>
      </ScrollView>
    </ThemedView>
  );
}