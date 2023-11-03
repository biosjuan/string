"use client";
import useSWR from "swr";
import Form from "./form";

export default function EditPost({ params }: { params: { id: number } }) {
  const { data, error, isLoading } = useSWR("/api/posts/" + params.id);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div>
      <Form post={data.data} />
    </div>
  );
}
