
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
};
    Enums: {
      [key: string]: never;
    };
    CompositeTypes: {
      [key: string]: never;
    };
  };
};
