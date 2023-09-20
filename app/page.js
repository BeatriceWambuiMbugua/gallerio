// pages/index.js
'use client';

import { useSession } from 'next-auth/react';
import Gallery from '@/components/Gallery';
import Link from 'next/link';
import LoginPage from '@/components/Login';

export default function Home() {
  const { data: session, status } = useSession();

  // If the user is not logged in, show a login link
  if (!session) {
    return (
      <div>
        <LoginPage/>
      </div>
    );
  }

  // If the user is logged in, display the image gallery
  return (
    <div>
      <Gallery/>
    </div>
  );
}

