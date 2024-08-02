import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from './prisma';

export const checkPermissions = async (req, action) => {
  const session = await getServerSession(req, null, authOptions);

  if (!session) {
    throw new Error('Unauthorized');
  }

  const permission = await prisma.permission.findFirst({
    where: {
      roleId: session.user.roleId,
      action,
    },
  });

  if (!permission) {
    throw new Error('Forbidden');
  }

  return true;
};
