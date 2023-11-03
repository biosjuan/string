import User from "@/app/components/users";
import useSWR from "swr";

function FollowersList({ index }: { index: number }) {
  const { data: userData } = useSWR("/api/users/profile");
  const { data: followerData } = useSWR(
    () => `/api/users/${userData.id}/followers?page=${index}`
  );

  if (!followerData) return <div>loading...</div>;

  return (
    <ul>
      {followerData.data.map((user: UserI) => {
        return (
          <li className="my-5" key={user.id}>
            <User user={user} href={user.username} />
          </li>
        );
      })}
    </ul>
  );
}

export default FollowersList;
