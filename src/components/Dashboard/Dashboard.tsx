"use client";

import { useUser } from "@supabase/auth-helpers-react";
import FavoriteTracks from "./FavoriteTracks";

function Dashboard() {
  const user = useUser();

  return (
    <>
      {user ? (
        <FavoriteTracks />
      ) : (
        // <FavoriteArtists />

        <>
          <div>Login to see Dashboard page</div>
        </>
      )}
    </>
  );
}
export default Dashboard;
