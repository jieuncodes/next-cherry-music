import { currPlayingTrackYoutubeId } from "@/atoms";
import { Track } from "@/lib/server/database.types";
import {
  fetchUserFavoriteTracks,
  subscribeToUserFavoriteTracks,
} from "@/lib/utils/favoriteTracks";
import { PlaylistGrid } from "@/styles/Artist/ArtistPlaylist";
import { ColSection, SectionTitle } from "@/styles/Section";
import { useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import LongPlaylistCard from "../LongTrackCards/LongPlaylistCard";
import LongTrackCardsSkeleton from "../LongTrackCards/LongTrackCardsSkeleton";

interface FavoriteTracksProps {}

function FavoriteTracks({}: FavoriteTracksProps) {
  const [userFavorites, setUserFavorites] = useState<Track[]>([]);

  const playingTrack = useRecoilValue(currPlayingTrackYoutubeId);
  const user = useUser();

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      const favorites = await fetchUserFavoriteTracks(user.id);
      setUserFavorites(favorites);
    };

    subscribeToUserFavoriteTracks({ userId: user.id, setUserFavorites });

    fetchData();
  }, [user, userFavorites]);
  return (
    <ColSection>
      <SectionTitle>
        {user
          ? `${user.user_metadata.name}'s Favorite Tracks`
          : "Your Favorite Tracks"}
      </SectionTitle>
      <PlaylistGrid>
        {userFavorites ? (
          userFavorites.map((track: Track, index: number) => (
            <LongPlaylistCard
              key={index}
              track={track}
              index={index}
              isPlayingTrack={track.youtubeId === playingTrack}
            />
          ))
        ) : (
          <LongTrackCardsSkeleton />
        )}
      </PlaylistGrid>
    </ColSection>
  );
}
export default FavoriteTracks;
