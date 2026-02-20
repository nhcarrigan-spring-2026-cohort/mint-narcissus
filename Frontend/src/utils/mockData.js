export const MOCK_OUTFITS = [
  {
    id: '1',
    title: 'Classic Navy Blazer',
    description:
      'Professional navy blue suit perfect for corporate interviews. Tailored fit with matching pants.',
    // imageURL: '', // use an empty div or unsplash image link
    category: 'Semi Formal',
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
    id: '3',
    title: 'Modern Charcoal Pencil Skirt Set',
    description:
      'A sleek, high-waisted charcoal pencil skirt paired with a cream silk blouse. Professional yet stylish.',
    category: 'Formal',
    interviewTypes: ['Law', 'Finance', 'Consulting'],
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
    interviewTypes: ['Creative', 'Marketing', 'Startup'],
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
    interviewTypes: ['Management', 'PR', 'Corporate'],
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
    interviewTypes: ['Design', 'Tech', 'Architecture'],
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
    interviewTypes: ['Finance', 'Education', 'Government'],
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
