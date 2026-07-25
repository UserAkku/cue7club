import { prisma } from '../src/lib/db';

async function main() {
  console.log('Start seeding...');

  // 1. Create Categories
  const cleaningCategory = await prisma.serviceCategory.upsert({
    where: { slug: 'cleaning' },
    update: {},
    create: {
      name: 'Cleaning',
      slug: 'cleaning',
      icon: 'sparkle',
      sortOrder: 1,
    },
  });

  const gardenCategory = await prisma.serviceCategory.upsert({
    where: { slug: 'garden' },
    update: {},
    create: {
      name: 'Garden',
      slug: 'garden',
      icon: 'leaf',
      sortOrder: 2,
    },
  });

  const poolCategory = await prisma.serviceCategory.upsert({
    where: { slug: 'pool' },
    update: {},
    create: {
      name: 'Pool',
      slug: 'pool',
      icon: 'drop',
      sortOrder: 3,
    },
  });

  const healthCategory = await prisma.serviceCategory.upsert({
    where: { slug: 'health' },
    update: {},
    create: {
      name: 'Health',
      slug: 'health',
      icon: 'heart',
      sortOrder: 4,
    },
  });

  // 2. Create Services
  const PREVIEW_SERVICES = [
    { slug: "deep-cleaning", title: "Full Home Deep Cleaning", price: 4999, categoryId: cleaningCategory.id },
    { slug: "sofa-cleaning", title: "Sofa & Upholstery Cleaning", price: 1499, categoryId: cleaningCategory.id },
    { slug: "garden-setup", title: "Balcony Garden Setup", price: 5999, categoryId: gardenCategory.id },
    { slug: "pool-maintenance", title: "Monthly Pool Maintenance", price: 8999, categoryId: poolCategory.id },
    { slug: "physio-home", title: "At-Home Physiotherapy", price: 1299, categoryId: healthCategory.id },
  ];

  for (const svc of PREVIEW_SERVICES) {
    await prisma.service.upsert({
      where: { slug: svc.slug },
      update: {},
      create: {
        name: svc.title,
        slug: svc.slug,
        basePrice: svc.price,
        categoryId: svc.categoryId,
        description: "Expert professionals delivering top-tier service. Guaranteed satisfaction or we redo it for free.",
        shortDesc: "Premium " + svc.title + " service.",
        priceUnit: "Per Session",
        duration: 150, // mins
        isPopular: true,
      }
    });
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
