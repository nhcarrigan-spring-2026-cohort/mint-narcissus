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
  {
    id: 'outfit_001',
    lender: 'Sarah van der Merwe',
    lenderImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    
    title: 'Navy Suit – Classic Corporate Look',
    description:
      'Well-tailored navy suit, perfect for finance & consulting interviews. Single-breasted, notch lapel.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400',
    category: 'FORMAL',
    typeTags: ['CORPORATE', 'FINANCE'],
    fabric: 'Wool blend (70% wool, 30% polyester)',
    size: {
      topSize: 'UK 38R / EU 48',
      bottomSize: 'W34 L32',
      notes: 'Regular fit, true to size',
    },
    confidenceNote: 'Very good condition – only worn 4–5 times',
    status: 'AVAILABLE',
    visibility: 'PUBLIC',
  },
  {
    id: 'outfit_002',
    lender: 'Jaco Botha',
    lenderImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    
    title: 'Charcoal Grey Suit – Slim Fit',
    description:
      'Modern slim-fit charcoal suit. Great for tech & corporate interviews in winter.',
    image: 'https://images.unsplash.com/photo-1594938291224-79b8b0c9b2d8?w=400',
    category: 'FORMAL',
    typeTags: ['TECH', 'CORPORATE'],
    fabric: 'Super 110s wool',
    size: {
      topSize: 'EU 50',
      bottomSize: 'W32 L34',
      notes: 'Slim through the leg',
    },
    confidenceNote: 'Minor wear on left cuff – otherwise excellent',
    status: 'AVAILABLE',
    visibility: 'PUBLIC',
  },
  {
    id: 'outfit_003',
    lender: 'Lindiwe Nkosi',
    lenderImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop',
    
    title: 'Black Pencil Skirt Suit',
    description:
      'Classic black skirt suit – timeless for sales & consulting roles.',
    image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d26?w=400',
    category: 'FORMAL',
    typeTags: ['SALES', 'CONSULTING'],
    fabric: 'Poly-viscose blend',
    size: {
      topSize: 'UK 10 / EU 38',
      bottomSize: 'UK 10',
      notes: '',
    },
    confidenceNote: '',
    status: 'BORROWED',
    visibility: 'PUBLIC',
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
