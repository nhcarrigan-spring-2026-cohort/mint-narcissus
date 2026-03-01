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
