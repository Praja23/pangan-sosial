export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      donor_profiles: {
        Row: {
          address: string
          category: Database["public"]["Enums"]["donor_category"]
          city: string | null
          contact_phone: string | null
          cover_url: string | null
          created_at: string
          description: string | null
          id: string
          latitude: number | null
          license_no: string | null
          longitude: number | null
          org_name: string
          updated_at: string
          verified: boolean
        }
        Insert: {
          address: string
          category: Database["public"]["Enums"]["donor_category"]
          city?: string | null
          contact_phone?: string | null
          cover_url?: string | null
          created_at?: string
          description?: string | null
          id: string
          latitude?: number | null
          license_no?: string | null
          longitude?: number | null
          org_name: string
          updated_at?: string
          verified?: boolean
        }
        Update: {
          address?: string
          category?: Database["public"]["Enums"]["donor_category"]
          city?: string | null
          contact_phone?: string | null
          cover_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          latitude?: number | null
          license_no?: string | null
          longitude?: number | null
          org_name?: string
          updated_at?: string
          verified?: boolean
        }
        Relationships: []
      }
      food_listings: {
        Row: {
          category: Database["public"]["Enums"]["donor_category"]
          created_at: string
          description: string | null
          donor_id: string | null
          expires_at: string
          id: string
          image_url: string | null
          latitude: number | null
          longitude: number | null
          partner_id: string | null
          pickup_address: string
          portions: number
          portions_remaining: number
          priority_label: string | null
          rescue_score: number
          status: Database["public"]["Enums"]["listing_status"]
          title: string
          updated_at: string
        }
        Insert: {
          category: Database["public"]["Enums"]["donor_category"]
          created_at?: string
          description?: string | null
          donor_id?: string | null
          expires_at: string
          id?: string
          image_url?: string | null
          latitude?: number | null
          longitude?: number | null
          partner_id?: string | null
          pickup_address: string
          portions: number
          portions_remaining: number
          priority_label?: string | null
          rescue_score?: number
          status?: Database["public"]["Enums"]["listing_status"]
          title: string
          updated_at?: string
        }
        Update: {
          category?: Database["public"]["Enums"]["donor_category"]
          created_at?: string
          description?: string | null
          donor_id?: string | null
          expires_at?: string
          id?: string
          image_url?: string | null
          latitude?: number | null
          longitude?: number | null
          partner_id?: string | null
          pickup_address?: string
          portions?: number
          portions_remaining?: number
          priority_label?: string | null
          rescue_score?: number
          status?: Database["public"]["Enums"]["listing_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "food_listings_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      partners: {
        Row: {
          address: string
          category: Database["public"]["Enums"]["donor_category"]
          city: string | null
          cover_url: string | null
          created_at: string
          description: string | null
          id: string
          latitude: number | null
          logo_url: string | null
          longitude: number | null
          name: string
          owner_user_id: string | null
          rating: number | null
          slug: string
          total_rescued: number | null
          verified: boolean
        }
        Insert: {
          address: string
          category: Database["public"]["Enums"]["donor_category"]
          city?: string | null
          cover_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          latitude?: number | null
          logo_url?: string | null
          longitude?: number | null
          name: string
          owner_user_id?: string | null
          rating?: number | null
          slug: string
          total_rescued?: number | null
          verified?: boolean
        }
        Update: {
          address?: string
          category?: Database["public"]["Enums"]["donor_category"]
          city?: string | null
          cover_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          latitude?: number | null
          logo_url?: string | null
          longitude?: number | null
          name?: string
          owner_user_id?: string | null
          rating?: number | null
          slug?: string
          total_rescued?: number | null
          verified?: boolean
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          avatar_url: string | null
          created_at: string
          full_name: string
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          created_at?: string
          full_name?: string
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          created_at?: string
          full_name?: string
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      reports: {
        Row: {
          created_at: string
          evidence_url: string | null
          id: string
          listing_id: string | null
          reason: string
          reporter_id: string
          status: Database["public"]["Enums"]["report_status"]
          target_user_id: string | null
        }
        Insert: {
          created_at?: string
          evidence_url?: string | null
          id?: string
          listing_id?: string | null
          reason: string
          reporter_id: string
          status?: Database["public"]["Enums"]["report_status"]
          target_user_id?: string | null
        }
        Update: {
          created_at?: string
          evidence_url?: string | null
          id?: string
          listing_id?: string | null
          reason?: string
          reporter_id?: string
          status?: Database["public"]["Enums"]["report_status"]
          target_user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reports_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "food_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      reservations: {
        Row: {
          created_at: string
          expires_at: string
          id: string
          listing_id: string
          picked_up_at: string | null
          portions: number
          status: Database["public"]["Enums"]["reservation_status"]
          user_id: string
        }
        Insert: {
          created_at?: string
          expires_at?: string
          id?: string
          listing_id: string
          picked_up_at?: string | null
          portions: number
          status?: Database["public"]["Enums"]["reservation_status"]
          user_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string
          id?: string
          listing_id?: string
          picked_up_at?: string | null
          portions?: number
          status?: Database["public"]["Enums"]["reservation_status"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reservations_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "food_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      sanctions: {
        Row: {
          active: boolean
          created_at: string
          id: string
          issued_by: string | null
          reason: string
          type: Database["public"]["Enums"]["sanction_type"]
          user_id: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          id?: string
          issued_by?: string | null
          reason: string
          type: Database["public"]["Enums"]["sanction_type"]
          user_id: string
        }
        Update: {
          active?: boolean
          created_at?: string
          id?: string
          issued_by?: string | null
          reason?: string
          type?: Database["public"]["Enums"]["sanction_type"]
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role:
        | "admin"
        | "donor_hotel"
        | "donor_restoran"
        | "donor_umkm"
        | "donor_mbg"
        | "penerima"
      donor_category: "hotel" | "restoran" | "umkm" | "mbg"
      listing_status:
        | "available"
        | "reserved"
        | "picked_up"
        | "expired"
        | "cancelled"
      report_status: "open" | "reviewed" | "resolved" | "dismissed"
      reservation_status: "pending" | "picked_up" | "expired" | "cancelled"
      sanction_type: "warning" | "suspended" | "banned"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "admin",
        "donor_hotel",
        "donor_restoran",
        "donor_umkm",
        "donor_mbg",
        "penerima",
      ],
      donor_category: ["hotel", "restoran", "umkm", "mbg"],
      listing_status: [
        "available",
        "reserved",
        "picked_up",
        "expired",
        "cancelled",
      ],
      report_status: ["open", "reviewed", "resolved", "dismissed"],
      reservation_status: ["pending", "picked_up", "expired", "cancelled"],
      sanction_type: ["warning", "suspended", "banned"],
    },
  },
} as const
