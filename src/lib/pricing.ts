import { prisma } from "./db";

export type PricingInput = {
  basePrice: number;
  distanceKm: number;
  settings: {
    platformFeePercent: number;
    freeDistanceKm: number;
    transportRatePerKm: number;
    workerTransportShare: number;
  };
};

export type PricingResult = {
  basePrice: number;
  transportFee: number;
  platformFee: number;
  totalForUser: number;
  workerAmount: number;
  distanceKm: number;
};

export async function getPlatformSettings() {
  const settings = await prisma.platformSettings.findUnique({
    where: { id: "singleton" },
  });

  if (!settings) {
    // Fallback defaults if not seeded
    return {
      platformFeePercent: 15,
      freeDistanceKm: 5,
      transportRatePerKm: 15,
      workerTransportShare: 0.8,
      cancellationWindowHrs: 24,
      payoutSchedule: "WEEKLY",
      payoutDayOfWeek: 5,
      minBookingAmount: 200,
    };
  }

  return settings;
}

export function calculateBookingPrice({
  basePrice,
  distanceKm,
  settings,
}: PricingInput): PricingResult {
  const billableKm = Math.max(0, distanceKm - settings.freeDistanceKm);
  const transportFee = Math.round(billableKm * settings.transportRatePerKm);
  const platformFee = Math.round(basePrice * (settings.platformFeePercent / 100));
  const totalForUser = basePrice + transportFee + platformFee;
  const workerAmount = basePrice + Math.round(transportFee * settings.workerTransportShare);

  return {
    basePrice,
    transportFee,
    platformFee,
    totalForUser,
    workerAmount,
    distanceKm,
  };
}
