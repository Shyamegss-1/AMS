import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCachedMenu } from '@/lib/cache';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(req: NextRequest) {
  const session = await getServerSession(req, null, authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const menuItems = await getCachedMenu(session.user.roleId);

  return NextResponse.json(menuItems, { status: 200 });
}
