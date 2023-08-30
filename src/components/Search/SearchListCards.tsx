import { useRecoilState } from "recoil";
import { currPlaylistTrackIdx } from "@/atoms";
import { PlaylistGrid } from "@/styles/Panel/PlaylistCard";
import { Track } from "@/lib/server/database.types";
import SearchListCard from "./SearchListCard";
import useLocalStoragePlaylist from "@/hooks/useLocalStoragePlaylist";
import { add } from "cheerio/lib/api/traversing";

export function SearchListCards({ playlist }: { playlist: Track[] }) {
  return (
    <PlaylistGrid>
      {playlist.map((track, index) => (
        <SearchListCard key={index} track={track} index={index} />
      ))}
    </PlaylistGrid>
  );
}

export default SearchListCards;
