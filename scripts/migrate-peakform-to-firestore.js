#!/usr/bin/env node

/**
 * PeakForm Physio Data Migration Script
 * Migrates static config data to Firestore for dynamic loading
 */

const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

// Initialize Firebase Admin
const serviceAccount = require('../firebase-service-account.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Load the static config
const configPath = path.join(__dirname, '../packages/hub-app/public/client-configs/peakform-physio-2025.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

async function migrateData() {
  console.log('🚀 Starting PeakForm Physio data migration...');
  
  try {
    // 1. Migrate exercises
    console.log('📚 Migrating exercises...');
    const exercises = config.content.exercises.featured.map(exercise => ({
      title: exercise.title,
      description: exercise.description,
      instructions: [
        'Follow the video demonstration carefully',
        'Start slowly and increase intensity gradually',
        'Stop if you experience any pain',
        'Breathe normally throughout the exercise'
      ],
      duration: exercise.duration,
      category: exercise.category.toLowerCase().replace(' ', '-'),
      difficulty: 'beginner', // Default to beginner
      videoUrl: exercise.videoUrl,
      thumbnail: exercise.thumbnail,
      createdBy: 'system',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      active: true
    }));

    for (const exercise of exercises) {
      await db.collection('exercises').add(exercise);
    }
    console.log(`✅ Migrated ${exercises.length} exercises`);

    // 2. Migrate wellness articles
    console.log('📖 Migrating wellness articles...');
    const articles = config.content.wellness.articles.map(article => ({
      title: article.title,
      summary: article.summary,
      content: article.content,
      category: article.category.toLowerCase(),
      author: article.author,
      readTime: article.readTime,
      publishedAt: admin.firestore.Timestamp.fromDate(new Date(article.date)),
      featured: true,
      tags: [article.category.toLowerCase()],
      active: true,
      viewCount: 0,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }));

    for (const article of articles) {
      await db.collection('wellness-articles').add(article);
    }
    console.log(`✅ Migrated ${articles.length} wellness articles`);

    // 3. Create sample patient data
    console.log('👤 Creating sample patient data...');
    const samplePatientId = 'sample-patient-001';
    
    // Create patient document
    await db.collection('patients').doc(samplePatientId).set({
      email: 'patient@example.com',
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1-555-0123',
      preferences: {
        notifications: true,
        reminderTime: '09:00',
        preferredLanguage: 'en'
      },
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    // 4. Create sample appointments
    console.log('📅 Creating sample appointments...');
    const appointments = config.content.appointments.upcoming.map(apt => ({
      patientId: samplePatientId,
      therapistId: 'therapist-001',
      date: apt.date,
      time: apt.time,
      duration: 60,
      type: apt.type,
      location: apt.location,
      status: apt.status,
      notes: 'Please arrive 10 minutes early',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      reminderSent: false
    }));

    for (const appointment of appointments) {
      await db.collection('appointments').add(appointment);
    }
    console.log(`✅ Created ${appointments.length} sample appointments`);

    // 5. Create sample notifications
    console.log('🔔 Creating sample notifications...');
    const notifications = config.content.notifications.recent.map(notif => ({
      patientId: samplePatientId,
      title: notif.title,
      message: notif.message,
      type: notif.type,
      read: notif.read,
      createdAt: admin.firestore.Timestamp.fromDate(new Date(`${notif.date}T${notif.time}:00`)),
      actionUrl: notif.type === 'reminder' ? '/appointments' : undefined
    }));

    for (const notification of notifications) {
      await db.collection('notifications').add(notification);
    }
    console.log(`✅ Created ${notifications.length} sample notifications`);

    // 6. Create therapist data
    console.log('👨‍⚕️ Creating therapist data...');
    const therapists = config.content.clinic.team.map(therapist => ({
      email: `${therapist.id}@peakformphysio.com`,
      firstName: therapist.name.split(' ')[0],
      lastName: therapist.name.split(' ').slice(1).join(' '),
      title: therapist.title,
      specialties: therapist.specialties,
      qualifications: therapist.qualifications,
      bio: therapist.bio,
      photoUrl: therapist.photo,
      schedule: {
        monday: { start: '08:00', end: '18:00' },
        tuesday: { start: '08:00', end: '18:00' },
        wednesday: { start: '08:00', end: '18:00' },
        thursday: { start: '08:00', end: '18:00' },
        friday: { start: '08:00', end: '17:00' },
        saturday: { start: '09:00', end: '14:00' },
        sunday: { start: '00:00', end: '00:00' }
      },
      active: true,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }));

    for (const therapist of therapists) {
      await db.collection('therapists').add(therapist);
    }
    console.log(`✅ Created ${therapists.length} therapist profiles`);

    // 7. Create sample patient exercises
    console.log('💪 Creating sample patient exercises...');
    const patientExercises = [
      {
        patientId: samplePatientId,
        exerciseId: 'exercise-001', // Reference to first exercise
        assignedBy: 'therapist-001',
        assignedAt: admin.firestore.FieldValue.serverTimestamp(),
        frequency: 'daily',
        sets: 3,
        reps: 10,
        notes: 'Start with gentle movements',
        bookmarked: true,
        completed: false,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      }
    ];

    for (const patientExercise of patientExercises) {
      await db.collection('patient-exercises').add(patientExercise);
    }
    console.log(`✅ Created ${patientExercises.length} patient exercise assignments`);

    console.log('🎉 Migration completed successfully!');
    console.log('\n📋 Summary:');
    console.log(`- ${exercises.length} exercises migrated`);
    console.log(`- ${articles.length} wellness articles migrated`);
    console.log(`- ${appointments.length} sample appointments created`);
    console.log(`- ${notifications.length} sample notifications created`);
    console.log(`- ${therapists.length} therapist profiles created`);
    console.log(`- ${patientExercises.length} patient exercise assignments created`);
    console.log('\n🔧 Next steps:');
    console.log('1. Update PeakForm app to use usePeakFormData hook');
    console.log('2. Test real-time data loading');
    console.log('3. Implement push notifications');
    console.log('4. Add progress tracking features');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run migration
migrateData().then(() => {
  console.log('✅ Migration script completed');
  process.exit(0);
}).catch(error => {
  console.error('❌ Migration script failed:', error);
  process.exit(1);
});
