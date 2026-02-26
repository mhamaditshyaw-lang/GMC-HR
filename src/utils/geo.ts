/**
 * Calculates the distance between two points in meters using the Haversine formula.
 */
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3; // Earth radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

// Hospital fixed coordinates (Example: Erbil International Hospital area or similar)
export const HOSPITAL_COORDS = {
  latitude: 36.1901,
  longitude: 44.0089,
  radius: 100, // 100 meters
};

// Hospital allowed IP range (Example)
export const ALLOWED_IPS = ['192.168.1.1', '10.0.0.1', '::1']; // ::1 for local testing
