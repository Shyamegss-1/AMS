const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const adminRole = await prisma.role.create({
    data: {
      name: 'Admin',
    },
  });

  const userRole = await prisma.role.create({
    data: {
      name: 'User',
    },
  });

  const dashboardMenu = await prisma.menuItem.create({
    data: {
      title: 'Dashboard',
      path: '/dashboard',
      order: 1,
    },
  });

  await prisma.permission.create({
    data: {
      action: 'view',
      menuItemId: dashboardMenu.id,
      roleId: adminRole.id,
    },
  });

  await prisma.permission.create({
    data: {
      action: 'view',
      menuItemId: dashboardMenu.id,
      roleId: userRole.id,
    },
  });

  console.log('Database seeded');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
