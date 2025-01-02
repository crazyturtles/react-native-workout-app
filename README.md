# Workout Tracker App Documentation

## Overview
A mobile application designed for bodybuilders to track their workouts, progress, and maintain a personalized exercise database. The app focuses on detailed exercise tracking, customizable workout templates, and comprehensive progress monitoring.

## Core Features

### 1. Exercise Library Management
- User can create custom exercises with:
  - Exercise name
  - Equipment type (cable, dumbbell, barbell, bodyweight, etc.)
  - Primary muscle groups
  - Secondary muscle groups
- Search and filter functionality
- Categorization by equipment and muscle groups

### 2. Workout Management
#### 2.1 Workout Templates
- Create and save custom workout templates
- Name and categorize workouts
- Add custom tags for filtering
- Set default rest periods for entire workout
- Individual exercise rest period overrides
- Flexible exercise ordering

#### 2.2 Active Workout Tracking
- Start from template or create new workout
- Track per exercise:
  - Sets and reps
  - Weight used
  - Rest periods between sets
  - Rest periods between exercises
  - Duration
  - Notes/form cues
- Modify workout during session
- Option to save modifications to template
- Rest period timer with notifications

### 3. Progress Tracking
#### 3.1 Exercise Progress
- Personal records (PRs)
- Weight progression over time
- Volume tracking
- Historical performance data

#### 3.2 Muscle Group Analysis
- Volume per muscle group
- Training frequency
- Primary vs secondary activation tracking

#### 3.3 Workout Analysis
- Duration trends
- Volume progression
- Frequency of workout types
- Performance metrics over time

## Database Schema

### Exercise Collection
```javascript
{
  exerciseId: string,
  name: string,
  equipment: string,
  muscleGroups: {
    primary: string[],
    secondary: string[]
  },
  createdAt: timestamp
}
```

### Workout Template Collection
```javascript
{
  workoutId: string,
  name: string,
  category: string,
  tags: string[],
  defaultRestPeriod: number,
  exercises: [{
    exerciseId: string,
    sets: number,
    defaultReps: number,
    restPeriod: number,
    order: number
  }]
}
```

### Workout History Collection
```javascript
{
  historyId: string,
  workoutId: string,
  date: timestamp,
  duration: number,
  exercises: [{
    exerciseId: string,
    sets: [{
      reps: number,
      weight: number,
      restTaken: number,
      notes: string
    }],
    restPeriodAfterExercise: number
  }]
}
```

## Screen Structure

### 1. Home Screen
- Quick start workout
- Access saved workouts
- View exercise library
- Access progress tracking

### 2. Exercise Library Screen
- List view of exercises
- Add/Edit exercise form
- Filter and search functionality
- Equipment and muscle group filters

### 3. Workout Creator/Editor Screen
- Template naming and categorization
- Exercise selection and ordering
- Rest period configuration
- Template saving options

### 4. Active Workout Screen
- Exercise list view
- Set/rep/weight logging
- Rest timer with notifications
- Note-taking capability
- Workout modification options

### 5. Progress Tracking Screens
- Exercise progress charts
- Muscle group volume analysis
- PR tracking and history
- Workout history and statistics

## Technical Requirements

### Development Environment
- React Native with Expo
- VS Code as primary IDE
- Local storage for offline functionality
- REST timer functionality
- Chart visualization for progress tracking

### Mobile Requirements
- Android/iOS compatibility
- Offline functionality
- Push notifications for rest timer
- Data export capability

## Future Considerations
- Cloud sync functionality
- Social sharing features
- Exercise video tutorials
- Plate calculator
- Body measurements tracking
- Nutrition tracking integration
- Workout plan generation