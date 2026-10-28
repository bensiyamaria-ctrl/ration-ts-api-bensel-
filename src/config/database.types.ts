
export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: number;
          name: string;
          price: number;
        };
        Insert: {
          id?: number;
          name: string;
          price: number;
        };
        Update: {
          id?: number;
          name?: string;
          price?: number;
        };
        Relationships: [];
      };

      stock: {
        Row: {
          id: number;
          product_id: number;
          name: string;
          quantity: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          product_id: number;
          name: string;
          quantity?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          product_id?: number;
          name?: string;
          quantity?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "stock_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: true;
            referencedRelation: "products";
            referencedColumns: ["id"];
          }
        ];
      };
    };

    Views: {
      [key: string]: never;
    };

    Functions: {
      get_all_products: {
        Args: Record<PropertyKey, never>;
        Returns: {
          id: number;
          name: string;
          price: number;
        }[];
      };

      is_current_user_staff: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };

      get_all_stock: {
        Args: Record<PropertyKey, never>;
        Returns: {
          id: number;
          product_id: number;
          name: string;
          quantity: number;
          created_at: string;
          updated_at: string;
        }[];
      };

      get_stock_by_product: {
        Args: {
          p_product_id: number;
        };
        Returns: {
          id: number;
          product_id: number;
          name: string;
          quantity: number;
          created_at: string;
          updated_at: string;
        }[];
      };

      add_stock_record: {
        Args: {
          p_product_id: number;
          p_quantity?: number;
        };
        Returns: {
          id: number;
          product_id: number;
          name: string;
          quantity: number;
          created_at: string;
          updated_at: string;
        };
      };

      receive_stock: {
        Args: {
          p_product_id: number;
          p_quantity: number;
        };
        Returns: {
          id: number;
          product_id: number;
          name: string;
          quantity: number;
          created_at: string;
          updated_at: string;
        };
      };

      issue_stock: {
        Args: {
          p_product_id: number;
          p_quantity: number;
        };
        Returns: {
          id: number;
          product_id: number;
          name: string;
          quantity: number;
          created_at: string;
          updated_at: string;
        };
      };

      set_stock_quantity: {
        Args: {
          p_product_id: number;
          p_quantity: number;
        };
        Returns: {
          id: number;
          product_id: number;
          name: string;
          quantity: number;
          created_at: string;
          updated_at: string;
        };
      };
    };

    Enums: {
      [key: string]: never;
    };

    CompositeTypes: {
      [key: string]: never;
    };
  };
};
