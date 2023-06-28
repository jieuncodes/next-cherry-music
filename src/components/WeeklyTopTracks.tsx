"use client";

import { supabase } from "@/lib/server/client";
import { Database } from "@/lib/server/database.types";
import { FC, useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { HeartIcon } from "lucide-react";

interface WeeklyTopTracksProps {}

const WeeklyTopTracks: FC<WeeklyTopTracksProps> = () => {
  const [tracks, setTracks] = useState<
    Database["public"]["Tables"]["tracks"]["Row"][]
  >([]);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchTracks = async () => {
      let { data: tracks, error } = await supabase
        .from("tracks")
        .select("artist, trackTitle, albumImgUrl")
        .not("albumImgUrl", "eq", null)
        .range(0, 27);
      if (error) {
        console.error(error);
      } else {
        setTracks(tracks as Database["public"]["Tables"]["tracks"]["Row"][]);
        console.log("tracks has album", tracks);
      }
    };
    fetchTracks();
  }, []);

  return (
    <div className="container absolute ">
      <span className="font-bold">Weekly Top Tracks</span>
      <div className="mt-5 overflow-x-scroll grid grid-flow-col grid-rows-4 grid-cols-auto gap-2">
        {tracks.map((track) => (
          <Card className="w-96 h-16 shadow-none">
            <CardHeader className="justify-between">
              <div className="flex gap-5">
                <Image
                  alt="album image"
                  className="object-cover rounded-md"
                  src={track.albumImgUrl || ""}
                  height={40}
                  width={40}
                />
                <div className="flex flex-col gap-1 items-start justify-center">
                  <h4 className="text-sm font-semibold leading-none text-default-600">
                    {track.trackTitle}
                  </h4>
                  <h5 className="text-sm tracking-tight text-default-400">
                    {track.artist}
                  </h5>
                </div>
              </div>
              <Button
                isIconOnly
                className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                radius="full"
                variant="light"
                onPress={() => setLiked((v) => !v)}
              >
                <HeartIcon
                  className={liked ? "[&>path]:stroke-transparent" : ""}
                  fill={liked ? "currentColor" : "none"}
                />
              </Button>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WeeklyTopTracks;
