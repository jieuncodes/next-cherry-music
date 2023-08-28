"use client";

import { fetchCherryMusicTracks } from "@/app/api/cherryMusic/track/service";
import { useEffect, useState } from "react";
import TopTracks from "./TopTracks";
import TrackCardsSkeleton from "./TrackCard/TrackCardsSkeleton";
import { useQuery } from "@tanstack/react-query";
import { Tab, Tabs } from "@nextui-org/react";
import { SectionTitle } from "@/styles/Section";
import { Track } from "@/lib/server/database.types";
import { fetchSpotifyArtist } from "@/app/api/spotify/service";
import { SpotifyArtist } from "@/types/spotifyTypes";
import HorizontalTiles from "./Tile/HorizontalTiles";

function Geo() {
  const [country, setCountry] = useState<string>("korea");
  const [countryTopArtists, setCountryTopArtists] = useState<SpotifyArtist[]>(
    []
  );
  const fetchCountryTopTracks = async (selectedCountry: string) => {
    return await fetchCherryMusicTracks({
      query: "top",
      country: `${selectedCountry.toLowerCase()}`,
    });
  };
  const { data: countryTop, isLoading: top50Loading } = useQuery({
    queryKey: ["countryTop", country],
    queryFn: () => fetchCountryTopTracks(country),
  });

  let tabs = [
    { id: "KR", label: "Korea" },
    { id: "US", label: "US" },
    { id: "CO", label: "Colombia" },
  ];

  useEffect(() => {
    if (countryTop) {
      const artists: SpotifyArtist[] = countryTop.map((track: Track) => {
        if (!track.artist) return;
        return { name: track.artist, artist: { name: track.artist } };
      });
      setCountryTopArtists(artists);
    }
  }, [countryTop]);

  return (
    <div className="flex w-full flex-col">
      <Tabs
        aria-label="Dynamic tabs"
        items={tabs}
        selectedKey={country}
        onSelectionChange={(key) => setCountry(String(key))}
      >
        {(item) => (
          <Tab key={item.id} title={item.label}>
            <SectionTitle>Top50</SectionTitle>
            {!top50Loading ? (
              <TopTracks trackList={countryTop} count={50} />
            ) : (
              <TrackCardsSkeleton />
            )}
            {countryTopArtists && (
              <HorizontalTiles
                sectionTitle={`Popular Artists in this country`}
                arr={{
                  type: "artist",
                  items: countryTopArtists,
                }}
                nav
              />
            )}
          </Tab>
        )}
      </Tabs>
    </div>
  );
}

export default Geo;
