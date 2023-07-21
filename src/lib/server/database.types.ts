export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      carousel: {
        Row: {
          bgColor: string | null;
          desc: string | null;
          height: string | null;
          id: number;
          marginLeft: string | null;
          marginTop: string | null;
          src: string | null;
          title: string | null;
          width: string | null;
        };
        Insert: {
          bgColor?: string | null;
          desc?: string | null;
          height?: string | null;
          id?: number;
          marginLeft?: string | null;
          marginTop?: string | null;
          src?: string | null;
          title?: string | null;
          width?: string | null;
        };
        Update: {
          bgColor?: string | null;
          desc?: string | null;
          height?: string | null;
          id?: number;
          marginLeft?: string | null;
          marginTop?: string | null;
          src?: string | null;
          title?: string | null;
          width?: string | null;
        };
        Relationships: [];
      };
      tracks: {
        Row: {
          albumImgUrl: string | null;
          albumTitle: string | null;
          artist: string | null;
          id: number;
          tags: string[] | null;
          trackTitle: string | null;
          wiki: string | null;
        };
        Insert: {
          albumImgUrl?: string | null;
          albumTitle?: string | null;
          artist?: string | null;
          id?: number;
          tags?: string[] | null;
          trackTitle?: string | null;
          wiki?: string | null;
        };
        Update: {
          albumImgUrl?: string | null;
          albumTitle?: string | null;
          artist?: string | null;
          id?: number;
          tags?: string[] | null;
          trackTitle?: string | null;
          wiki?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Track = Database["public"]["Tables"]["tracks"]["Row"];
