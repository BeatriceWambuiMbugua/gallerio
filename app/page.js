"use client";

import Gallery from "@/components/Gallery";
import LoginPage from "@/components/Login";
import { useSession } from "next-auth/react";
import { Suspense } from "react";
import Loading from "./loading";

export default function Home() {
  const { data: session, status } = useSession();

  // If the user is not logged in, show a login link
  if (!session) {
    return (
      <div>
        <Suspense fallback={<Loading />}>
        <LoginPage />
        </Suspense>
        
      </div>
    );
  }

  // If the user is logged in, display the image gallery
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Gallery />
      </Suspense>
    </div>
  );
}
