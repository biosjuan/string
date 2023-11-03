import Image from "next/image";
import Link from "next/link";

function Post({
  post,
  showEditButton,
}: {
  post: PostI;
  showEditButton?: boolean;
}) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const createAt = new Date(post.create_at);

  return (
    <div className="flex flex-row justify-items-stretch">
      <div>
        {post.avatar && (
          <Link href={`/${post.username}`}>
            <Image
              src={post.avatar}
              width={50}
              height={50}
              alt={post.username}
              className="rounded-full mr-3"
            />
          </Link>
        )}
        {!post.avatar && (
          <div
            className="bg-slate-600 rounded-full mr-3"
            style={{ width: 50, height: 50 }}
          ></div>
        )}
      </div>
      <div className="flex flex-col max-w-xs">
        <div className="font-bold">
          <Link href={`${post.username}`}>{post.username}</Link>
        </div>
        <div className="text-slate-400">
          {createAt.toLocaleDateString("en-us", options)}
        </div>
        <div>{post.content}</div>
      </div>
      {showEditButton && (
        <div className="text-right flex-grow">
          <Link
            href={`/profile/edit-post/${post.id}`}
            className="text-green-400"
          >
            Edit
          </Link>
        </div>
      )}
    </div>
  );
}

export default Post;
