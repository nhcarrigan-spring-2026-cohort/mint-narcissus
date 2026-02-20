export const MOCK_OUTFITS = [
  {
    id: '1',
    title: 'Classic Navy Blazer',
    description:
      'Professional navy blue suit perfect for corporate interviews. Tailored fit with matching pants.',
    // imgSrc: '', // use an empty div or unsplash image link
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

export const MockOutfits = [
  {
    id: 1,
    title: 'Classic Navy Suit',
    imgSrc:
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=800&fit=crop',
    status: 'Available',
    tags: ['Formal', 'Corporate', 'Finance'],
    category: 'Formal',
    fabric: 'Wool blend',
    fitInfo: "5'9-6'0, Average build",
    topSize: 'M /40',
    bottomSize: '32',
    description:
      'Professional navy blue suit perfect for corporate interviews. Tailored fit with matching pants.',
    quote:
      'Wore this for my first investment banking interview at Goldman Sachs. Walk in with confidence.',
    owner: {
      name: 'Sarah Johnson',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    },
  },
  {
    id: 2,
    title: 'Charcoal Grey Blazer',
    imgSrc:
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&fit=crop',
    status: 'Available',
    tags: ['Business Casual', 'Tech', 'Marketing'],
    category: 'Semi-Formal',
    fabric: 'Linen/Cotton',
    fitInfo: "5'10-6'2, Slim build",
    topSize: 'L /42',
    bottomSize: 'N/A',
    description:
      'A versatile charcoal blazer that bridges the gap between casual and formal. Great for networking events.',
    quote:
      'This blazer landed me my first role at a tech startup. It’s sharp but doesn’t feel stuffy.',
    owner: {
      name: 'Marcus Chen',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    },
  },
  {
    id: 3,
    title: 'Modern Black Trouser Suit',
    imgSrc:
      'https://images.unsplash.com/photo-1485231183945-3dec4355128f?w=600&h=800&fit=crop',
    status: 'Rented',
    tags: ['Legal', 'Executive', 'Classic'],
    category: 'Formal',
    fabric: 'Premium Wool',
    fitInfo: "5'4-5'7, Athletic build",
    topSize: 'S / 36',
    bottomSize: '28',
    description:
      'Sharp, double-breasted black suit with tapered trousers. Ideal for high-stakes presentations.',
    quote:
      'I wore this for my moot court finals. It makes you feel like the smartest person in the room.',
    owner: {
      name: 'Elena Rodriguez',
      avatar:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop',
    },
  },
  {
    id: 4,
    title: 'Beige Trench & Pencil Skirt',
    imgSrc:
      'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=600&h=800&fit=crop',
    status: 'Available',
    tags: ['Creative', 'Media', 'Consulting'],
    category: 'Business Casual',
    fabric: 'Cotton Gabardine',
    fitInfo: "5'2-5'5, Petite build",
    topSize: 'XS / 34',
    bottomSize: '24',
    description:
      'A timeless look for creative industry interviews. Polished, professional, but full of personality.',
    quote:
      'Perfect for when you want to look put-together without looking like a robot.',
    owner: {
      name: 'Jordan Smith',
      avatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop',
    },
  },
  {
    id: 5,
    title: 'Oxford Blue Pinstripe Suit',
    imgSrc:
      'https://images.unsplash.com/photo-1594932224010-75f2793ee09f?w=600&h=800&fit=crop',
    status: 'Available',
    tags: ['Academic', 'Research', 'Pharma'],
    category: 'Formal',
    fabric: 'Micro-fiber',
    fitInfo: "6'0-6'3, Broad build",
    topSize: 'XL / 46',
    bottomSize: '38',
    description:
      'A traditional pinstripe suit that commands respect. Comfortable for long days of interviewing.',
    quote:
      'Used this for my residency interview. It’s breathable and kept me cool under pressure.',
    owner: {
      name: 'Dr. David Okafor',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    },
  },
];