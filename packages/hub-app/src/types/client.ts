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

/**
 * Available template types for Embr micro-apps
 * Templates provide pre-built UI renderers for common use cases
 */
export type ClientTemplate =
  | 'festival'      // Events, conferences, festivals
  | 'healthcare'    // Medical, physiotherapy, wellness
  | 'menu'          // Business services, product catalogs
  | 'restaurant'    // Restaurants, cafes, food services
  | 'property'      // Real estate, property showcases
  | 'custom'        // Custom React component (legacy)

export interface ClientConfig {
  clientId: string
  name: string
  description: string
  version: string
  expiry: string
  /**
   * Template selection for GenericClientApp rendering
   * If not specified, falls back to custom component or default renderer
   */
  template?: ClientTemplate
  theme: ClientTheme
  navigation: NavigationItem[]
  features: ClientFeatures
  content: ClientContent
  pushNotifications: PushNotifications
  analytics: Analytics
} 