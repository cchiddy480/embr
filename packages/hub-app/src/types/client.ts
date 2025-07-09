export interface ClientTheme {
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    surface: string
    text: string
    textSecondary: string
  }
  fonts: {
    heading: string
    body: string
  }
  logo: {
    light: string
    dark: string
    favicon: string
  }
}

export interface NavigationItem {
  id: string
  title: string
  icon: string
  path: string
}

export interface ClientFeatures {
  offline: boolean
  pushNotifications: boolean
  qrCode: boolean
  analytics: boolean
}

export interface ScheduleEvent {
  id: string
  title: string
  description: string
  startTime: string
  endTime: string
  location: string
  speaker?: string
  notes?: string
}

export interface ScheduleContent {
  enabled: boolean
  timezone: string
  events: ScheduleEvent[]
}

export interface MapContent {
  enabled: boolean
  center: {
    lat: number
    lng: number
  }
  zoom: number
}

export interface ClientContent {
  schedule?: ScheduleContent
  vendors?: {
    enabled: boolean
    categories: string[]
  }
  map?: MapContent
  guests?: {
    enabled: boolean
    showPhotos: boolean
    allowContact: boolean
  }
  venue?: {
    enabled: boolean
    address: string
    coordinates: {
      lat: number
      lng: number
    }
    parking?: string
    accessibility?: string
  }
}

export interface PushNotifications {
  topics: string[]
  defaultTitle: string
  defaultIcon: string
}

export interface Analytics {
  enabled: boolean
  trackingId?: string
}

export interface ClientConfig {
  clientId: string
  name: string
  description: string
  version: string
  expiry: string
  theme: ClientTheme
  navigation: NavigationItem[]
  features: ClientFeatures
  content: ClientContent
  pushNotifications: PushNotifications
  analytics: Analytics
} 