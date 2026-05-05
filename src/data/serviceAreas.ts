export interface ServiceArea {
  city: string;
  slug: string;
  zip: string;
  region: 'peninsula' | 'south-bay' | 'sf-north';
}

export const serviceAreas: ServiceArea[] = [
  // Peninsula
  { city: 'San Carlos', slug: 'san-carlos', zip: '94070', region: 'peninsula' },
  { city: 'Redwood City', slug: 'redwood-city', zip: '94061', region: 'peninsula' },
  { city: 'Belmont', slug: 'belmont', zip: '94002', region: 'peninsula' },
  { city: 'San Mateo', slug: 'san-mateo', zip: '94401', region: 'peninsula' },
  { city: 'Foster City', slug: 'foster-city', zip: '94404', region: 'peninsula' },
  { city: 'Burlingame', slug: 'burlingame', zip: '94010', region: 'peninsula' },
  { city: 'Hillsborough', slug: 'hillsborough', zip: '94010', region: 'peninsula' },
  { city: 'Menlo Park', slug: 'menlo-park', zip: '94025', region: 'peninsula' },
  { city: 'Atherton', slug: 'atherton', zip: '94027', region: 'peninsula' },
  { city: 'Woodside', slug: 'woodside', zip: '94062', region: 'peninsula' },
  { city: 'Portola Valley', slug: 'portola-valley', zip: '94028', region: 'peninsula' },
  { city: 'Half Moon Bay', slug: 'half-moon-bay', zip: '94019', region: 'peninsula' },

  // South Bay
  { city: 'Palo Alto', slug: 'palo-alto', zip: '94301', region: 'south-bay' },
  { city: 'Mountain View', slug: 'mountain-view', zip: '94040', region: 'south-bay' },
  { city: 'Sunnyvale', slug: 'sunnyvale', zip: '94085', region: 'south-bay' },
  { city: 'Cupertino', slug: 'cupertino', zip: '95014', region: 'south-bay' },
  { city: 'Los Altos', slug: 'los-altos', zip: '94022', region: 'south-bay' },
  { city: 'Los Altos Hills', slug: 'los-altos-hills', zip: '94024', region: 'south-bay' },
  { city: 'San Jose', slug: 'san-jose', zip: '95101', region: 'south-bay' },
  { city: 'Santa Clara', slug: 'santa-clara', zip: '95050', region: 'south-bay' },
  { city: 'Campbell', slug: 'campbell', zip: '95008', region: 'south-bay' },
  { city: 'Saratoga', slug: 'saratoga', zip: '95070', region: 'south-bay' },
  { city: 'Los Gatos', slug: 'los-gatos', zip: '95030', region: 'south-bay' },
  { city: 'Milpitas', slug: 'milpitas', zip: '95035', region: 'south-bay' },

  // SF & North Peninsula
  { city: 'Daly City', slug: 'daly-city', zip: '94014', region: 'sf-north' },
  { city: 'South San Francisco', slug: 'south-san-francisco', zip: '94080', region: 'sf-north' },
  { city: 'San Bruno', slug: 'san-bruno', zip: '94066', region: 'sf-north' },
  { city: 'Millbrae', slug: 'millbrae', zip: '94030', region: 'sf-north' },
  { city: 'Pacifica', slug: 'pacifica', zip: '94044', region: 'sf-north' },
];

export const regions = {
  peninsula: 'Peninsula',
  'south-bay': 'South Bay',
  'sf-north': 'San Francisco & North Peninsula',
} as const;
