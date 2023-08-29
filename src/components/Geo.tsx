"use client";

import { fetchCherryMusicTracks } from "@/app/api/cherryMusic/track/service";
import { useEffect, useState } from "react";
import TopTracks from "./TopTracks";
import TrackCardsSkeleton from "./TrackCard/TrackCardsSkeleton";
import { useQuery } from "@tanstack/react-query";
import { Tab, Tabs } from "@nextui-org/react";
import { SectionTitle } from "@/styles/Section";
import { Track } from "@/lib/server/database.types";
import HorizontalTiles from "./Tile/HorizontalTiles";
import { SliderItemProps } from "@/types/itemTypes";

function Geo() {
  const [country, setCountry] = useState<string>("korea");
  const [countryTopArtists, setCountryTopArtists] = useState<SliderItemProps[]>(
    []
  );
  const fetchCountryTopTracks = async (selectedCountry: string) => {
    return await fetchCherryMusicTracks({
      query: `${selectedCountry.toLowerCase()}top`,
    });
  };
  const { data: countryTop, isLoading: top50Loading } = useQuery({
    queryKey: ["countryTop", country],
    queryFn: () => fetchCountryTopTracks(country),
  });

  useEffect(() => {
    if (countryTop) {
      const artistNames = new Set();
      const artists: SliderItemProps[] = [];
      countryTop.forEach((track: Track) => {
        if (track.artist && !artistNames.has(track.artist)) {
          artistNames.add(track.artist);
          artists.push({ name: track.artist });
        }
      });
      setCountryTopArtists(artists);
    }
  }, [countryTop]);

  let tabs = [
    { id: "korea", label: "Korea" },
    { id: "us", label: "US" },
    { id: "colombia", label: "Colombia" },
  ];
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
