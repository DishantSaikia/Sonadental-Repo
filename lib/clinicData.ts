// Single source of truth for all clinic information.

export const CLINIC = {
  name: 'Sona Dental & Maxillofacial Clinic',
  address: '4/1724-A, Rama Block, Bhola Nath Nagar Ration Office Road, Shahdara, Delhi – 110032',
  phones: ['+91 98115 76067', '+91 88514 43263'],
  phonesRaw: ['+919811576067', '+918851443263'],
  email: 'contact@sonadental-maxfac.com',
  established: 1994,
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Sona+Dental+Maxillofacial+Clinic+Bhola+Nath+Nagar+Shahdara+Delhi+110032',
} as const

export const HOURS = [
  { day: 'Monday–Saturday', morning: '10:00 AM – 1:30 PM', evening: '6:00 PM – 9:30 PM' },
  { day: 'Sunday', morning: '10:00 AM – 1:30 PM', evening: 'Closed' },
] as const

export const DOCTORS = [
  {
    id: 'rajesh',
    name: 'Dr. Rajesh Aggarwal',
    qualifications: 'B.D.S.',
    since: 1994,
    specialty: 'General & Family Dentistry',
    initials: 'RA',
    image: '/Dr_Rajesh_Aggarwal.png',
    imageAlt: 'Portrait of Dr. Rajesh Aggarwal',
    imagePosition: '100% 20%',
    bio: 'Serving the community since 1994 with extensive experience, a gentle approach and a deep commitment to patient well-being.',
    color: 'from-[#1a3a7e] to-[#0e2255]',
    focus: [
      'Preventive & family dentistry',
      'Dental fillings',
      'Root canal treatment',
      'Restorative care',
      'Crowns & bridges',
      'Dentures',
      'Cosmetic dentistry',
      'Teeth whitening',
    ],
  },
  {
    id: 'shalini',
    name: 'Dr. Shalini Aggarwal',
    qualifications: 'B.D.S.',
    since: 1994,
    specialty: 'General & Family Dentistry',
    initials: 'SL',
    image: '/Dr_Shalini_Aggarwal.png',
    imageAlt: 'Portrait of Dr. Shalini Aggarwal',
    imagePosition: '0% 20%',
    bio: 'Serving families since 1994 with gentle, patient-centred care and a trusted legacy in dentistry.',
    color: 'from-[#1e4088] to-[#122860]',
    focus: [
      'Preventive & family dentistry',
      'Dental fillings',
      'Root canal treatment',
      'Restorative care',
      'Crowns & bridges',
      'Dentures',
      'Cosmetic dentistry',
      'Teeth whitening',
    ],
  },
  {
    id: 'shubham',
    name: 'Dr. Shubham Aggarwal',
    qualifications: 'B.D.S., M.D.S.',
    since: null,
    specialty: 'Oral & Maxillofacial Surgery',
    subTitle: 'Maxillofacial Surgeon & Implantologist',
    initials: 'SA',
    image: '/Dr_Shubham_Aggarwal.jpeg',
    imageAlt: 'Portrait of Dr. Shubham Aggarwal',
    imagePosition: '50% 24%',
    bio: 'MDS in Oral & Maxillofacial Surgery, with postgraduate training completed in 2024. Focused on implants, wisdom teeth, jaw fractures and evidence-based surgical care.',
    color: 'from-[#1c3c80] to-[#102358]',
    focus: [
      'Impacted wisdom teeth',
      'Dental implants',
      'Bone augmentation',
      'Oral pathologies',
      'Facial trauma & jaw fractures',
      'Oral surgery',
      'Reconstructive care',
    ],
  },
] as const

export const SERVICES = [
  {
    id: 'general',
    title: 'General & Restorative Dentistry',
    tagline: 'Thorough care from the ground up',
    description:
      'Preventive, endodontic and restorative care for everyday dental needs.',
    image: '/aesthetic_dentistry.png',
  },
  {
    id: 'cosmetic',
    title: 'Cosmetic & Orthodontic Care',
    tagline: 'Confidence, crafted carefully',
    description:
      'Braces, clear aligners and smile refinement planned around comfort, bite and facial balance.',
    image: '/orthodontics.png',
  },
  {
    id: 'implants',
    title: 'Implants & Tooth Replacement',
    tagline: 'Lasting solutions for missing teeth',
    description:
      'Prosthodontic and implant-led planning for crowns, bridges, dentures and long-term function.',
    image: '/implantology.png',
  },
  {
    id: 'surgery',
    title: 'Oral & Maxillofacial Surgery',
    tagline: 'Expert surgical care',
    description:
      'Specialist surgical support for implants, trauma, oral pathologies and complex jaw concerns.',
    image: '/surgical_dentistry.png',
  },
  {
    id: 'screening',
    title: 'Oral Screening & Jaw Care',
    tagline: 'Early detection, lasting protection',
    description:
      'Periodontal, oral-tissue and jaw checks for gum health, TMJ concerns and early intervention.',
    image: '/teeth_whitening.png',
  },
] as const

export const TREATMENT_CATEGORIES = [
  {
    id: 'general',
    label: 'General & Restorative',
    treatments: [
      'Complete examination',
      'RVG X-ray',
      'Dental fillings',
      'Root canal treatment (RCT)',
      'Scaling & polishing',
    ],
  },
  {
    id: 'cosmetic',
    label: 'Cosmetic & Orthodontic',
    treatments: [
      'Teeth whitening',
      'Smile designing',
      'Metal braces',
      'Ceramic braces',
      'Clear aligners',
    ],
  },
  {
    id: 'implants',
    label: 'Implants & Replacement',
    treatments: [
      'Dental implants',
      'Bone augmentation',
      'Fixed dentures',
      'Removable dentures',
      'Crowns & bridges',
    ],
  },
  {
    id: 'surgery',
    label: 'Oral & Maxillofacial Surgery',
    treatments: [
      'Facial trauma',
      'Jaw fractures',
      'Oral pathologies',
      'Cysts & jaw tumours',
      'Reconstructive care',
    ],
  },
  {
    id: 'screening',
    label: 'Oral Screening & Jaw Care',
    treatments: [
      'Impacted wisdom teeth',
      'Oral cancer screening',
      'OSMF assessment',
      'TMJ disorders',
      'Lock-jaw treatment',
    ],
  },
] as const
