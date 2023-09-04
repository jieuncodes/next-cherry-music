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
          desc: string | null;
          firstBgColor: string | null;
          height: number | null;
          id: number;
          marginLeft: string | null;
          marginTop: string | null;
          onClickPushRouter: string | null;
          secondBgColor: string | null;
          src: string | null;
          title: string | null;
          width: number | null;
        };
        Insert: {
          desc?: string | null;
          firstBgColor?: string | null;
          height?: number | null;
          id?: number;
          marginLeft?: string | null;
          marginTop?: string | null;
          onClickPushRouter?: string | null;
          secondBgColor?: string | null;
          src?: string | null;
          title?: string | null;
          width?: number | null;
        };
        Update: {
          desc?: string | null;
          firstBgColor?: string | null;
          height?: number | null;
          id?: number;
          marginLeft?: string | null;
          marginTop?: string | null;
          onClickPushRouter?: string | null;
          secondBgColor?: string | null;
          src?: string | null;
          title?: string | null;
          width?: number | null;
        };
        Relationships: [];
      };
      colombiaTop: {
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
          updated_at: string | null;
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
          updated_at?: string | null;
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
          updated_at?: string | null;
          wiki?: Json | null;
          youtubeId?: string | null;
        };
        Relationships: [];
      };
      favoriteArtists: {
        Row: {
          id: number;
          mbid: string | null;
          name: string;
          tags: Json[] | null;
          url: string | null;
          userId: string | null;
        };
        Insert: {
          id?: number;
          mbid?: string | null;
          name: string;
          tags?: Json[] | null;
          url?: string | null;
          userId?: string | null;
        };
        Update: {
          id?: number;
          mbid?: string | null;
          name?: string;
          tags?: Json[] | null;
          url?: string | null;
          userId?: string | null;
        };
        Relationships: [];
      };
      favoriteTracks: {
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
          trackYoutubeId: string | null;
          updated_at: string | null;
          userId: string;
          wiki: Json | null;
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
          trackYoutubeId?: string | null;
          updated_at?: string | null;
          userId?: string;
          wiki?: Json | null;
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
          trackYoutubeId?: string | null;
          updated_at?: string | null;
          userId?: string;
          wiki?: Json | null;
        };
        Relationships: [];
      };
      koreaTop: {
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
          updated_at: string | null;
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
          updated_at?: string | null;
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
          updated_at?: string | null;
          wiki?: Json | null;
          youtubeId?: string | null;
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
          updated_at: string | null;
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
          updated_at?: string | null;
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
          updated_at?: string | null;
          wiki?: Json | null;
          youtubeId?: string | null;
        };
        Relationships: [];
      };
      usTop: {
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
          updated_at: string | null;
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
          updated_at?: string | null;
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
          updated_at?: string | null;
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

export type Track = Database["public"]["Tables"]["todayTop"]["Row"];
export type LikeTrackData =
  Database["public"]["Tables"]["favoriteTracks"]["Row"];

export type likeArtistData =
  Database["public"]["Tables"]["favoriteArtists"]["Row"];
