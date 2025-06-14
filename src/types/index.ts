export interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  favorite_drivers: string[];
  favorite_teams: string[];
  created_at: string;
}

export interface StatCard {
  id: string;
  type: 'text' | 'chart' | 'image' | 'video';
  title: string;
  content: string;
  data?: any;
  timestamp: string;
  driver?: string;
  team?: string;
  category: 'timing' | 'position' | 'telemetry' | 'weather' | 'general';
}

export interface Race {
  id: string;
  name: string;
  circuit: string;
  date: string;
  time: string;
  status: 'upcoming' | 'live' | 'completed';
  round: number;
}

export interface Driver {
  id: string;
  name: string;
  team: string;
  number: number;
  position?: number;
  points: number;
  avatar?: string;
}