import HomeClient from "./(components)/homepage/HomeClient";
import LatestPosts from "./(components)/homepage/latestPosts";

export const revalidate = 3600;

// The homepage itself is interactive (postcard flip, nav events), so it lives
// in a client component; this server shell fetches the blog posts it shows.
export default function Home() {
  return <HomeClient latestPosts={<LatestPosts />} />;
}
