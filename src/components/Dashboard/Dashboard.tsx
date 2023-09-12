"use client";

import { SupabaseClient, useUser } from "@supabase/auth-helpers-react";
import FavoriteTracks from "./FavoriteTracks";
import FavoriteArtists from "./FavoriteArtists";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

function Dashboard() {
  const user = useUser();
  const supabaseClient = useSupabaseClient();

  return (
    <>
      {user ? (
        <>
          <FavoriteTracks />
          <FavoriteArtists />
        </>
      ) : (
        <div className="p-10 pr-20">
          <h1>Please Login to see Dashboard page !!</h1>
          <Auth
            supabaseClient={supabaseClient}
            providers={["github", "google", "kakao"]}
            magicLink={true}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: "#ff5173",
                    brandAccent: "#ff5174ca",
                  },
                },
              },
            }}
            theme="light"
          />
        </div>
      )}
    </>
  );
}
export default Dashboard;
