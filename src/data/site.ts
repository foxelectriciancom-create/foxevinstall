export const site = {
  name: 'Fox EV Install',
  tagline: 'Professional EV Charger Installation & Panel Upgrades',
  phone: '(650) 550-0619',
  phoneRaw: '+16505500619',
  email: 'info@foxevinstall.com',
  location: 'Bay Area, CA',
  hours: {
    weekday: 'Mon–Fri 7AM–6PM',
    saturday: 'Sat 8AM–4PM',
    sunday: 'Closed',
    emergency: 'Emergency calls: 24/7',
  },
  license: 'C-10 Licensed Electrical Contractor',
  rating: '5.0',
  reviewCount: '50+',
  citiesServed: '29+',
  url: 'https://foxevinstall.com',
} as const;

export const nav = [
  { label: 'Home', href: '/' },
  {
    label: 'Services',
    href: '/services/',
    children: [
      { label: 'EV Charger Installation', href: '/services/ev-charger-installation/' },
      { label: 'Electrical Panel Upgrade', href: '/services/electrical-panel-upgrade/' },
      { label: 'Dedicated Circuits', href: '/services/dedicated-circuits/' },
      { label: 'Commercial EV Solutions', href: '/services/commercial-ev-solutions/' },
    ],
  },
  { label: 'Service Areas', href: '/service-areas/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
  { label: 'FAQ', href: '/faq/' },
  { label: 'Blog', href: '/blog/' },
] as const;
