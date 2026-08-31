import { prisma } from '../src/lib/db';

async function main() {
  console.log('Start seeding...');

  // 0. Platform Settings
  await prisma.platformSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      platformFeePercent: 15,
      freeDistanceKm: 5,
      transportRatePerKm: 15,
      workerTransportShare: 0.8,
      cancellationWindowHrs: 24,
      payoutSchedule: "WEEKLY",
      payoutDayOfWeek: 5,
      minBookingAmount: 200,
    }
  });

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

  const dbServices = [];

  for (const svc of PREVIEW_SERVICES) {
    const dbSvc = await prisma.service.upsert({
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
    dbServices.push(dbSvc);
  }

  // 3. Admin User
  await prisma.user.upsert({
    where: { email: 'admin@madclap.com' },
    update: {},
    create: {
      email: 'admin@madclap.com',
      name: 'Admin',
      role: 'ADMIN',
    }
  });

  // 4. Dummy Professionals
  const proUser = await prisma.user.upsert({
    where: { email: 'pro@madclap.com' },
    update: {},
    create: {
      email: 'pro@madclap.com',
      name: 'John Doe',
      role: 'PROFESSIONAL',
    }
  });

  const pro = await prisma.professional.upsert({
    where: { userId: proUser.id },
    update: {},
    create: {
      userId: proUser.id,
      bio: "Expert cleaner with 5 years experience",
      rating: 4.8,
      totalReviews: 24,
      onboardingStatus: "ACTIVE",
    }
  });

  // Link Pro to Services
  if (dbServices.length > 0) {
    for (const svc of dbServices.slice(0, 2)) {
      await prisma.professionalService.upsert({
        where: {
          professionalId_serviceId: {
            professionalId: pro.id,
            serviceId: svc.id
          }
        },
        update: {},
        create: {
          professionalId: pro.id,
          serviceId: svc.id
        }
      });
    }
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
