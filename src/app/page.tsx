import { getSession } from 'next-auth/react';
import { getCachedMenu } from '../../lib/cache';
import Sidebar from '@/components/sidebar/Sidebar';
import Link from 'next/link';

export default async function Home() {
  const session = await getSession();

  // if (!session) {
  //   return (
  //     <div>
  //       <p>You are not authorized to view this page. Please <Link href={'/auth/signin'}>sign in</Link>.</p>
  //     </div>
  //   );
  // }

  const menuItems = await getCachedMenu(1);

  return (
    <div>
      <Sidebar menuItems={menuItems} />
      <main>
        <h1>Welcome to the Dashboard</h1>
      </main>
    </div>
  );
}
