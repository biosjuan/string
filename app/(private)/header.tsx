"use client";
import useSWR from "swr";

export default function Header() {
  const { data, error, isLoading } = useSWR("/api/users/profile");
  if (error) return <div>Failded to Load</div>;
  if (isLoading) return <div>loading...</div>;

  console.log(data);

  return <header>{data?.username}</header>;
}
