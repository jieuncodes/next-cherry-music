"use client";
import { SectionTitle } from "@/styles/Section";
import { useUser } from "@supabase/auth-helpers-react";

function Dashboard() {
  const user = useUser();
  console.log("user", user);
  return (
    <>
      {user ? (
        <>
          <SectionTitle>
            {user ? `${user.user_metadata.name}'s Dashboard` : "Dashboard"}
          </SectionTitle>
        </>
      ) : (
        <div>login to see the Dashboard</div>
      )}
    </>
  );
}
export default Dashboard;
