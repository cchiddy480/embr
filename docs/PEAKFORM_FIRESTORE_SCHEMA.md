# PeakForm Physio Firestore Database Schema

## Overview
This document outlines the Firestore database schema for the PeakForm Physio app, enabling real-time data synchronization for appointments, notifications, exercises, and wellness content.

## Collections

### 1. `appointments`
**Purpose**: Store patient appointments and scheduling data

```typescript
interface Appointment {
  id: string;                    // Auto-generated document ID
  patientId: string;             // Reference to patient
  therapistId: string;           // Reference to therapist
  date: string;                  // ISO date string (YYYY-MM-DD)
  time: string;                  // Time string (HH:MM AM/PM)
  duration: number;              // Duration in minutes
  type: string;                  // "consultation", "massage", "assessment", etc.
  location: string;              // "Main Clinic", "Sports Clinic", etc.
  status: 'scheduled' | 'confirmed' | 'cancelled' | 'completed' | 'rescheduled';
  notes?: string;                // Appointment notes
  createdAt: Timestamp;          // When appointment was created
  updatedAt: Timestamp;          // Last modification time
  reminderSent?: boolean;        // Whether reminder notification was sent
}
```

**Indexes Required**:
- `patientId` (ascending) + `date` (ascending) + `time` (ascending)
- `therapistId` (ascending) + `date` (ascending)
- `status` (ascending) + `date` (ascending)

### 2. `notifications`
**Purpose**: Store push notifications and in-app messages

```typescript
interface Notification {
  id: string;                    // Auto-generated document ID
  patientId: string;             // Target patient
  title: string;                 // Notification title
  message: string;               // Notification body
  type: 'reminder' | 'update' | 'tip' | 'announcement' | 'exercise_assigned';
  read: boolean;                 // Read status
  createdAt: Timestamp;          // When notification was created
  scheduledFor?: Timestamp;      // When to show notification (for scheduled)
  actionUrl?: string;            // Deep link or action URL
  metadata?: {                   // Additional data
    appointmentId?: string;
    exerciseId?: string;
    articleId?: string;
  };
}
```

**Indexes Required**:
- `patientId` (ascending) + `createdAt` (descending)
- `patientId` (ascending) + `read` (ascending) + `createdAt` (descending)

### 3. `exercises`
**Purpose**: Store exercise library and templates

```typescript
interface Exercise {
  id: string;                    // Auto-generated document ID
  title: string;                 // Exercise name
  description: string;           // Short description
  instructions: string[];        // Step-by-step instructions
  duration: string;              // "5 minutes", "10 minutes", etc.
  category: string;              // "neck", "lower-back", "acl", etc.
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  videoUrl?: string;             // Video demonstration URL
  thumbnail?: string;            // Thumbnail image URL
  equipment?: string[];          // Required equipment
  contraindications?: string[];  // When not to perform
  createdBy: string;             // Therapist who created it
  createdAt: Timestamp;
  updatedAt: Timestamp;
  active: boolean;               // Whether exercise is available
}
```

**Indexes Required**:
- `category` (ascending) + `difficulty` (ascending)
- `active` (ascending) + `createdAt` (descending)

### 4. `patient-exercises`
**Purpose**: Link patients to assigned exercises

```typescript
interface PatientExercise {
  id: string;                    // Auto-generated document ID
  patientId: string;             // Reference to patient
  exerciseId: string;            // Reference to exercise
  assignedBy: string;            // Therapist who assigned it
  assignedAt: Timestamp;         // When exercise was assigned
  dueDate?: Timestamp;           // When exercise should be completed
  frequency: string;             // "daily", "3x per week", etc.
  sets?: number;                 // Number of sets
  reps?: number;                 // Number of repetitions
  duration?: number;             // Duration in minutes
  notes?: string;                // Special instructions
  bookmarked: boolean;           // Patient bookmark status
  completed: boolean;            // Completion status
  completedAt?: Timestamp;       // When exercise was completed
  updatedAt: Timestamp;
}
```

**Indexes Required**:
- `patientId` (ascending) + `assignedAt` (descending)
- `patientId` (ascending) + `completed` (ascending)
- `exerciseId` (ascending) + `assignedAt` (descending)

### 5. `patient-progress`
**Purpose**: Track exercise completion and progress

```typescript
interface PatientProgress {
  id: string;                    // Auto-generated document ID
  patientId: string;             // Reference to patient
  exerciseId: string;            // Reference to exercise
  completedAt: Timestamp;        // When exercise was completed
  duration: number;              // Actual duration in minutes
  sets?: number;                 // Sets completed
  reps?: number;                 // Reps completed
  painLevel?: number;            // Pain level 1-10
  difficulty?: number;           // Perceived difficulty 1-10
  notes?: string;                // Patient notes
  therapistNotes?: string;       // Therapist review notes
  reviewedBy?: string;           // Therapist who reviewed
  reviewedAt?: Timestamp;        // When progress was reviewed
}
```

**Indexes Required**:
- `patientId` (ascending) + `completedAt` (descending)
- `exerciseId` (ascending) + `completedAt` (descending)

### 6. `wellness-articles`
**Purpose**: Store wellness tips and educational content

```typescript
interface WellnessArticle {
  id: string;                    // Auto-generated document ID
  title: string;                 // Article title
  summary: string;               // Short summary
  content: string;               // Full article content
  category: string;              // "posture", "recovery", "nutrition", etc.
  author: string;                // Author name
  readTime: string;              // "5 min read"
  publishedAt: Timestamp;        // Publication date
  featured: boolean;             // Whether to show on homepage
  tags: string[];                // Search tags
  imageUrl?: string;             // Article image
  active: boolean;               // Whether article is published
  viewCount: number;             // Number of views
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

**Indexes Required**:
- `category` (ascending) + `publishedAt` (descending)
- `featured` (ascending) + `publishedAt` (descending)
- `active` (ascending) + `publishedAt` (descending)

### 7. `patients`
**Purpose**: Store patient information and preferences

```typescript
interface Patient {
  id: string;                    // Auto-generated document ID
  email: string;                 // Patient email
  firstName: string;             // Patient first name
  lastName: string;              // Patient last name
  phone?: string;                // Phone number
  dateOfBirth?: string;          // Date of birth
  emergencyContact?: {           // Emergency contact info
    name: string;
    phone: string;
    relationship: string;
  };
  preferences: {                 // App preferences
    notifications: boolean;
    reminderTime: string;        // "09:00", "18:00", etc.
    preferredLanguage: string;   // "en", "es", etc.
  };
  conditions?: string[];         // Medical conditions
  medications?: string[];        // Current medications
  allergies?: string[];          // Known allergies
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastLoginAt?: Timestamp;
}
```

**Indexes Required**:
- `email` (ascending) - unique
- `lastName` (ascending) + `firstName` (ascending)

### 8. `therapists`
**Purpose**: Store therapist information

```typescript
interface Therapist {
  id: string;                    // Auto-generated document ID
  email: string;                 // Therapist email
  firstName: string;             // First name
  lastName: string;              // Last name
  title: string;                 // "Dr.", "PT", etc.
  specialties: string[];         // Specialization areas
  qualifications: string[];      // Certifications
  bio: string;                   // Professional bio
  photoUrl?: string;             // Profile photo
  schedule: {                    // Working hours
    monday: { start: string; end: string; };
    tuesday: { start: string; end: string; };
    // ... other days
  };
  active: boolean;               // Whether therapist is active
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

## Security Rules

```javascript
// Firestore Security Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Patients can only access their own data
    match /appointments/{appointmentId} {
      allow read, write: if request.auth != null && 
        resource.data.patientId == request.auth.uid;
    }
    
    match /notifications/{notificationId} {
      allow read, write: if request.auth != null && 
        resource.data.patientId == request.auth.uid;
    }
    
    match /patient-exercises/{exerciseId} {
      allow read, write: if request.auth != null && 
        resource.data.patientId == request.auth.uid;
    }
    
    match /patient-progress/{progressId} {
      allow read, write: if request.auth != null && 
        resource.data.patientId == request.auth.uid;
    }
    
    // Public read access for exercises and articles
    match /exercises/{exerciseId} {
      allow read: if resource.data.active == true;
      allow write: if request.auth != null && 
        request.auth.token.role == 'therapist';
    }
    
    match /wellness-articles/{articleId} {
      allow read: if resource.data.active == true;
      allow write: if request.auth != null && 
        request.auth.token.role == 'therapist';
    }
    
    // Patient profile access
    match /patients/{patientId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == patientId;
    }
  }
}
```

## Real-time Features

### 1. Live Appointment Updates
- Real-time status changes (confirmed, cancelled, rescheduled)
- Automatic reminder notifications
- Therapist availability updates

### 2. Push Notifications
- Appointment reminders (24h, 2h, 30min before)
- New exercise assignments
- Wellness tips and articles
- Clinic announcements

### 3. Exercise Progress Tracking
- Real-time completion logging
- Progress analytics for therapists
- Automated follow-up notifications

### 4. Content Updates
- New exercises added to library
- Updated wellness articles
- Featured content rotation

## Data Migration Strategy

1. **Phase 1**: Set up Firestore collections and indexes
2. **Phase 2**: Migrate static config data to Firestore
3. **Phase 3**: Implement real-time data service
4. **Phase 4**: Update PeakForm app to use dynamic data
5. **Phase 5**: Add push notification system
6. **Phase 6**: Implement progress tracking and analytics

This schema provides a solid foundation for a fully dynamic, real-time physiotherapy app with comprehensive patient management and progress tracking capabilities.
