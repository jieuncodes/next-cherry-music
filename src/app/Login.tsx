import { useSession, signIn, signOut } from "next-auth/react";
import { UserCard } from "./UserCard";

export default function Login() {
  const { data: session } = useSession();
  console.log(session);

  if (session) {
    return (
      <>
        <button
          onClick={() => signOut()}
          type="button"
          className="btn btn-primary"
        >
          Sign out
        </button>
        <UserCard user={session?.user} />
      </>
    );
  } else {
    return (
      <>
        <button
          onClick={() => signIn()}
          type="button"
          className="btn btn-primary"
        >
          Sign in
        </button>
      </>
    );
  }
}
