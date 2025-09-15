/**
 * PeakForm Physio Data Hook
 * Provides real-time data access for the PeakForm Physio app
 */

import { useState, useEffect, useCallback } from 'react';
import PeakFormDataService, { 
  Appointment, 
  Notification, 
  Exercise, 
  PatientExercise, 
  WellnessArticle 
} from '../lib/peakform-data-service';

interface UsePeakFormDataReturn {
  // Appointments
  appointments: Appointment[];
  appointmentHistory: Appointment[];
  loadingAppointments: boolean;
  cancelAppointment: (id: string) => Promise<void>;
  rescheduleAppointment: (id: string, date: string, time: string) => Promise<void>;
  
  // Notifications
  notifications: Notification[];
  unreadCount: number;
  loadingNotifications: boolean;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  
  // Exercises
  exerciseLibrary: Exercise[];
  patientExercises: PatientExercise[];
  loadingExercises: boolean;
  bookmarkExercise: (exerciseId: string, bookmarked: boolean) => Promise<void>;
  logProgress: (exerciseId: string, duration: number, notes?: string, painLevel?: number, difficulty?: number) => Promise<void>;
  
  // Wellness
  wellnessArticles: WellnessArticle[];
  featuredArticles: WellnessArticle[];
  loadingWellness: boolean;
  
  // Loading states
  loading: boolean;
  error: string | null;
}

export function usePeakFormData(patientId: string): UsePeakFormDataReturn {
  const [dataService] = useState(() => new PeakFormDataService(patientId));
  
  // State
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [appointmentHistory, setAppointmentHistory] = useState<Appointment[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [exerciseLibrary, setExerciseLibrary] = useState<Exercise[]>([]);
  const [patientExercises, setPatientExercises] = useState<PatientExercise[]>([]);
  const [wellnessArticles, setWellnessArticles] = useState<WellnessArticle[]>([]);
  const [featuredArticles, setFeaturedArticles] = useState<WellnessArticle[]>([]);
  
  // Loading states
  const [loadingAppointments, setLoadingAppointments] = useState(true);
  const [loadingNotifications, setLoadingNotifications] = useState(true);
  const [loadingExercises, setLoadingExercises] = useState(true);
  const [loadingWellness, setLoadingWellness] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Computed values
  const unreadCount = notifications.filter(n => !n.read).length;
  const loading = loadingAppointments || loadingNotifications || loadingExercises || loadingWellness;

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setError(null);
        
        // Load all data in parallel
        const [
          appointmentsData,
          historyData,
          notificationsData,
          exercisesData,
          patientExercisesData,
          articlesData,
          featuredData
        ] = await Promise.all([
          dataService.getUpcomingAppointments(),
          dataService.getAppointmentHistory(),
          dataService.getNotifications(),
          dataService.getExerciseLibrary(),
          dataService.getPatientExercises(),
          dataService.getWellnessArticles(),
          dataService.getFeaturedArticles()
        ]);
        
        setAppointments(appointmentsData);
        setAppointmentHistory(historyData);
        setNotifications(notificationsData);
        setExerciseLibrary(exercisesData);
        setPatientExercises(patientExercisesData);
        setWellnessArticles(articlesData);
        setFeaturedArticles(featuredData);
        
      } catch (err) {
        console.error('Error loading initial data:', err);
        setError('Failed to load data. Please try again.');
      } finally {
        setLoadingAppointments(false);
        setLoadingNotifications(false);
        setLoadingExercises(false);
        setLoadingWellness(false);
      }
    };

    if (patientId) {
      loadInitialData();
    }
  }, [patientId, dataService]);

  // Set up real-time subscriptions
  useEffect(() => {
    if (!patientId) return;

    const unsubscribeAppointments = dataService.subscribeToAppointments((newAppointments) => {
      setAppointments(newAppointments);
      setLoadingAppointments(false);
    });

    const unsubscribeNotifications = dataService.subscribeToNotifications((newNotifications) => {
      setNotifications(newNotifications);
      setLoadingNotifications(false);
    });

    const unsubscribeExercises = dataService.subscribeToPatientExercises((newExercises) => {
      setPatientExercises(newExercises);
    });

    return () => {
      unsubscribeAppointments();
      unsubscribeNotifications();
      unsubscribeExercises();
    };
  }, [patientId, dataService]);

  // Appointment actions
  const cancelAppointment = useCallback(async (id: string) => {
    try {
      await dataService.cancelAppointment(id);
      // Real-time subscription will update the UI
    } catch (err) {
      console.error('Error cancelling appointment:', err);
      setError('Failed to cancel appointment. Please try again.');
    }
  }, [dataService]);

  const rescheduleAppointment = useCallback(async (id: string, date: string, time: string) => {
    try {
      await dataService.rescheduleAppointment(id, date, time);
      // Real-time subscription will update the UI
    } catch (err) {
      console.error('Error rescheduling appointment:', err);
      setError('Failed to reschedule appointment. Please try again.');
    }
  }, [dataService]);

  // Notification actions
  const markAsRead = useCallback(async (id: string) => {
    try {
      await dataService.markNotificationAsRead(id);
      // Real-time subscription will update the UI
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  }, [dataService]);

  const markAllAsRead = useCallback(async () => {
    try {
      await dataService.markAllNotificationsAsRead();
      // Real-time subscription will update the UI
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
    }
  }, [dataService]);

  // Exercise actions
  const bookmarkExercise = useCallback(async (exerciseId: string, bookmarked: boolean) => {
    try {
      await dataService.bookmarkExercise(exerciseId, bookmarked);
      // Real-time subscription will update the UI
    } catch (err) {
      console.error('Error bookmarking exercise:', err);
    }
  }, [dataService]);

  const logProgress = useCallback(async (exerciseId: string, duration: number, notes?: string, painLevel?: number, difficulty?: number) => {
    try {
      await dataService.logExerciseProgress(exerciseId, duration, notes, painLevel, difficulty);
    } catch (err) {
      console.error('Error logging exercise progress:', err);
      setError('Failed to log progress. Please try again.');
    }
  }, [dataService]);

  return {
    // Appointments
    appointments,
    appointmentHistory,
    loadingAppointments,
    cancelAppointment,
    rescheduleAppointment,
    
    // Notifications
    notifications,
    unreadCount,
    loadingNotifications,
    markAsRead,
    markAllAsRead,
    
    // Exercises
    exerciseLibrary,
    patientExercises,
    loadingExercises,
    bookmarkExercise,
    logProgress,
    
    // Wellness
    wellnessArticles,
    featuredArticles,
    loadingWellness,
    
    // Loading states
    loading,
    error
  };
}
