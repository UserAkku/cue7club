export async function reverseGeocode(lat: number, lng: number): Promise<string> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'Cue7Club/1.0', // Required by Nominatim policy
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch address');
    }

    const data = await response.json();
    return data.display_name || 'Address not found';
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    return 'Error fetching address';
  }
}
