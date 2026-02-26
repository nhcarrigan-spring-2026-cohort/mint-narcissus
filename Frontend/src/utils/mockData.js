export const MOCK_OUTFITS = [
  {
    id: '1',
    title: 'Classic Navy Blazer',
    description:
      'Professional navy blue suit perfect for corporate interviews. Tailored fit with matching pants.',
    // imageURL: '', // use an empty div or unsplash image link
    category: 'Formal',
    interviewTypes: ['Tech', 'Corporate'],
    status: 'available',
    fabric: 'wool blend',
    size: {
      top: 'Regular',
      bottom: 'Regular',
      shoes: 'Regular',
    },
    confidenceNote:
      'Wore this for my first investment banking interview at Goldman Sachs. Walk in with confidence.',
    lender: `Sarah Johnson`,
    lenderImage: 'https://i.pravatar.cc/150',
  },
  {
    id: 2,
    title: 'Tech Interview Blazer Combo',
    description:
      'Professional navy blue suit perfect for corporate interviews. Tailored fit with matching pants.',
    // imageURL: '', // use an empty div or unsplash image link
    category: 'Business Casual',
    interviewTypes: ['Tech', 'Creative'],
    fit: "5'9–6'0, Average Build",
    status: 'available',
    fabric: 'cotton',
    size: {
      top: 'Regular',
      bottom: 'Regular',
      shoes: 'Regular',
    },
    confidenceNote:
      'Wore this to my first software engineer interview. Be yourself, be confident.',
    lender: `Michael Chen`,
    lenderImage: 'https://i.pravatar.cc/150',
  },
];

export const MOCK_USERS = {
  registerEmailUser: {
    id: '1',
    name: 'John Doe',
    email: 'demo@email.com',
    activeRole: null,
    profileCompleted: false,
    isVerified: false,
    sizeProfile: {
      height: null,
      topSize: null,
      bottomSize: null,
      fitPreference: null,
    },
  },
  registerLinkedInUser: {
    id: '2',
    name: 'LinkedIn User',
    email: 'linkedin@mail.com',
    activeRole: null,
    profileCompleted: false,
    isVerified: true,
    linkedinUrl: 'https://linkedin.com/in/demo',
    sizeProfile: {
      height: null,
      topSize: null,
      bottomSize: null,
      fitPreference: null,
    },
  },
  loginEmailUser: {
    id: '3',
    name: 'Sarah Johnson',
    email: 'demo@email.com',
    activeRole: 'borrower',
    profileCompleted: true,
    isVerified: false,
    sizeProfile: {
      heightCategory: 'Tall',
      topSize: 'S',
      bottomSize: '34',
      fitPreference: 'Slim',
    },
  },
  loginLinkedInUser: {
    id: '4',
    name: 'LinkedIn User',
    email: 'linkedin@mail.com',
    activeRole: 'lender',
    profileCompleted: true,
    isVerified: true,
    sizeProfile: {
      heightCategory: 'Regular',
      topSize: 'M',
      bottomSize: '32',
      fitPreference: 'Slim',
    },
  },
};
export const MOCK_STATS = [
    { id: 1, label: 'Total Listed', value: 3, color: '' },
    { id: 2, label: 'Available', value: 2, color: 'text-emerald-600' },
    { id: 3, label: 'Currently Lent', value: 0, color: 'text-amber-600' },
    { id: 4, label: 'Unavailable', value: 0, color: 'text-gray-500' },
  ];