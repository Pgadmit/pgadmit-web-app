export type { Session, User as SupabaseUser } from '@supabase/supabase-js';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string | null;
          avatar_url: string | null;
          picture: string | null;
          onboarding_complete: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name?: string | null;
          avatar_url?: string | null;
          picture?: string | null;
          onboarding_complete?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string | null;
          avatar_url?: string | null;
          picture?: string | null;
          onboarding_complete?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
