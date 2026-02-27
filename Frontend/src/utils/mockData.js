export const MOCK_OUTFITS = [
  {
    id: '1',
    title: 'Classic Navy Blazer',
    description:
      'Professional navy blue suit perfect for corporate interviews. Tailored fit with matching pants.',
    imgSrc: '', // use an empty div or unsplash image link
    category: 'Formal',
    interviewType: ['Tech', 'Corporate'],
    status: 'available',
    fabric: 'wool blend',
    size: {
      top: 'Regular',
      bottom: 'Regular',
      shoes: 'Regular',
    },
    confidenceNote:
      'Wore this for my first investment banking interview at Goldman Sachs. Walk in with confidence.',
    owner: { name: `Sarah Johnson`,
    img: 'https://i.pravatar.cc/150'},
  },
  {
    id: 2,
    title: 'Tech Interview Blazer Combo',
    description:
      'Professional navy blue suit perfect for corporate interviews. Tailored fit with matching pants.',
    imgSrc: '', // use an empty div or unsplash image link
    category: 'Business Casual',
    interviewType: ['Tech', 'Creative'],
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
    owner:{ name: `Michael Chen`,
    img: 'https://i.pravatar.cc/150'},
  },
  {
    id: '3',
    title: 'Modern Charcoal Pencil Skirt Set',
    description:
      'A sleek, high-waisted charcoal pencil skirt paired with a cream silk blouse. Professional yet stylish.',
    category: 'Formal',
    interviewType: ['Law', 'Finance', 'Consulting'],
    status: 'available',
    fabric: 'silk and wool',
    size: {
      top: 'Small',
      bottom: 'Small',
      shoes: '7.5',
    },
    confidenceNote:
      'This outfit got me through my final round at a top-tier law firm. It feels powerful but comfortable.',
    lender: 'Elena Rodriguez',
    lenderImage: 'https://i.pravatar.cc/150?u=3',
  },
  {
    id: '4',
    title: 'Creative Agency Knit & Chinos',
    description:
      'A high-quality olive merino wool sweater paired with slim-fit tan chinos. Great for a relaxed but polished look.',
    category: 'Business Casual',
    interviewType: ['Creative', 'Marketing', 'Startup'],
    fit: "5'7–5'10, Slim Build",
    status: 'available',
    fabric: 'merino wool',
    size: {
      top: 'Medium',
      bottom: '30x32',
      shoes: '10',
    },
    confidenceNote:
      'Perfect for when a full suit feels like "too much." I wore this to land my Art Director role.',
    lender: 'Jordan Smith',
    lenderImage: 'https://i.pravatar.cc/150?u=4',
  },
  {
    id: '5',
    title: 'Power Executive Pantsuit',
    description:
      'Deep emerald green structured blazer and wide-leg trousers. Bold color that stays professional.',
    category: 'Formal',
    interviewType: ['Management', 'PR', 'Corporate'],
    status: 'available',
    fabric: 'crepe',
    size: {
      top: 'Large',
      bottom: 'Large',
      shoes: '9',
    },
    confidenceNote:
      'Don’t be afraid of color! I stood out in a sea of black suits and got the VP offer.',
    lender: 'Maya Patel',
    lenderImage: 'https://i.pravatar.cc/150?u=5',
  },
  {
    id: '6',
    title: 'Minimalist Monochrome Look',
    description:
      'All-black ensemble featuring a structured mock-neck top and tailored trousers. Very "Architect" chic.',
    category: 'Business Casual',
    interviewType: ['Design', 'Tech', 'Architecture'],
    status: 'available',
    fabric: 'synthetic blend',
    size: {
      top: 'Medium',
      bottom: 'Medium',
      shoes: '8',
    },
    confidenceNote:
      'Clean, simple, and distraction-free. Let your portfolio do the talking while looking sharp.',
    lender: 'Alex Wong',
    lenderImage: 'https://i.pravatar.cc/150?u=6',
  },
  {
    id: '7',
    title: 'Classic Grey Herringbone Suit',
    description:
      'Timeless grey suit with a subtle herringbone pattern. Includes blazer, vest, and trousers.',
    category: 'Formal',
    interviewType: ['Finance', 'Education', 'Government'],
    fit: "6'1–6'4, Broad Build",
    status: 'available',
    fabric: 'tweed wool',
    size: {
      top: 'XL',
      bottom: '36x34',
      shoes: '12',
    },
    confidenceNote:
      'A heavy-duty suit for serious interviews. It has a great weight to it that makes you stand taller.',
    lender: 'Marcus Thorne',
    lenderImage: 'https://i.pravatar.cc/150?u=7',
  },{
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
export const MOCK_STATS = [
    { id: 1, label: 'Total Listed', value: 3, color: '' },
    { id: 2, label: 'Available', value: 2, color: 'text-emerald-600' },
    { id: 3, label: 'Currently Lent', value: 0, color: 'text-amber-600' },
    { id: 4, label: 'Unavailable', value: 0, color: 'text-gray-500' },
  ];
