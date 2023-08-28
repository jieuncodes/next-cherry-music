"use client";

import { fetchCherryMusicTracks } from "@/app/api/cherryMusic/track/service";
import { useEffect, useState } from "react";
import TopTracks from "./TopTracks";
import TrackCardsSkeleton from "./TrackCard/TrackCardsSkeleton";
import { Tab, Tabs } from "@nextui-org/react";
import { Track } from "@/lib/server/database.types";

function Geo() {
  const [country, setCountry] = useState<string>("korea");
  const [countryTop, setCountryTop] = useState<Track[]>([]);
  const [top50Loading, setTop50Loading] = useState<boolean>(true);
  useEffect(() => {
    setTop50Loading(true);
    const fetchCountryTop = async () => {
      const data = await fetchCherryMusicTracks({
        query: `${country.toLowerCase()}top`,
      });
      setCountryTop(data);
      setTop50Loading(false);
    };
    fetchCountryTop();
  }, [country]);

  let tabs = [
    {
      id: "korea",
      label: "Korea",
    },
    {
      id: "us",
      label: "US",
    },
    {
      id: "africa",
      label: "Africa",
    },
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
            {!top50Loading ? (
              <TopTracks title="Top50" trackList={countryTop} />
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
