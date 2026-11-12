// Kochi office: single source for the contact page and the About page "Our offices" card
export const KOCHI_OFFICE_ADDRESS =
  'B, Frutomans, No 38, 2996, Thripunithura Road, beside HDFC Bank, Edappally, Kochi, Ernakulam, Keralam 682024';

// Search text used for the map (business name + street + area, which Google Maps resolves reliably)
const MAP_QUERY = 'Frutomans, Thripunithura Road, beside HDFC Bank, Edappally, Kochi, Kerala 682024';

/** Opens the office in Google Maps (new tab). */
export const KOCHI_OFFICE_MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`;
/** Embeddable map of the office (no API key needed). */
export const KOCHI_OFFICE_MAP_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=16&output=embed`;
