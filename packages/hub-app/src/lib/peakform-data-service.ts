/**
 * PeakForm Physio Dynamic Data Service
 * Handles real-time data loading for appointments, notifications, exercises, and wellness content
 */

import { db } from './firebase';
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  Timestamp
} from 'firebase/firestore';

// Types for dynamic data
export interface Appointment {
  id: string;
  patientId: string;
  date: string;
  time: string;
  therapist: string;
  location: string;
  type: string;
  status: 'confirmed' | 'cancelled' | 'completed' | 'rescheduled';
  notes?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Notification {
  id: string;
  patientId: string;
  title: string;
  message: string;
  type: 'reminder' | 'update' | 'tip' | 'announcement';
  read: boolean;
  createdAt: Timestamp;
  scheduledFor?: Timestamp;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  videoUrl?: string;
  thumbnail?: string;
  instructions: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface PatientExercise {
  id: string;
  patientId: string;
  exerciseId: string;
  assignedBy: string;
  assignedAt: Timestamp;
  completed: boolean;
  completedAt?: Timestamp;
  bookmarked: boolean;
  notes?: string;
}

export interface WellnessArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  author: string;
  readTime: string;
  publishedAt: Timestamp;
  featured: boolean;
  tags: string[];
}

export interface PatientProgress {
  id: string;
  patientId: string;
  exerciseId: string;
  completedAt: Timestamp;
  duration: number;
  notes?: string;
  painLevel?: number; // 1-10 scale
  difficulty?: number; // 1-10 scale
}

class PeakFormDataService {
  private patientId: string;

  constructor(patientId: string) {
    this.patientId = patientId;
  }

  // APPOINTMENTS
  async getUpcomingAppointments(): Promise<Appointment[]> {
    const appointmentsRef = collection(db, 'appointments');
    const q = query(
      appointmentsRef,
      where('patientId', '==', this.patientId),
      where('status', '==', 'confirmed'),
      where('date', '>=', new Date().toISOString().split('T')[0]),
      orderBy('date', 'asc'),
      orderBy('time', 'asc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Appointment));
  }

  async getAppointmentHistory(): Promise<Appointment[]> {
    const appointmentsRef = collection(db, 'appointments');
    const q = query(
      appointmentsRef,
      where('patientId', '==', this.patientId),
      where('status', 'in', ['completed', 'cancelled']),
      orderBy('date', 'desc'),
      limit(20)
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Appointment));
  }

  async cancelAppointment(appointmentId: string): Promise<void> {
    const appointmentRef = doc(db, 'appointments', appointmentId);
    await updateDoc(appointmentRef, {
      status: 'cancelled',
      updatedAt: Timestamp.now()
    });
  }

  async rescheduleAppointment(appointmentId: string, newDate: string, newTime: string): Promise<void> {
    const appointmentRef = doc(db, 'appointments', appointmentId);
    await updateDoc(appointmentRef, {
      date: newDate,
      time: newTime,
      status: 'rescheduled',
      updatedAt: Timestamp.now()
    });
  }

  // NOTIFICATIONS
  async getNotifications(): Promise<Notification[]> {
    const notificationsRef = collection(db, 'notifications');
    const q = query(
      notificationsRef,
      where('patientId', '==', this.patientId),
      orderBy('createdAt', 'desc'),
      limit(50)
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Notification));
  }

  async markNotificationAsRead(notificationId: string): Promise<void> {
    const notificationRef = doc(db, 'notifications', notificationId);
    await updateDoc(notificationRef, {
      read: true
    });
  }

  async markAllNotificationsAsRead(): Promise<void> {
    const notificationsRef = collection(db, 'notifications');
    const q = query(
      notificationsRef,
      where('patientId', '==', this.patientId),
      where('read', '==', false)
    );
    
    const snapshot = await getDocs(q);
    const updatePromises = snapshot.docs.map(doc => 
      updateDoc(doc.ref, { read: true })
    );
    
    await Promise.all(updatePromises);
  }

  // EXERCISES
  async getExerciseLibrary(): Promise<Exercise[]> {
    const exercisesRef = collection(db, 'exercises');
    const q = query(exercisesRef, orderBy('createdAt', 'desc'));
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Exercise));
  }

  async getPatientExercises(): Promise<PatientExercise[]> {
    const patientExercisesRef = collection(db, 'patient-exercises');
    const q = query(
      patientExercisesRef,
      where('patientId', '==', this.patientId),
      orderBy('assignedAt', 'desc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PatientExercise));
  }

  async bookmarkExercise(exerciseId: string, bookmarked: boolean): Promise<void> {
    const patientExerciseRef = doc(db, 'patient-exercises', `${this.patientId}_${exerciseId}`);
    await updateDoc(patientExerciseRef, {
      bookmarked,
      updatedAt: Timestamp.now()
    });
  }

  async logExerciseProgress(exerciseId: string, duration: number, notes?: string, painLevel?: number, difficulty?: number): Promise<void> {
    const progressRef = collection(db, 'patient-progress');
    await addDoc(progressRef, {
      patientId: this.patientId,
      exerciseId,
      completedAt: Timestamp.now(),
      duration,
      notes,
      painLevel,
      difficulty
    } as Omit<PatientProgress, 'id'>);
  }

  // WELLNESS CONTENT
  async getWellnessArticles(category?: string): Promise<WellnessArticle[]> {
    const articlesRef = collection(db, 'wellness-articles');
    let q = query(articlesRef, orderBy('publishedAt', 'desc'));
    
    if (category) {
      q = query(articlesRef, where('category', '==', category), orderBy('publishedAt', 'desc'));
    }
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as WellnessArticle));
  }

  async getFeaturedArticles(): Promise<WellnessArticle[]> {
    const articlesRef = collection(db, 'wellness-articles');
    const q = query(
      articlesRef,
      where('featured', '==', true),
      orderBy('publishedAt', 'desc'),
      limit(5)
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as WellnessArticle));
  }

  // REAL-TIME SUBSCRIPTIONS
  subscribeToAppointments(callback: (appointments: Appointment[]) => void): () => void {
    const appointmentsRef = collection(db, 'appointments');
    const q = query(
      appointmentsRef,
      where('patientId', '==', this.patientId),
      where('status', '==', 'confirmed'),
      orderBy('date', 'asc')
    );
    
    return onSnapshot(q, (snapshot) => {
      const appointments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Appointment));
      callback(appointments);
    });
  }

  subscribeToNotifications(callback: (notifications: Notification[]) => void): () => void {
    const notificationsRef = collection(db, 'notifications');
    const q = query(
      notificationsRef,
      where('patientId', '==', this.patientId),
      orderBy('createdAt', 'desc'),
      limit(20)
    );
    
    return onSnapshot(q, (snapshot) => {
      const notifications = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Notification));
      callback(notifications);
    });
  }

  subscribeToPatientExercises(callback: (exercises: PatientExercise[]) => void): () => void {
    const patientExercisesRef = collection(db, 'patient-exercises');
    const q = query(
      patientExercisesRef,
      where('patientId', '==', this.patientId),
      orderBy('assignedAt', 'desc')
    );
    
    return onSnapshot(q, (snapshot) => {
      const exercises = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PatientExercise));
      callback(exercises);
    });
  }
}

export default PeakFormDataService;
