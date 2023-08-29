"use client";

import { fetchCherryMusicTracks } from "@/app/api/cherryMusic/track/service";
import { Track } from "@/lib/server/database.types";
import { GeoContainer } from "@/styles/Geo/Geo";
import { QueryTypes, SliderItemProps } from "@/types/itemTypes";
import { Tab, Tabs } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import HorizontalTiles from "./Tile/HorizontalTiles";
import TopTracksContainer from "./TopTracksContainer";

function Geo({
  countryTops,
}: {
  countryTops: {
    [key: string]: Track[];
  };
}) {
  const [country, setCountry] = useState<string>("korea");
  const [countryTopArtists, setCountryTopArtists] = useState<SliderItemProps[]>(
    []
  );

  const fetchCombinedCountryTopTracks = async (selectedCountry: string) => {
    const additionalTracks = await fetchCherryMusicTracks({
      query: `${selectedCountry.toLowerCase()}top`,
      count: 30,
      offset: 20,
    });
    return [...countryTops[selectedCountry], ...additionalTracks];
  };

  const { data: countryTopTracks } = useQuery({
    queryKey: ["countryTopTracks", country],
    queryFn: () => fetchCombinedCountryTopTracks(country),
    initialData: countryTops[country],
  });

  useEffect(() => {
    if (countryTopTracks) {
      const artistNames = new Set();
      const artists: SliderItemProps[] = [];
      countryTops[country].forEach((track: Track) => {
        if (track.artist && !artistNames.has(track.artist)) {
          artistNames.add(track.artist);
          artists.push({ name: track.artist });
        }
      });
      setCountryTopArtists(artists);
    }
  }, [countryTopTracks, country]);

  let tabs = [
    { id: "korea", label: "Korea" },
    { id: "us", label: "US" },
    { id: "colombia", label: "Colombia" },
  ];

  return (
    <GeoContainer>
      <Tabs
        aria-label="Dynamic tabs"
        items={tabs}
        selectedKey={country}
        onSelectionChange={(key) => setCountry(String(key))}
      >
        {(item) => {
          const queryValue = `${item.id}top` as QueryTypes;

          return (
            <Tab key={item.id} title={item.label}>
              <TopTracksContainer query={queryValue} top20={countryTopTracks} />
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
          );
        }}
      </Tabs>
    </GeoContainer>
  );
}

export default Geo;
