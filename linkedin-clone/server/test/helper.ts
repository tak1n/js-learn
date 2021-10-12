export const truncateDB = async (prisma) => {
  for (const { tablename } of await prisma.$queryRaw<
    { tablename: string }[]
  >`SELECT tablename FROM pg_tables WHERE schemaname='public'`) {
    if (tablename !== '_prisma_migrations') {
      try {
        await prisma.$queryRawUnsafe(
          `TRUNCATE TABLE "public"."${tablename}" CASCADE;`,
        );
      } catch (error) {
        console.log({ error });
      }
    }
  }
};
