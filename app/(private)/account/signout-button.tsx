"use client";
import { useRouter } from "next/navigation";

function SignOutButton() {
  const router = useRouter();

  async function handleSignout() {
    // Fixed the function name here
    const res = await fetch("/api/logout");

    if (res.ok) {
      router.push("/signin");
    }
  }

  return (
    <button
      className="text-green-400 underline p-2 rounded-lg my-5"
      onClick={handleSignout} // Updated the function name here
    >
      Sign Out
    </button>
  );
}

export default SignOutButton;
