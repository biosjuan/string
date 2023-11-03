"use client";
import UserPageHeader from "./user-page-header";

export default function UserPage({ params }: { params: { username: string } }) {
  return (
    <div>
      <UserPageHeader username={params.username} />
      <div>Post container {params.username}</div>
    </div>
  );
}
