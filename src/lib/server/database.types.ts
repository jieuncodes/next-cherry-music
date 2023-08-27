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
      lastFetchTimes: {
        Row: {
          albumTracks: string | null;
          artistTopTracks: string | null;
          id: number;
          tagTopTracks: string | null;
          topTracks: string | null;
        };
        Insert: {
          albumTracks?: string | null;
          artistTopTracks?: string | null;
          id?: number;
          tagTopTracks?: string | null;
          topTracks?: string | null;
        };
        Update: {
          albumTracks?: string | null;
          artistTopTracks?: string | null;
          id?: number;
          tagTopTracks?: string | null;
          topTracks?: string | null;
        };
        Relationships: [];
      };
      todayTop: {
        Row: {
          albumImgUrl: string | null;
          albumTitle: string | null;
          artist: string | null;
          id: number;
          key: string | null;
          playCount: string | null;
          rank: number | null;
          tags: Json[] | null;
          trackTitle: string | null;
          wiki: Json | null;
          youtubeId: string | null;
        };
        Insert: {
          albumImgUrl?: string | null;
          albumTitle?: string | null;
          artist?: string | null;
          id?: number;
          key?: string | null;
          playCount?: string | null;
          rank?: number | null;
          tags?: Json[] | null;
          trackTitle?: string | null;
          wiki?: Json | null;
          youtubeId?: string | null;
        };
        Update: {
          albumImgUrl?: string | null;
          albumTitle?: string | null;
          artist?: string | null;
          id?: number;
          key?: string | null;
          playCount?: string | null;
          rank?: number | null;
          tags?: Json[] | null;
          trackTitle?: string | null;
          wiki?: Json | null;
          youtubeId?: string | null;
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
