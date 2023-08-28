"use client";

import { fetchCherryMusicTracks } from "@/app/api/cherryMusic/track/service";
import { useEffect, useState } from "react";
import TopTracks from "./TopTracks";
import TrackCardsSkeleton from "./TrackCard/TrackCardsSkeleton";
import { useQuery } from "@tanstack/react-query";
import { Tab, Tabs } from "@nextui-org/react";
import { SectionTitle } from "@/styles/Section";
import { lastFmFetcher } from "@/app/api/lastFm/fetcher";
import { Track } from "@/lib/server/database.types";

function Geo() {
  const [country, setCountry] = useState<string>("korea");

  const fetchCountryTopTracks = async (selectedCountry: string) => {
    console.log("selectedCountry", selectedCountry);
    return await fetchCherryMusicTracks({
      query: "top",
      country: `${selectedCountry.toLowerCase()}`,
    });
    //then fetchSpotifyArtistData(artist) for each artist in the list
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

  console.log("countryTop", countryTop);

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
          </Tab>
        )}
      </Tabs>
    </div>
  );
}

export default Geo;
