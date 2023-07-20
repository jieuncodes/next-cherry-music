import { useState, useEffect } from "react";
import { Database } from "@/lib/server/database.types";
import { supabase } from "@/lib/server/client";

export const useCarouselItems = () => {
  const [carouselItems, setCarouselItems] = useState<
    Database["public"]["Tables"]["carousel"]["Row"][]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let { data: carouselItems, error } = await supabase
          .from("carousel")
          .select("*");
        if (error) throw error;

        if (carouselItems) {
          setCarouselItems(carouselItems);
        }
      } catch (error) {
        console.error("error getting the data from supabase", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { carouselItems, isLoading };
};
