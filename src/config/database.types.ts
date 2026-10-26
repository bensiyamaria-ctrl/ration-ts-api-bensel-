
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
        Args: Record<string, never>;
        Returns: {
          id: number;
          name: string;
          price: number;
        }[];
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
