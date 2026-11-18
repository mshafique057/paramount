/**
 * Central business configuration.
 * Replace the clearly marked placeholders before publishing.
 * Keep phoneHref/emailHref empty until real contact details are supplied.
 */
export const BUSINESS = {
  name: 'Paramount Locksmiths',
  phoneDisplay: '01274 000000', // DUMMY (Bradford 01274 code + zeros) – replace in admin
  phoneHref: 'tel:+441274000000', // DUMMY – must match phoneDisplay
  email: 'hello@example.com', // DUMMY – replace in admin
  emailHref: 'mailto:hello@example.com', // DUMMY – must match email
  address: '1 Example Street, Bradford BD1 1AA', // DUMMY – replace in admin
  serviceArea: 'Bradford',
  hours: '24 hours a day, 7 days a week', // Owner's 24/7 claim – confirm wording in admin
  mapEmbedUrl: 'https://www.google.com/maps?q=Bradford%2C%20UK&output=embed',
  formEndpoint: '', // Leave empty to use the built-in enquiry form (/api/enquiry)
  socialLinks: [],
};

export const IMG = {
  door: '/uk_composite_front_door.webp',
  cylinder: '/uk_upvc_cylinder_lock.webp',
  key: '/uk_broken_key_extraction.webp',
  window: '/uk_window_lock_repair.webp',
  keys: '/uk_house_keys.webp',
  multipoint: '/uk_multipoint_handle.webp',
  antisnap: '/uk_antisnap_cylinder.webp',
  mortice: '/uk_mortice_lock.webp',
  handle: '/uk_door_handle.webp',
};

export const NAV = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/areas', label: 'Areas covered' },
  { to: '/about', label: 'About' },
  { to: '/faqs', label: 'FAQs' },
  { to: '/contact', label: 'Contact' },
];

export const SERVICES = [
  {
    slug: 'emergency-home-lockouts', path: '/services/emergency-home-lockouts', icon: 'DoorOpen',
    title: 'Emergency home lockouts', short: 'Locked out of your house or flat? Get help with a household door that will not open.',
    image: IMG.door, alt: 'Contemporary UK composite front door with residential door furniture',
    intro: 'Being unable to get into your own home is stressful. Whether the door has shut behind you, the key has gone missing or the lock has stopped working, we can assess the problem and explain the available options.',
    problems: ['The door has closed and the keys are inside', 'Your key is missing or has been stolen', 'The key turns but the door will not open', 'The handle moves but the locking mechanism appears jammed'],
    detail: 'The right approach depends on the door, lock and condition of the mechanism. We will explain the proposed work and its cost before carrying out any repair or replacement.'
  },
  {
    slug: 'lock-changes-replacements', path: '/services/lock-changes-replacements', icon: 'KeyRound',
    title: 'Lock changes & replacements', short: 'Replace worn, damaged or unsuitable household locks, including after a house move.',
    image: IMG.cylinder, alt: 'Euro profile cylinder fitted into a UK uPVC door handle',
    intro: 'A lock change may be useful after moving home, losing keys, or finding that an existing lock is worn or unreliable. We work with common residential door lock types and can help identify a suitable replacement.',
    problems: ['You have moved into a new home', 'House keys have been lost or stolen', 'A lock is stiff, worn or damaged', 'You need a replacement for a household door'],
    detail: 'The lock type and dimensions need to be checked before a replacement is selected. We can discuss the options for your door and explain any differences in specification.'
  },
  {
    slug: 'upvc-composite-door-lock-repairs', path: '/services/upvc-composite-door-lock-repairs', icon: 'Wrench',
    title: 'uPVC & composite door lock repairs', short: 'Help with faulty handles, euro cylinders and multipoint locking mechanisms.',
    image: IMG.multipoint, alt: 'Multipoint locking hardware used in a UK residential door',
    intro: 'uPVC and composite doors commonly use a euro profile cylinder alongside a multipoint locking mechanism. If the handle feels loose, the key will not turn or the door has become difficult to operate, the fault may be in the cylinder, gearbox, mechanism or door alignment.',
    problems: ['The handle is loose or will not lift normally', 'The key is difficult to turn', 'The door catches against its frame', 'The multipoint mechanism no longer operates correctly'],
    detail: 'We assess the components and explain whether a repair or replacement is appropriate. The full door does not necessarily need replacing when a lock component has failed.'
  },
  {
    slug: 'window-lock-repairs', path: '/services/window-lock-repairs', icon: 'AppWindow',
    title: 'Residential window lock repairs', short: 'Repairs and replacements for household window handles and locking parts.',
    image: IMG.window, alt: 'Key-operated locking handle on a white residential uPVC window',
    intro: 'A stiff window handle, missing key or faulty locking point can make a household window difficult to secure or use. We can assess common residential window lock and handle problems.',
    problems: ['A key-operated window handle will not turn', 'The handle is loose or damaged', 'The window will not close or lock correctly', 'A window lock key has gone missing'],
    detail: 'Window hardware varies by frame and manufacturer. A clear description or photograph can help us understand the type of handle or lock fitted before arranging an assessment.'
  },
  {
    slug: 'lost-stolen-house-keys', path: '/services/lost-stolen-house-keys', icon: 'Key',
    title: 'Lost or stolen house keys', short: 'Discuss practical options when household keys have gone missing.',
    image: IMG.keys, alt: 'Set of household keys on a neutral surface',
    intro: 'If house keys are lost or stolen, it is sensible to consider who could identify the property and whether someone else may have access. Depending on the circumstances, changing the relevant lock may be appropriate.',
    problems: ['A set of house keys has been misplaced', 'Keys were taken with a bag or personal belongings', 'You are unsure who may have a copy', 'You have recently moved and do not know how many keys exist'],
    detail: 'We can discuss the lock type and replacement options. If keys were stolen with anything that identifies your address, mention this when you get in touch.'
  },
  {
    slug: 'broken-stuck-keys', path: '/services/broken-stuck-keys', icon: 'KeyRound',
    title: 'Broken keys & keys stuck in locks', short: 'Help when a key snaps, becomes trapped or will not move freely.',
    image: IMG.key, alt: 'Residential locksmith attending to a key problem at a door lock',
    intro: 'A key that becomes trapped or breaks in a household lock can prevent the door from being used normally. Avoid forcing the key, as extra pressure can make the problem harder to resolve.',
    problems: ['A key has snapped in the lock', 'The key is stuck and will not come out', 'The key will not insert fully', 'The lock has become stiff or unreliable'],
    detail: 'The lock may be reusable if its internal parts are still in good condition. If it has been damaged, a replacement may be the more suitable option.'
  },
  {
    slug: 'jammed-locks-doors', path: '/services/jammed-locks-doors', icon: 'LockKeyhole',
    title: 'Jammed locks & doors that will not open', short: 'Assessment of household doors that are stuck, jammed or refusing to lock.',
    image: IMG.handle, alt: 'Close-up of a residential door handle and cylinder',
    intro: 'A household door can become difficult to open or close because of a worn lock, a failed mechanism or a change in door alignment. The symptoms can help identify which part needs attention.',
    problems: ['The door is stuck shut', 'The lock turns but the door remains closed', 'The door needs unusual pressure to close', 'The handle or locking points feel jammed'],
    detail: 'Please do not force a jammed handle or key. We can assess the door and explain the appropriate repair or replacement options.'
  },
  {
    slug: 'moving-home-lock-changes', path: '/services/moving-home-lock-changes', icon: 'House',
    title: 'Moving-home lock changes', short: 'Review household locks when you move into a new property.',
    image: IMG.mortice, alt: 'Traditional mortice lock fitted to a timber residential door',
    intro: 'When you move home, you may not know how many copies of the existing keys are still in circulation. Reviewing the front and back door locks is a straightforward way to understand what is fitted and decide whether a change is needed.',
    problems: ['You have completed a house purchase', 'You have moved into a rented property', 'Previous occupants may still have spare keys', 'You want to review the locks on timber or modern doors'],
    detail: 'Different doors use different lock types. We can identify the existing hardware and discuss suitable replacements for the doors in your home.'
  },
];

export const FAQS = [
  { q: 'Do you provide residential locksmith services in Bradford?', a: 'The service is intended for household doors, locks and windows in Bradford. Please contact us with your postcode and the issue so the service area can be confirmed.' },
  { q: 'Can you help if I am locked out of my home?', a: 'Yes. We can discuss a home lockout involving a front door, back door or flat entrance. The available options depend on the door and lock fitted.' },
  { q: 'Can you replace a lock after I have lost my keys?', a: 'Yes. We can identify the type of household lock and explain replacement options. If keys were stolen with anything that identifies your address, mention that when you contact us.' },
  { q: 'Can you repair uPVC and composite door locks?', a: 'Yes. The service includes common uPVC and composite door lock issues, including euro cylinders, handles, gearboxes and multipoint mechanisms.' },
  { q: 'Do you repair window locks?', a: 'Residential window lock and handle repairs or replacements are included. The correct part depends on the window and existing hardware.' },
  { q: 'Can you help with a snapped key?', a: 'Yes. We can assess a key that has snapped or become stuck in a household lock. Avoid forcing it further before the lock has been checked.' },
  { q: 'How much will the work cost?', a: 'The cost depends on the lock type, the fault and any parts required. Contact us with a description or photograph of the door or window so the job can be discussed before work is agreed.' },
  { q: 'Are you available 24 hours a day?', a: 'Yes. We offer 24/7 residential locksmith help across Bradford for urgent household lock problems. Call us at any time to talk through what you need.' },
  { q: 'Do you work on cars or business premises?', a: 'No. This website covers residential household locks, doors and windows only.' },
];

export const PROBLEMS = [
  { id: 'keys', title: 'Lost or stolen keys', text: 'Understand whether a lock change is appropriate and which household locks may need attention.', image: IMG.keys, link: '/services/lost-stolen-house-keys' },
  { id: 'jam', title: 'A door that will not open', text: 'A jammed lock or failed mechanism can stop a door from opening or closing as it should.', image: IMG.door, link: '/services/jammed-locks-doors' },
  { id: 'upvc', title: 'A faulty uPVC handle', text: 'Loose handles, stiff keys and multipoint faults can often be traced to a specific component.', image: IMG.multipoint, link: '/services/upvc-composite-door-lock-repairs' },
  { id: 'window', title: 'A window that will not lock', text: 'Household window handles and locking parts can be assessed for repair or replacement.', image: IMG.window, link: '/services/window-lock-repairs' },
];


// ---------- Homepage copy (editable in the admin dashboard) ----------
export const HOME = {
  hero: {
    eyebrow: '24/7 residential locksmith · Bradford',
    headline: 'Home locks, done properly.',
    highlight: 'done properly.',
    sub: 'Lock changes, repairs, lost-key help and emergency lockout support for houses and flats across Bradford. Clear advice, tidy work and no unnecessary replacements.',
    ctaPrimary: 'Call us now',
    ctaSecondary: 'See our services',
    image: '/uk_composite_front_door.webp',
    alt: 'Modern UK composite residential front door',
  },
  // Extra slides for the dark homepage slider (shown after the hero above).
  extraSlides: [
    { eyebrow: 'Lock changes · Bradford', headline: 'New locks, fitted properly.', highlight: 'fitted properly.', sub: 'Anti-snap cylinders, mortice locks and uPVC or composite door locks, explained before any work starts.', ctaPrimary: 'Call us now', image: '/uk_upvc_cylinder_lock.webp', alt: 'Euro profile cylinder lock for a UK uPVC door' },
    { eyebrow: 'Repairs · Bradford', headline: 'Stiff keys and loose handles?', highlight: 'loose handles?', sub: 'Repairs for household doors and windows, starting with the likely cause so you know what the job involves.', ctaPrimary: 'Call us now', image: '/uk_multipoint_handle.webp', alt: 'Multipoint locking handle on a UK residential door' },
  ],
  // Plus points shown under the slider. Owner to confirm each point before publishing.
  plusPoints: [
    { title: '24/7 emergency help', text: 'Call at any time about an urgent household lock problem.' },
    { title: 'No call-out fee', text: 'Asking us to come out is not charged on its own.' },
    { title: 'Price agreed first', text: 'We talk through the cost before any work starts.' },
    { title: 'Clear options', text: 'We explain the choices so you can decide what suits your home.' },
  ],
  ticker: ['Home lockouts', 'Lock changes', 'uPVC repairs', 'Window locks', 'Broken keys', 'Lost house keys', 'Anti-snap cylinders'],
  process: {
    heading: 'From first call to finished door',
    steps: [
      { title: 'Tell us what is happening', desc: 'Call or send a message describing the problem: a lockout, a broken lock, a move or a worry about security.' },
      { title: 'We agree the job', desc: 'We talk you through the likely cause and the options, so you know what the work involves before anything starts.' },
      { title: 'We do the work', desc: 'Our engineer arrives, works carefully and keeps your home tidy while they are there.' },
      { title: 'We check it with you', desc: 'Before we leave, we test every lock and key together so you can see it working.' },
    ],
  },
  about: {
    heading: 'Quiet, careful work in your home',
    paragraphs: [
      'Paramount Locksmiths looks after homes in Bradford. A lock is about trust, so whoever works on your door should be respectful, tidy and clear about what they are doing.',
      'We focus on residential work only, so every visit is about the doors, windows and locks in your home. We explain the options, let you choose, and leave the place as we found it.',
    ],
  },
};

// ---------- Blog (editable in the admin dashboard) ----------
export const BLOG = [
  {
    slug: 'signs-your-front-door-lock-needs-replacing',
    title: 'Signs your front door lock needs replacing',
    date: '2026-11-01',
    excerpt: 'A stiff key or a door that will not latch can mean more than a worn spring. Here is what to look for.',
    image: '',
    body: [
      'A lock rarely fails without warning. The key starts to catch, you have to lift the door to turn it, or the bolt does not sit fully in the frame. Each of these is worth taking seriously.',
      'Look for wear on the key itself, bright or rounded edges, and any gap between the lock and the door. Check whether the lock is loose when you turn the key. These small signs often point to a worn cylinder that is easier to replace than to keep fixing.',
      'If you are not sure, call us and we can take a look. Often the answer is a simple repair, and if it is not, we will explain your options clearly before any work starts.',
    ],
  },
  {
    slug: 'simple-ways-to-make-your-home-harder-to-enter',
    title: 'Simple ways to make your home harder to enter',
    date: '2026-11-10',
    excerpt: 'Most entry happens through the easiest door or window. A few small changes can close those gaps.',
    image: '',
    body: [
      'Start with the doors people overlook: the back door, the side gate and the garage. Make sure each one has a lock that matches the job and that the frame is solid.',
      'Windows matter too. Restrictors let you ventilate safely, and good locks on ground-floor windows make a real difference. Keep spare keys out of sight and away from letterboxes.',
      'If you would like a second pair of eyes, ask us for a home security look around. We will point out what we see, and you decide what is worth doing.',
    ],
  },
];
