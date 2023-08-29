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
import { GeoContainer } from "@/styles/Geo/Geo";
import TopTracksContainer from "./TopTracksContainer";

function Geo({ countryTops }: { countryTops: any }) {
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
    <GeoContainer>
      <Tabs
        aria-label="Dynamic tabs"
        items={tabs}
        selectedKey={country}
        onSelectionChange={(key) => setCountry(String(key))}
      >
        {(item) => (
          <Tab key={item.id} title={item.label}>
            <TopTracksContainer
              query={"koreatop"}
              top20={countryTops.koreaTop}
            />
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
    </GeoContainer>
  );
}

export default Geo;
