
// This is a simplified prediction model for the demo
// In a real application, this would use a trained ML model

interface HouseData {
  overallQuality: number;
  totalSqFt: number;
  bedrooms: number;
  bathrooms: number;
  garageSize: number;
  neighborhood: string;
  yearBuilt: number;
}

// Simplified coefficients for demo
const coefficients = {
  basePrice: 150000,
  qualityMultiplier: 15000,
  sqFtPrice: 110,
  bedroomValue: 12000,
  bathroomValue: 18000,
  garageValue: 15000,
  neighborhoodMultipliers: {
    poor: 0.8,
    average: 1.0,
    good: 1.2,
    excellent: 1.5
  },
  ageDiscount: 500  // per year from current
};

export const predictHousePrice = (data: HouseData): number => {
  // Base calculation
  let predictedPrice = coefficients.basePrice;
  
  // Add quality impact
  predictedPrice += (data.overallQuality - 5) * coefficients.qualityMultiplier;
  
  // Add square footage impact
  predictedPrice += data.totalSqFt * coefficients.sqFtPrice;
  
  // Add bedroom and bathroom impact
  predictedPrice += data.bedrooms * coefficients.bedroomValue;
  predictedPrice += data.bathrooms * coefficients.bathroomValue;
  
  // Add garage impact
  predictedPrice += data.garageSize * coefficients.garageValue;
  
  // Apply neighborhood factor
  const neighborhoodFactor = coefficients.neighborhoodMultipliers[data.neighborhood as keyof typeof coefficients.neighborhoodMultipliers];
  predictedPrice *= neighborhoodFactor;
  
  // Apply age discount
  const ageInYears = 2025 - data.yearBuilt;
  predictedPrice -= ageInYears * coefficients.ageDiscount;
  
  // Ensure minimum price
  predictedPrice = Math.max(50000, predictedPrice);
  
  // Add some random variation (+/- 5%)
  const randomFactor = 0.95 + Math.random() * 0.1;
  predictedPrice *= randomFactor;
  
  return Math.round(predictedPrice);
};
