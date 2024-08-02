// import Redis from 'ioredis';

import { prisma } from "./prisma";

// const redis = new Redis(process.env.REDIS_URL);

export const getCachedMenu = async (roleId: number) => {
//   const cacheKey = `menu:role:${roleId}`;
// //   const cachedMenu = await redis.get(cacheKey);

//   if (cachedMenu) {
//     return JSON.parse(cachedMenu);
//   }

  const menuItems = await prisma.menuItem.findMany({
    where: {
      permission: {
        some: {
          roleId,
        },
      },
    },
    include: {
      subItems: true,
    },
  });

//   await redis.set(cacheKey, JSON.stringify(menuItems), 'EX', 3600);

  return menuItems;
};
