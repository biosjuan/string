import Post from "@/app/components/post";
import { sql } from "@/db";

async function getData() {
  const res = await sql(
    `select p.*, u.avatar, u.username from posts p inner join users u
        on p.user_id = u.id order by create_at desc limit 10`
  );

  return res.rows;
}

export default async function PublicFeed() {
  const posts = await getData();
  return (
    <main>
      <h1>Strings</h1>
      <div>
        <h2>Recent Posts From the Comminity</h2>
        {posts.map((post) => {
          return <Post post={post} />;
        })}
      </div>
    </main>
  );
}
