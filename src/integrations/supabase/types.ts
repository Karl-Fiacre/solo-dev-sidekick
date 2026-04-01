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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      audit_logs_keyli: {
        Row: {
          action: string
          admin_id: string
          created_at: string
          details: Json | null
          entity_id: string | null
          entity_type: string
          id: string
        }
        Insert: {
          action: string
          admin_id: string
          created_at?: string
          details?: Json | null
          entity_id?: string | null
          entity_type: string
          id?: string
        }
        Update: {
          action?: string
          admin_id?: string
          created_at?: string
          details?: Json | null
          entity_id?: string | null
          entity_type?: string
          id?: string
        }
        Relationships: []
      }
      bookings_voyago: {
        Row: {
          amount: number
          created_at: string
          id: string
          payment_method: string | null
          payment_status: string | null
          seat_number: number | null
          status: string
          trip_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          payment_method?: string | null
          payment_status?: string | null
          seat_number?: number | null
          status?: string
          trip_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          payment_method?: string | null
          payment_status?: string | null
          seat_number?: number | null
          status?: string
          trip_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_voyago_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips_voyago"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_voyago_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles_voyago"
            referencedColumns: ["id"]
          },
        ]
      }
      cart_items_boutiik: {
        Row: {
          created_at: string
          id: string
          image: string
          nom: string
          prix: number
          product_id: string
          quantite: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          image?: string
          nom: string
          prix: number
          product_id: string
          quantite?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          image?: string
          nom?: string
          prix?: number
          product_id?: string
          quantite?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_boutiik_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products_boutiik"
            referencedColumns: ["id"]
          },
        ]
      }
      categories_boutiik: {
        Row: {
          created_at: string
          description: string | null
          id: string
          nom: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          nom: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          nom?: string
        }
        Relationships: []
      }
      clients_fact_digit2: {
        Row: {
          address: string | null
          company_id: string
          created_at: string
          email: string | null
          id: string
          name: string
          numero_cc: string | null
          phone: string | null
          rccm: string | null
          type: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          company_id: string
          created_at?: string
          email?: string | null
          id?: string
          name: string
          numero_cc?: string | null
          phone?: string | null
          rccm?: string | null
          type?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          company_id?: string
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          numero_cc?: string | null
          phone?: string | null
          rccm?: string | null
          type?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "clients_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_fact_digit2"
            referencedColumns: ["id"]
          },
        ]
      }
      commande_items_boutiik: {
        Row: {
          commande_id: string
          created_at: string
          id: string
          nom_produit: string
          prix_unitaire: number
          product_id: string
          quantite: number
          total_ligne: number
        }
        Insert: {
          commande_id: string
          created_at?: string
          id?: string
          nom_produit: string
          prix_unitaire: number
          product_id: string
          quantite?: number
          total_ligne: number
        }
        Update: {
          commande_id?: string
          created_at?: string
          id?: string
          nom_produit?: string
          prix_unitaire?: number
          product_id?: string
          quantite?: number
          total_ligne?: number
        }
        Relationships: [
          {
            foreignKeyName: "commande_items_boutiik_commande_id_fkey"
            columns: ["commande_id"]
            isOneToOne: false
            referencedRelation: "commandes_boutiik"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commande_items_boutiik_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products_boutiik"
            referencedColumns: ["id"]
          },
        ]
      }
      commandes_boutiik: {
        Row: {
          client_id: string
          created_at: string
          date_commande: string
          date_livraison: string | null
          id: string
          statut: string
          total: number
          updated_at: string
          whatsapp_sent: boolean | null
        }
        Insert: {
          client_id: string
          created_at?: string
          date_commande?: string
          date_livraison?: string | null
          id?: string
          statut?: string
          total?: number
          updated_at?: string
          whatsapp_sent?: boolean | null
        }
        Update: {
          client_id?: string
          created_at?: string
          date_commande?: string
          date_livraison?: string | null
          id?: string
          statut?: string
          total?: number
          updated_at?: string
          whatsapp_sent?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "commandes_boutiik_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles_boutiik"
            referencedColumns: ["id"]
          },
        ]
      }
      companies_fact_digit2: {
        Row: {
          address: string | null
          created_at: string
          email: string | null
          id: string
          logo_url: string | null
          name: string
          numero_cc: string | null
          phone: string | null
          rccm: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string
          email?: string | null
          id?: string
          logo_url?: string | null
          name: string
          numero_cc?: string | null
          phone?: string | null
          rccm?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string
          email?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          numero_cc?: string | null
          phone?: string | null
          rccm?: string | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      contacts_boutiik: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          nom: string
          reponse: string | null
          statut: string
          sujet: string
          telephone: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          nom: string
          reponse?: string | null
          statut?: string
          sujet: string
          telephone?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          nom?: string
          reponse?: string | null
          statut?: string
          sujet?: string
          telephone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      contacts_caesars_immobilier_fact_digit2: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          status: string | null
          subject: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          status?: string | null
          subject: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          status?: string | null
          subject?: string
          updated_at?: string
        }
        Relationships: []
      }
      contacts_exform: {
        Row: {
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          message: string
          status: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          message: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          message?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      contacts_melliamcosmetics_fact_digit2: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          status: string | null
          subject: string
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          status?: string | null
          subject: string
          type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          status?: string | null
          subject?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      documents_keyli: {
        Row: {
          created_at: string
          doc_type: Database["public"]["Enums"]["document_type_keyli"]
          file_url: string
          id: string
          property_id: string | null
          review_notes: string | null
          reviewed_at: string | null
          status: Database["public"]["Enums"]["document_status_keyli"] | null
          user_id: string
        }
        Insert: {
          created_at?: string
          doc_type: Database["public"]["Enums"]["document_type_keyli"]
          file_url: string
          id?: string
          property_id?: string | null
          review_notes?: string | null
          reviewed_at?: string | null
          status?: Database["public"]["Enums"]["document_status_keyli"] | null
          user_id: string
        }
        Update: {
          created_at?: string
          doc_type?: Database["public"]["Enums"]["document_type_keyli"]
          file_url?: string
          id?: string
          property_id?: string | null
          review_notes?: string | null
          reviewed_at?: string | null
          status?: Database["public"]["Enums"]["document_status_keyli"] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "documents_keyli_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_keyli"
            referencedColumns: ["id"]
          },
        ]
      }
      event_registrations_melliamcosmetics_fact_digit2: {
        Row: {
          created_at: string
          dietary_restrictions: string | null
          email: string
          event_id: string
          first_name: string
          id: string
          last_name: string
          payment_amount: number | null
          payment_status: string | null
          phone: string | null
          registration_date: string
          special_requests: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          dietary_restrictions?: string | null
          email: string
          event_id: string
          first_name: string
          id?: string
          last_name: string
          payment_amount?: number | null
          payment_status?: string | null
          phone?: string | null
          registration_date?: string
          special_requests?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          dietary_restrictions?: string | null
          email?: string
          event_id?: string
          first_name?: string
          id?: string
          last_name?: string
          payment_amount?: number | null
          payment_status?: string | null
          phone?: string | null
          registration_date?: string
          special_requests?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events_melliamcosmetics_fact_digit2"
            referencedColumns: ["id"]
          },
        ]
      }
      events_melliamcosmetics_fact_digit2: {
        Row: {
          created_at: string
          current_participants: number | null
          description: string | null
          event_date: string
          event_type: string | null
          id: string
          image_url: string | null
          location: string | null
          max_participants: number | null
          price: number | null
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          current_participants?: number | null
          description?: string | null
          event_date: string
          event_type?: string | null
          id?: string
          image_url?: string | null
          location?: string | null
          max_participants?: number | null
          price?: number | null
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          current_participants?: number | null
          description?: string | null
          event_date?: string
          event_type?: string | null
          id?: string
          image_url?: string | null
          location?: string | null
          max_participants?: number | null
          price?: number | null
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      feedback_keyli: {
        Row: {
          admin_response: string | null
          created_at: string
          id: string
          message: string
          status: string
          subject: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          admin_response?: string | null
          created_at?: string
          id?: string
          message: string
          status?: string
          subject: string
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          admin_response?: string | null
          created_at?: string
          id?: string
          message?: string
          status?: string
          subject?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      financial_reports_fact_digit2: {
        Row: {
          clients_count: number
          company_id: string
          created_at: string
          expenses: number
          generated_content: string
          id: string
          invoices_count: number
          period: string
          products_count: number
          profit: number
          revenue: number
          tva: number
          updated_at: string
        }
        Insert: {
          clients_count: number
          company_id: string
          created_at?: string
          expenses: number
          generated_content: string
          id?: string
          invoices_count: number
          period: string
          products_count: number
          profit: number
          revenue: number
          tva: number
          updated_at?: string
        }
        Update: {
          clients_count?: number
          company_id?: string
          created_at?: string
          expenses?: number
          generated_content?: string
          id?: string
          invoices_count?: number
          period?: string
          products_count?: number
          profit?: number
          revenue?: number
          tva?: number
          updated_at?: string
        }
        Relationships: []
      }
      fne_logs_fact_digit2: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          invoice_id: string
          request_data: Json
          response_data: Json | null
          status: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          invoice_id: string
          request_data: Json
          response_data?: Json | null
          status: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          invoice_id?: string
          request_data?: Json
          response_data?: Json | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "fne_logs_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices_fact_digit2"
            referencedColumns: ["id"]
          },
        ]
      }
      inscription_pilot_keyli: {
        Row: {
          budget: number | null
          city: string | null
          created_at: string
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          message: string | null
          phone: string | null
          priority_level:
            | Database["public"]["Enums"]["priority_level_keyli"]
            | null
          property_type:
            | Database["public"]["Enums"]["property_type_keyli"]
            | null
          source: string | null
          status: Database["public"]["Enums"]["inscription_status_keyli"] | null
          updated_at: string
        }
        Insert: {
          budget?: number | null
          city?: string | null
          created_at?: string
          email: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          message?: string | null
          phone?: string | null
          priority_level?:
            | Database["public"]["Enums"]["priority_level_keyli"]
            | null
          property_type?:
            | Database["public"]["Enums"]["property_type_keyli"]
            | null
          source?: string | null
          status?:
            | Database["public"]["Enums"]["inscription_status_keyli"]
            | null
          updated_at?: string
        }
        Update: {
          budget?: number | null
          city?: string | null
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          message?: string | null
          phone?: string | null
          priority_level?:
            | Database["public"]["Enums"]["priority_level_keyli"]
            | null
          property_type?:
            | Database["public"]["Enums"]["property_type_keyli"]
            | null
          source?: string | null
          status?:
            | Database["public"]["Enums"]["inscription_status_keyli"]
            | null
          updated_at?: string
        }
        Relationships: []
      }
      invoice_items_fact_digit2: {
        Row: {
          created_at: string
          description: string
          id: string
          invoice_id: string
          product_id: string | null
          quantity: number
          total_price: number | null
          tva_rate: number | null
          unit_price: number
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          invoice_id: string
          product_id?: string | null
          quantity?: number
          total_price?: number | null
          tva_rate?: number | null
          unit_price: number
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          invoice_id?: string
          product_id?: string | null
          quantity?: number
          total_price?: number | null
          tva_rate?: number | null
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "invoice_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices_fact_digit2"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products_fact_digit2"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices_fact_digit2: {
        Row: {
          client_id: string
          company_id: string
          created_at: string
          date_due: string | null
          date_issued: string
          fne_number: string | null
          fne_rejection_reason: string | null
          fne_status: string | null
          fne_submitted_at: string | null
          fne_validated_at: string | null
          id: string
          invoice_number: string
          notes: string | null
          status: string | null
          subtotal: number | null
          terms: string | null
          total_amount: number | null
          tva_amount: number | null
          updated_at: string
        }
        Insert: {
          client_id: string
          company_id: string
          created_at?: string
          date_due?: string | null
          date_issued?: string
          fne_number?: string | null
          fne_rejection_reason?: string | null
          fne_status?: string | null
          fne_submitted_at?: string | null
          fne_validated_at?: string | null
          id?: string
          invoice_number: string
          notes?: string | null
          status?: string | null
          subtotal?: number | null
          terms?: string | null
          total_amount?: number | null
          tva_amount?: number | null
          updated_at?: string
        }
        Update: {
          client_id?: string
          company_id?: string
          created_at?: string
          date_due?: string | null
          date_issued?: string
          fne_number?: string | null
          fne_rejection_reason?: string | null
          fne_status?: string | null
          fne_submitted_at?: string | null
          fne_validated_at?: string | null
          id?: string
          invoice_number?: string
          notes?: string | null
          status?: string | null
          subtotal?: number | null
          terms?: string | null
          total_amount?: number | null
          tva_amount?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoices_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients_fact_digit2"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_fact_digit2"
            referencedColumns: ["id"]
          },
        ]
      }
      marketing_templates_keyli: {
        Row: {
          content: string
          created_at: string
          created_by: string | null
          id: string
          image_url: string | null
          name: string
          target_audience: string | null
          title: string | null
          type: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          created_by?: string | null
          id?: string
          image_url?: string | null
          name: string
          target_audience?: string | null
          title?: string | null
          type: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          created_by?: string | null
          id?: string
          image_url?: string | null
          name?: string
          target_audience?: string | null
          title?: string | null
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      messages_chinashop_fact_digit2: {
        Row: {
          contenu: string
          created_at: string | null
          destinataire: string
          error_message: string | null
          id: string
          metadata: Json | null
          order_id: string | null
          statut: string | null
          sujet: string | null
          type: string
          user_id: string | null
        }
        Insert: {
          contenu: string
          created_at?: string | null
          destinataire: string
          error_message?: string | null
          id?: string
          metadata?: Json | null
          order_id?: string | null
          statut?: string | null
          sujet?: string | null
          type: string
          user_id?: string | null
        }
        Update: {
          contenu?: string
          created_at?: string | null
          destinataire?: string
          error_message?: string | null
          id?: string
          metadata?: Json | null
          order_id?: string | null
          statut?: string | null
          sujet?: string | null
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_chinashop_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders_chinashop_fact_digit2"
            referencedColumns: ["id"]
          },
        ]
      }
      messages_keyli: {
        Row: {
          body: string
          created_at: string
          from_user: string
          id: string
          property_id: string
          read: boolean | null
          to_user: string
        }
        Insert: {
          body: string
          created_at?: string
          from_user: string
          id?: string
          property_id: string
          read?: boolean | null
          to_user: string
        }
        Update: {
          body?: string
          created_at?: string
          from_user?: string
          id?: string
          property_id?: string
          read?: boolean | null
          to_user?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_keyli_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_keyli"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_boutiik: {
        Row: {
          created_at: string
          email: string
          id: string
          is_active: boolean | null
          nom: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_active?: boolean | null
          nom?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_active?: boolean | null
          nom?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      newsletter_subscribers_melliamcosmetics_fact_digit2: {
        Row: {
          email: string
          id: string
          name: string | null
          preferences: string[] | null
          status: string | null
          subscribed_at: string
          updated_at: string
        }
        Insert: {
          email: string
          id?: string
          name?: string | null
          preferences?: string[] | null
          status?: string | null
          subscribed_at?: string
          updated_at?: string
        }
        Update: {
          email?: string
          id?: string
          name?: string | null
          preferences?: string[] | null
          status?: string | null
          subscribed_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      notifications_voyago: {
        Row: {
          created_at: string
          id: string
          link: string | null
          message: string
          read: boolean
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          link?: string | null
          message: string
          read?: boolean
          title: string
          type?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          link?: string | null
          message?: string
          read?: boolean
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_voyago_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles_voyago"
            referencedColumns: ["id"]
          },
        ]
      }
      onboarding_checklists_keyli: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          created_at: string
          id: string
          notes: string | null
          step: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          step: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          step?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      order_items_chinashop_fact_digit2: {
        Row: {
          created_at: string | null
          id: string
          nom_produit: string
          order_id: string
          prix_unitaire: number
          product_id: string | null
          quantite: number
          total_ligne: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          nom_produit: string
          order_id: string
          prix_unitaire: number
          product_id?: string | null
          quantite: number
          total_ligne: number
        }
        Update: {
          created_at?: string | null
          id?: string
          nom_produit?: string
          order_id?: string
          prix_unitaire?: number
          product_id?: string | null
          quantite?: number
          total_ligne?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_chinashop_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders_chinashop_fact_digit2"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_chinashop_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products_chinashop_fact_digit2"
            referencedColumns: ["id"]
          },
        ]
      }
      orders_chinashop_fact_digit2: {
        Row: {
          adresse: string
          commune: string | null
          created_at: string | null
          date_commande: string | null
          date_expedition_chine: string | null
          date_livraison_estimee: string | null
          date_livraison_reelle: string | null
          date_validation: string | null
          frais_livraison: number | null
          id: string
          mode_paiement: string
          nom_complet: string
          notes: string | null
          numero_commande: string
          statut: string
          telephone: string
          total: number
          updated_at: string | null
          user_id: string
          ville: string
        }
        Insert: {
          adresse: string
          commune?: string | null
          created_at?: string | null
          date_commande?: string | null
          date_expedition_chine?: string | null
          date_livraison_estimee?: string | null
          date_livraison_reelle?: string | null
          date_validation?: string | null
          frais_livraison?: number | null
          id?: string
          mode_paiement: string
          nom_complet: string
          notes?: string | null
          numero_commande: string
          statut?: string
          telephone: string
          total: number
          updated_at?: string | null
          user_id: string
          ville: string
        }
        Update: {
          adresse?: string
          commune?: string | null
          created_at?: string | null
          date_commande?: string | null
          date_expedition_chine?: string | null
          date_livraison_estimee?: string | null
          date_livraison_reelle?: string | null
          date_validation?: string | null
          frais_livraison?: number | null
          id?: string
          mode_paiement?: string
          nom_complet?: string
          notes?: string | null
          numero_commande?: string
          statut?: string
          telephone?: string
          total?: number
          updated_at?: string | null
          user_id?: string
          ville?: string
        }
        Relationships: []
      }
      payment_attempts_keyli: {
        Row: {
          amount: number | null
          created_at: string
          email: string | null
          error_message: string | null
          id: string
          paystack_reference: string | null
          plan_type: string | null
          status: string
          user_id: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string
          email?: string | null
          error_message?: string | null
          id?: string
          paystack_reference?: string | null
          plan_type?: string | null
          status?: string
          user_id?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string
          email?: string | null
          error_message?: string | null
          id?: string
          paystack_reference?: string | null
          plan_type?: string | null
          status?: string
          user_id?: string | null
        }
        Relationships: []
      }
      products_boutiik: {
        Row: {
          categorie: string | null
          categories: string[] | null
          created_at: string
          delai_livraison: string | null
          description: string | null
          en_promotion: boolean | null
          id: string
          image_url: string | null
          is_active: boolean | null
          nom: string
          prix: number
          prix_promo: number | null
          promo_debut: string | null
          promo_fin: string | null
          stock: number
          updated_at: string
        }
        Insert: {
          categorie?: string | null
          categories?: string[] | null
          created_at?: string
          delai_livraison?: string | null
          description?: string | null
          en_promotion?: boolean | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          nom: string
          prix: number
          prix_promo?: number | null
          promo_debut?: string | null
          promo_fin?: string | null
          stock?: number
          updated_at?: string
        }
        Update: {
          categorie?: string | null
          categories?: string[] | null
          created_at?: string
          delai_livraison?: string | null
          description?: string | null
          en_promotion?: boolean | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          nom?: string
          prix?: number
          prix_promo?: number | null
          promo_debut?: string | null
          promo_fin?: string | null
          stock?: number
          updated_at?: string
        }
        Relationships: []
      }
      products_chinashop_fact_digit2: {
        Row: {
          categorie: string
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          images_urls: string[] | null
          is_featured: boolean | null
          nom: string
          origine: string
          prix: number
          stock: number
          updated_at: string | null
        }
        Insert: {
          categorie: string
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          images_urls?: string[] | null
          is_featured?: boolean | null
          nom: string
          origine?: string
          prix: number
          stock?: number
          updated_at?: string | null
        }
        Update: {
          categorie?: string
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          images_urls?: string[] | null
          is_featured?: boolean | null
          nom?: string
          origine?: string
          prix?: number
          stock?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      products_fact_digit2: {
        Row: {
          category: string | null
          company_id: string
          created_at: string
          description: string | null
          id: string
          is_service: boolean | null
          name: string
          price: number
          tva_rate: number | null
          unit: string | null
          updated_at: string
        }
        Insert: {
          category?: string | null
          company_id: string
          created_at?: string
          description?: string | null
          id?: string
          is_service?: boolean | null
          name: string
          price?: number
          tva_rate?: number | null
          unit?: string | null
          updated_at?: string
        }
        Update: {
          category?: string | null
          company_id?: string
          created_at?: string
          description?: string | null
          id?: string
          is_service?: boolean | null
          name?: string
          price?: number
          tva_rate?: number | null
          unit?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_fact_digit2"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles_boutiik: {
        Row: {
          adresse: string
          created_at: string
          email: string | null
          id: string
          nom: string
          telephone: string
          updated_at: string
          user_id: string
        }
        Insert: {
          adresse: string
          created_at?: string
          email?: string | null
          id?: string
          nom: string
          telephone: string
          updated_at?: string
          user_id: string
        }
        Update: {
          adresse?: string
          created_at?: string
          email?: string | null
          id?: string
          nom?: string
          telephone?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles_chinashop_fact_digit2: {
        Row: {
          adresse: string | null
          commune: string | null
          created_at: string | null
          email: string | null
          id: string
          nom: string | null
          prenom: string | null
          telephone: string | null
          updated_at: string | null
          user_id: string
          ville: string | null
        }
        Insert: {
          adresse?: string | null
          commune?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          nom?: string | null
          prenom?: string | null
          telephone?: string | null
          updated_at?: string | null
          user_id: string
          ville?: string | null
        }
        Update: {
          adresse?: string | null
          commune?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          nom?: string | null
          prenom?: string | null
          telephone?: string | null
          updated_at?: string | null
          user_id?: string
          ville?: string | null
        }
        Relationships: []
      }
      profiles_fact_digit2: {
        Row: {
          address: string | null
          bio: string | null
          company_id: string | null
          created_at: string
          display_name: string | null
          email: string | null
          first_name: string | null
          id: string
          id_number: string | null
          id_validity_date: string | null
          last_name: string | null
          phone: string | null
          photo_url: string | null
          rating_avg: number | null
          role: string | null
          role_keyli: Database["public"]["Enums"]["user_role_keyli"] | null
          updated_at: string
          user_id: string
          verification_badge_reason: string | null
          verification_date: string | null
          verified: boolean | null
        }
        Insert: {
          address?: string | null
          bio?: string | null
          company_id?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          id_number?: string | null
          id_validity_date?: string | null
          last_name?: string | null
          phone?: string | null
          photo_url?: string | null
          rating_avg?: number | null
          role?: string | null
          role_keyli?: Database["public"]["Enums"]["user_role_keyli"] | null
          updated_at?: string
          user_id: string
          verification_badge_reason?: string | null
          verification_date?: string | null
          verified?: boolean | null
        }
        Update: {
          address?: string | null
          bio?: string | null
          company_id?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          id_number?: string | null
          id_validity_date?: string | null
          last_name?: string | null
          phone?: string | null
          photo_url?: string | null
          rating_avg?: number | null
          role?: string | null
          role_keyli?: Database["public"]["Enums"]["user_role_keyli"] | null
          updated_at?: string
          user_id?: string
          verification_badge_reason?: string | null
          verification_date?: string | null
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_fact_digit2"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles_keyli: {
        Row: {
          address: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          email: string
          first_name: string | null
          id: string
          id_number: string | null
          id_validity_date: string | null
          is_founding_partner: boolean | null
          last_name: string | null
          phone: string | null
          photo_url: string | null
          pilot_joined_at: string | null
          rating_avg: number | null
          role_keyli: string | null
          updated_at: string
          user_id: string
          verification_date: string | null
          verified: boolean | null
        }
        Insert: {
          address?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          email: string
          first_name?: string | null
          id?: string
          id_number?: string | null
          id_validity_date?: string | null
          is_founding_partner?: boolean | null
          last_name?: string | null
          phone?: string | null
          photo_url?: string | null
          pilot_joined_at?: string | null
          rating_avg?: number | null
          role_keyli?: string | null
          updated_at?: string
          user_id: string
          verification_date?: string | null
          verified?: boolean | null
        }
        Update: {
          address?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          email?: string
          first_name?: string | null
          id?: string
          id_number?: string | null
          id_validity_date?: string | null
          is_founding_partner?: boolean | null
          last_name?: string | null
          phone?: string | null
          photo_url?: string | null
          pilot_joined_at?: string | null
          rating_avg?: number | null
          role_keyli?: string | null
          updated_at?: string
          user_id?: string
          verification_date?: string | null
          verified?: boolean | null
        }
        Relationships: []
      }
      profiles_voyago: {
        Row: {
          avatar_url: string | null
          company_description: string | null
          company_logo_url: string | null
          company_name: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
          user_id: string
          user_type: string
        }
        Insert: {
          avatar_url?: string | null
          company_description?: string | null
          company_logo_url?: string | null
          company_name?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
          user_type?: string
        }
        Update: {
          avatar_url?: string | null
          company_description?: string | null
          company_logo_url?: string | null
          company_name?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
          user_type?: string
        }
        Relationships: []
      }
      properties_caesars_immobilier_fact_digit2: {
        Row: {
          area_m2: number | null
          bathrooms: number | null
          created_at: string
          description: string | null
          featured: boolean | null
          features: string[] | null
          id: string
          images_urls: string[] | null
          location: string
          main_image_url: string | null
          price: number
          property_type: string
          rooms: number | null
          status: string | null
          title: string
          transaction_type: string
          updated_at: string
        }
        Insert: {
          area_m2?: number | null
          bathrooms?: number | null
          created_at?: string
          description?: string | null
          featured?: boolean | null
          features?: string[] | null
          id?: string
          images_urls?: string[] | null
          location: string
          main_image_url?: string | null
          price: number
          property_type: string
          rooms?: number | null
          status?: string | null
          title: string
          transaction_type: string
          updated_at?: string
        }
        Update: {
          area_m2?: number | null
          bathrooms?: number | null
          created_at?: string
          description?: string | null
          featured?: boolean | null
          features?: string[] | null
          id?: string
          images_urls?: string[] | null
          location?: string
          main_image_url?: string | null
          price?: number
          property_type?: string
          rooms?: number | null
          status?: string | null
          title?: string
          transaction_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      properties_keyli: {
        Row: {
          advantages: Json | null
          area_m2: number | null
          bathrooms: number | null
          city: string
          created_at: string
          description: string | null
          furnished: boolean | null
          geolocation: unknown
          id: string
          is_pilot: boolean | null
          is_verified: boolean | null
          main_image_url: string | null
          neighborhood: string | null
          owner_id: string
          pilot_added_at: string | null
          price: number
          rooms: number | null
          status: Database["public"]["Enums"]["property_status_keyli"]
          title: string
          type: Database["public"]["Enums"]["property_type_keyli"]
          updated_at: string
          video_url: string | null
        }
        Insert: {
          advantages?: Json | null
          area_m2?: number | null
          bathrooms?: number | null
          city: string
          created_at?: string
          description?: string | null
          furnished?: boolean | null
          geolocation?: unknown
          id?: string
          is_pilot?: boolean | null
          is_verified?: boolean | null
          main_image_url?: string | null
          neighborhood?: string | null
          owner_id: string
          pilot_added_at?: string | null
          price: number
          rooms?: number | null
          status: Database["public"]["Enums"]["property_status_keyli"]
          title: string
          type: Database["public"]["Enums"]["property_type_keyli"]
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          advantages?: Json | null
          area_m2?: number | null
          bathrooms?: number | null
          city?: string
          created_at?: string
          description?: string | null
          furnished?: boolean | null
          geolocation?: unknown
          id?: string
          is_pilot?: boolean | null
          is_verified?: boolean | null
          main_image_url?: string | null
          neighborhood?: string | null
          owner_id?: string
          pilot_added_at?: string | null
          price?: number
          rooms?: number | null
          status?: Database["public"]["Enums"]["property_status_keyli"]
          title?: string
          type?: Database["public"]["Enums"]["property_type_keyli"]
          updated_at?: string
          video_url?: string | null
        }
        Relationships: []
      }
      property_media_keyli: {
        Row: {
          created_at: string
          id: string
          media_type: string
          order_index: number | null
          property_id: string
          url: string
        }
        Insert: {
          created_at?: string
          id?: string
          media_type: string
          order_index?: number | null
          property_id: string
          url: string
        }
        Update: {
          created_at?: string
          id?: string
          media_type?: string
          order_index?: number | null
          property_id?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_media_keyli_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_keyli"
            referencedColumns: ["id"]
          },
        ]
      }
      quote_requests: {
        Row: {
          budget: string | null
          created_at: string
          email: string
          id: string
          location: string | null
          message: string | null
          name: string
          phone: string
          project_type: string
          updated_at: string
        }
        Insert: {
          budget?: string | null
          created_at?: string
          email: string
          id?: string
          location?: string | null
          message?: string | null
          name: string
          phone: string
          project_type: string
          updated_at?: string
        }
        Update: {
          budget?: string | null
          created_at?: string
          email?: string
          id?: string
          location?: string | null
          message?: string | null
          name?: string
          phone?: string
          project_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      quote_requests_caesars_immobilier_fact_digit2: {
        Row: {
          budget: string | null
          created_at: string
          email: string
          id: string
          location: string | null
          message: string | null
          name: string
          phone: string
          project_type: string
          status: string | null
          updated_at: string
        }
        Insert: {
          budget?: string | null
          created_at?: string
          email: string
          id?: string
          location?: string | null
          message?: string | null
          name: string
          phone: string
          project_type: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          budget?: string | null
          created_at?: string
          email?: string
          id?: string
          location?: string | null
          message?: string | null
          name?: string
          phone?: string
          project_type?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      ratings_keyli: {
        Row: {
          comment: string | null
          created_at: string
          id: string
          property_id: string
          rated_user_id: string
          rater_id: string
          rating: number
          updated_at: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: string
          property_id: string
          rated_user_id: string
          rater_id: string
          rating: number
          updated_at?: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: string
          property_id?: string
          rated_user_id?: string
          rater_id?: string
          rating?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ratings_keyli_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_keyli"
            referencedColumns: ["id"]
          },
        ]
      }
      ratings_voyago: {
        Row: {
          comment: string | null
          company_id: string
          created_at: string
          id: string
          rating: number
          trip_id: string | null
          user_id: string
        }
        Insert: {
          comment?: string | null
          company_id: string
          created_at?: string
          id?: string
          rating: number
          trip_id?: string | null
          user_id: string
        }
        Update: {
          comment?: string | null
          company_id?: string
          created_at?: string
          id?: string
          rating?: number
          trip_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ratings_voyago_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "profiles_voyago"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ratings_voyago_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips_voyago"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ratings_voyago_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles_voyago"
            referencedColumns: ["id"]
          },
        ]
      }
      recus_boutiik: {
        Row: {
          commande_id: string
          created_at: string
          id: string
          lien_pdf: string | null
        }
        Insert: {
          commande_id: string
          created_at?: string
          id?: string
          lien_pdf?: string | null
        }
        Update: {
          commande_id?: string
          created_at?: string
          id?: string
          lien_pdf?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recus_boutiik_commande_id_fkey"
            columns: ["commande_id"]
            isOneToOne: false
            referencedRelation: "commandes_boutiik"
            referencedColumns: ["id"]
          },
        ]
      }
      registrations_melliamcosmetics_fact_digit2: {
        Row: {
          created_at: string
          dietary_restrictions: string | null
          email: string
          eventbrite_attendee_id: string | null
          eventbrite_order_id: string | null
          eventbrite_ticket_url: string | null
          first_name: string
          id: string
          interests: string[] | null
          last_name: string
          organization: string | null
          phone: string
          position: string | null
          status: string | null
          ticket_generated_at: string | null
          ticket_number: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          dietary_restrictions?: string | null
          email: string
          eventbrite_attendee_id?: string | null
          eventbrite_order_id?: string | null
          eventbrite_ticket_url?: string | null
          first_name: string
          id?: string
          interests?: string[] | null
          last_name: string
          organization?: string | null
          phone: string
          position?: string | null
          status?: string | null
          ticket_generated_at?: string | null
          ticket_number?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          dietary_restrictions?: string | null
          email?: string
          eventbrite_attendee_id?: string | null
          eventbrite_order_id?: string | null
          eventbrite_ticket_url?: string | null
          first_name?: string
          id?: string
          interests?: string[] | null
          last_name?: string
          organization?: string | null
          phone?: string
          position?: string | null
          status?: string | null
          ticket_generated_at?: string | null
          ticket_number?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      reports_keyli: {
        Row: {
          created_at: string
          id: string
          property_id: string
          reason: string
          reporter_id: string
          status: Database["public"]["Enums"]["report_status_keyli"] | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          property_id: string
          reason: string
          reporter_id: string
          status?: Database["public"]["Enums"]["report_status_keyli"] | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          property_id?: string
          reason?: string
          reporter_id?: string
          status?: Database["public"]["Enums"]["report_status_keyli"] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reports_keyli_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_keyli"
            referencedColumns: ["id"]
          },
        ]
      }
      reservations_melliamcosmetics_fact_digit2: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          phone: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
          phone: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          phone?: string
          updated_at?: string
        }
        Relationships: []
      }
      sav_boutiik: {
        Row: {
          client_id: string
          commande_id: string | null
          created_at: string
          id: string
          message: string
          reponse: string | null
          statut: string
          sujet: string
          updated_at: string
        }
        Insert: {
          client_id: string
          commande_id?: string | null
          created_at?: string
          id?: string
          message: string
          reponse?: string | null
          statut?: string
          sujet: string
          updated_at?: string
        }
        Update: {
          client_id?: string
          commande_id?: string | null
          created_at?: string
          id?: string
          message?: string
          reponse?: string | null
          statut?: string
          sujet?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sav_boutiik_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles_boutiik"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sav_boutiik_commande_id_fkey"
            columns: ["commande_id"]
            isOneToOne: false
            referencedRelation: "commandes_boutiik"
            referencedColumns: ["id"]
          },
        ]
      }
      signup_attempts_keyli: {
        Row: {
          completed: boolean
          completed_at: string | null
          created_at: string
          email: string | null
          error_message: string | null
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          role: string | null
          step_reached: string
          user_agent: string | null
        }
        Insert: {
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          email?: string | null
          error_message?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          role?: string | null
          step_reached?: string
          user_agent?: string | null
        }
        Update: {
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          email?: string | null
          error_message?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          role?: string | null
          step_reached?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      subscriptions_keyli: {
        Row: {
          amount: number
          created_at: string
          end_date: string
          id: string
          last_warning_sent: string | null
          paystack_payment_id: string | null
          plan: Database["public"]["Enums"]["subscription_plan_keyli"]
          start_date: string
          status:
            | Database["public"]["Enums"]["subscription_status_keyli"]
            | null
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          end_date: string
          id?: string
          last_warning_sent?: string | null
          paystack_payment_id?: string | null
          plan: Database["public"]["Enums"]["subscription_plan_keyli"]
          start_date?: string
          status?:
            | Database["public"]["Enums"]["subscription_status_keyli"]
            | null
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          end_date?: string
          id?: string
          last_warning_sent?: string | null
          paystack_payment_id?: string | null
          plan?: Database["public"]["Enums"]["subscription_plan_keyli"]
          start_date?: string
          status?:
            | Database["public"]["Enums"]["subscription_status_keyli"]
            | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      teachings_melliamcosmetics_fact_digit2: {
        Row: {
          category: string | null
          content: string
          created_at: string
          id: string
          is_featured: boolean | null
          source: string | null
          title: string | null
          updated_at: string
        }
        Insert: {
          category?: string | null
          content: string
          created_at?: string
          id?: string
          is_featured?: boolean | null
          source?: string | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          category?: string | null
          content?: string
          created_at?: string
          id?: string
          is_featured?: boolean | null
          source?: string | null
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      testimonials_melliamcosmetics_fact_digit2: {
        Row: {
          avatar_url: string | null
          content: string
          created_at: string
          email: string | null
          experience_type: string | null
          id: string
          is_approved: boolean | null
          is_featured: boolean | null
          location: string | null
          name: string
          rating: number | null
          title: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          content: string
          created_at?: string
          email?: string | null
          experience_type?: string | null
          id?: string
          is_approved?: boolean | null
          is_featured?: boolean | null
          location?: string | null
          name: string
          rating?: number | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          content?: string
          created_at?: string
          email?: string | null
          experience_type?: string | null
          id?: string
          is_approved?: boolean | null
          is_featured?: boolean | null
          location?: string | null
          name?: string
          rating?: number | null
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      training_registrations_exform: {
        Row: {
          company: string | null
          created_at: string
          email: string
          experience_level: string | null
          first_name: string
          id: string
          last_name: string
          motivation: string | null
          phone: string
          position: string | null
          preferred_training: string | null
          profession: string
          referral_source: string
          start_date: string | null
          status: string | null
          training_name: string
          updated_at: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          experience_level?: string | null
          first_name: string
          id?: string
          last_name: string
          motivation?: string | null
          phone: string
          position?: string | null
          preferred_training?: string | null
          profession: string
          referral_source: string
          start_date?: string | null
          status?: string | null
          training_name: string
          updated_at?: string
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          experience_level?: string | null
          first_name?: string
          id?: string
          last_name?: string
          motivation?: string | null
          phone?: string
          position?: string | null
          preferred_training?: string | null
          profession?: string
          referral_source?: string
          start_date?: string | null
          status?: string | null
          training_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      transactions_chinashop_fact_digit2: {
        Row: {
          created_at: string | null
          details: Json | null
          id: string
          methode: string
          montant: number
          order_id: string
          reference: string
          statut: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          details?: Json | null
          id?: string
          methode: string
          montant: number
          order_id: string
          reference: string
          statut?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          details?: Json | null
          id?: string
          methode?: string
          montant?: number
          order_id?: string
          reference?: string
          statut?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_chinashop_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders_chinashop_fact_digit2"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions_keyli: {
        Row: {
          amount: number
          created_at: string
          currency: string | null
          id: string
          paystack_ref: string | null
          status: Database["public"]["Enums"]["transaction_status_keyli"] | null
          subscription_id: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string | null
          id?: string
          paystack_ref?: string | null
          status?:
            | Database["public"]["Enums"]["transaction_status_keyli"]
            | null
          subscription_id?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string | null
          id?: string
          paystack_ref?: string | null
          status?:
            | Database["public"]["Enums"]["transaction_status_keyli"]
            | null
          subscription_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_keyli_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions_keyli"
            referencedColumns: ["id"]
          },
        ]
      }
      travel_requests_voyago: {
        Row: {
          created_at: string
          departure_city: string
          destination_city: string
          id: string
          passengers: number
          status: string
          travel_date: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          departure_city: string
          destination_city: string
          id?: string
          passengers?: number
          status?: string
          travel_date: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          departure_city?: string
          destination_city?: string
          id?: string
          passengers?: number
          status?: string
          travel_date?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "travel_requests_voyago_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles_voyago"
            referencedColumns: ["id"]
          },
        ]
      }
      trips_voyago: {
        Row: {
          arrival_city: string
          arrival_time: string | null
          available_seats: number
          company_id: string
          created_at: string
          departure_city: string
          departure_time: string
          id: string
          price: number
          status: string
          total_seats: number
          trip_type: string | null
          updated_at: string
        }
        Insert: {
          arrival_city: string
          arrival_time?: string | null
          available_seats?: number
          company_id: string
          created_at?: string
          departure_city: string
          departure_time: string
          id?: string
          price: number
          status?: string
          total_seats?: number
          trip_type?: string | null
          updated_at?: string
        }
        Update: {
          arrival_city?: string
          arrival_time?: string | null
          available_seats?: number
          company_id?: string
          created_at?: string
          departure_city?: string
          departure_time?: string
          id?: string
          price?: number
          status?: string
          total_seats?: number
          trip_type?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "trips_voyago_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "profiles_voyago"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles_boutiik: {
        Row: {
          created_at: string
          id: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles_fact_digit2: {
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
      exform_stats: {
        Row: {
          date: string | null
          profession: string | null
          registrations_count: number | null
          training_name: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      create_company_for_signup: {
        Args: {
          _company_address?: string
          _company_email?: string
          _company_name: string
          _company_numero_cc?: string
          _company_phone?: string
          _company_rccm?: string
          _user_first_name?: string
          _user_id: string
          _user_last_name?: string
          _user_phone?: string
        }
        Returns: string
      }
      generate_order_number: { Args: never; Returns: string }
      get_dashboard_stats: {
        Args: { p_company_id: string }
        Returns: {
          clients_count: number
          invoices_count: number
          products_count: number
          total_revenue: number
          total_tva: number
        }[]
      }
      get_user_role_keyli: { Args: { user_uuid: string }; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin_boutiik: { Args: { _user_id: string }; Returns: boolean }
      is_admin_keyli: { Args: { user_id: string }; Returns: boolean }
      is_super_admin: { Args: { _user_id: string }; Returns: boolean }
      promote_to_admin_keyli: { Args: { user_email: string }; Returns: string }
      secure_function_example: { Args: never; Returns: string }
      user_company_id: { Args: { _user_id: string }; Returns: string }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user" | "super_admin"
      document_status_keyli: "pending" | "approved" | "rejected"
      document_type_keyli:
        | "acd"
        | "registre"
        | "extrait_naissance"
        | "cert_residence"
        | "permis_construire"
        | "id_front"
        | "id_back"
      inscription_status_keyli:
        | "en_attente"
        | "contacte"
        | "converti"
        | "rejete"
      priority_level_keyli: "haute" | "moyenne" | "basse"
      property_status_keyli: "a_louer" | "a_vendre"
      property_type_keyli:
        | "maison"
        | "duplex"
        | "villa"
        | "appartement"
        | "studio"
        | "residence_meublee"
        | "auberge"
        | "hotel"
        | "bureau"
        | "magasin"
      report_status_keyli: "pending" | "reviewed" | "resolved"
      subscription_plan_keyli:
        | "owner_agency"
        | "basic_user"
        | "pilot_owner_agency"
      subscription_status_keyli: "active" | "expired" | "canceled"
      transaction_status_keyli: "pending" | "completed" | "failed"
      user_role_keyli: "user" | "owner" | "agency" | "admin"
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
      app_role: ["admin", "moderator", "user", "super_admin"],
      document_status_keyli: ["pending", "approved", "rejected"],
      document_type_keyli: [
        "acd",
        "registre",
        "extrait_naissance",
        "cert_residence",
        "permis_construire",
        "id_front",
        "id_back",
      ],
      inscription_status_keyli: [
        "en_attente",
        "contacte",
        "converti",
        "rejete",
      ],
      priority_level_keyli: ["haute", "moyenne", "basse"],
      property_status_keyli: ["a_louer", "a_vendre"],
      property_type_keyli: [
        "maison",
        "duplex",
        "villa",
        "appartement",
        "studio",
        "residence_meublee",
        "auberge",
        "hotel",
        "bureau",
        "magasin",
      ],
      report_status_keyli: ["pending", "reviewed", "resolved"],
      subscription_plan_keyli: [
        "owner_agency",
        "basic_user",
        "pilot_owner_agency",
      ],
      subscription_status_keyli: ["active", "expired", "canceled"],
      transaction_status_keyli: ["pending", "completed", "failed"],
      user_role_keyli: ["user", "owner", "agency", "admin"],
    },
  },
} as const
