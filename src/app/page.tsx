import Login from "./Login";

async function getComments() {
  const res = await fetch(`${process.env.BASE_URL}/api/getComments`, {
    cache: "no-store",
  });
  if (!res.ok) {
    console.log(res);
  }
  return res.json();
}

export default async function Home() {
  const data: { id: number; text: string }[] = await getComments();
  console.log(data);
  return (
    <main>
      <h1>Home page</h1>
      <h1>Test website</h1>
      {data.map((comment) => (
        <h2 key={comment.id}>{comment.text}</h2>
      ))}
      <h2>Login test:</h2>
      <Login />
    </main>
  );
}
