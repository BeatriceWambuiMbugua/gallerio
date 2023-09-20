
'use client';

import Gallery from '@/components/Gallery';
import LoginPage from '@/components/Login';
import { useSession } from 'next-auth/react';

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

