export const MOCK_OUTFITS = [
  {
    id: '1',
    title: 'Classic Navy Suit',
    description:
      'Professional navy blue suit perfect for corporate interviews. Tailored fit with matching pants.',
    outfitImageUrl:
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=800&fit=crop',
    category: 'Formal',
    interviewTypes: ['Corporate', 'Finance'],
    fabric: 'Wool Blend',
    size: {
      topSize: 'M',
      fitType: 'Slim',
      bottomSize: '32',
      height: 'Regular',
    },
    confidenceNote:
      'Wore this for my first investment banking interview at Goldman Sachs. Walk in with confidence.',
    status: 'Available',
    isSaved: 'false',
    lenderDetails: {
      lenderId: '4',
      lenderName: 'Sarah Johnson',
      lenderImageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    },
    createdAt: '03/01/2026',
  },
  {
    id: '2',
    title: 'Tech Interview Blazer Combo',
    description:
      'Smart casual outfit great for tech startups and creative roles. Includes blazer and khaki chinos.',
    outfitImageUrl:
      'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=600&h=800&fit=crop',
    category: 'Business Casual',
    interviewTypes: ['Tech', 'Creative'],
    fabric: 'Cotton',
    size: {
      topSize: 'L',
      fitType: 'Regular',
      bottomSize: '34',
      height: 'Tall',
    },
    confidenceNote:
      'Wore this to my first software engineer interview. Be yourself, be confident.',
    status: 'Available',
    isSaved: 'false',
    lenderDetails: {
      lenderId: '3',
      lenderName: 'Michael Chen',
      lenderImageUrl:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    },
    createdAt: '03/01/2026',
  },
  {
    id: '3',
    title: 'Charcoal Gray Suit',
    description:
      'Elegant charcoal suit with modern cut. Versatile for any professional setting.',
    outfitImageUrl:
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop',
    category: 'Formal',
    interviewTypes: ['Corporate', 'Tech'],
    fabric: 'Italian Wool',
    size: {
      topSize: 'S',
      bottomSize: '30',
      fitType: 'Slim',
      height: 'Short',
    },
    confidenceNote:
      "This suit has helped three people land their dream jobs. You're next!",
    status: 'Borrowed',
    isSaved: 'false',
    lenderDetails: {
      lenderId: '4',
      lenderName: 'Sarah Johnson',
      lenderImageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    },
    createdAt: '03/01/2026',
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
    size: {
      height: null,
      fitType: null,
      topSize: null,
      bottomSize: null,
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
    size: {
      height: null,
      fitType: null,
      topSize: null,
      bottomSize: null,
    },
  },
  loginEmailUser: {
    id: '3',
    name: 'Michael Chen',
    email: 'demo@email.com',
    activeRole: 'borrower',
    profileCompleted: true,
    isVerified: false,
    size: {
      height: 'Tall',
      fitType: 'Slim',
      topSize: 'S',
      bottomSize: '34',
    },
  },
  loginLinkedInUser: {
    id: '4',
    name: 'Sarah Johnson',
    email: 'linkedin@mail.com',
    activeRole: 'lender',
    profileCompleted: true,
    isVerified: true,
    size: {
      height: 'Regular',
      fitType: 'Slim',
      topSize: 'M',
      bottomSize: '32',
    },
  },
};

export const MOCK_REQUESTS = [
  {
    id: 'r1',
    outfitId: '1',
    borrowerId: '3',
    borrowerName: 'Michael Chen',
    borrowerImageUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    message:
      'Hi! I have a final round interview at J.P. Morgan next week. This suit looks perfect for the occasion. I promise to take great care of it!',
    interviewDate: '2026-02-08',
    status: 'Pending',
    createdAt: '2026-02-01',
  },
  {
    id: 'r2',
    outfitId: '1',
    borrowerId: '5',
    borrowerName: 'Alex Chen',
    borrowerImageUrl:
      'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=150&h=150&fit=crop',
    message:
      "Hello! I'm interviewing for a corporate finance role and would love to borrow this outfit. I've never done this before but I'm committed to returning it in perfect condition.",
    interviewDate: '2026-02-09',
    status: 'Pending',
    createdAt: '2026-02-02',
  },
  {
    id: 'r3',
    outfitId: '3',
    borrowerId: '6',
    borrowerName: 'Maya Rodriguez',
    borrowerImageUrl:
      'https://images.unsplash.com/photo-1544725176-7c40e5a2c9f9?w=150&h=150&fit=crop',
    message:
      'I have a technical interview at a startup on Thursday. This charcoal suit is exactly what I need!',
    interviewDate: '2026-02-09',
    status: 'Approved',
    createdAt: '2026-02-02',
  },
  {
    id: 'r4',
    outfitId: '3',
    borrowerId: '7',
    borrowerName: 'Priya Sharma',
    borrowerImageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    message:
      'Would love to borrow this for my consulting interview. I will coordinate pickup flexibly!',
    interviewDate: '2026-02-10',
    status: 'Declined',
    createdAt: '2026-02-03',
  },
];
