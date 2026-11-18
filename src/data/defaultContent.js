// Default site content. Used until the admin saves changes to the database.
// Contact details are DUMMY placeholders. Replace them in the admin dashboard.

export default {
  business: {
    name: 'Paramount Locksmiths',
    tagline: 'Residential locksmiths in Bradford',
    phone: '01632 960 123', // DUMMY
    email: 'hello@example.com', // DUMMY
    address: '1 Example Street, Bradford BD1 1AA', // DUMMY
    hours: 'Monday to Saturday, 8am to 6pm', // DUMMY
    mapEmbedUrl: 'https://www.google.com/maps?q=Bradford%2C%20UK&output=embed',
  },

  hero: {
    eyebrow: 'Residential locksmiths in Bradford',
    headline: 'Your home, properly locked.',
    highlight: 'properly locked.',
    sub: 'Lock changes, repairs and emergency lockout help for homes across Bradford. Friendly, tidy work, done properly the first time.',
    ctaPrimary: 'Call us now',
    ctaSecondary: 'See our services',
    image: '',
  },

  marquee: [
    'Lock changes',
    'Emergency lockouts',
    'uPVC repairs',
    'Anti-snap cylinders',
    'Spare keys',
    'Burglary repairs',
  ],

  services: {
    heading: 'Home lock services',
    intro: 'Every job we take is for a house or flat. We work on the doors, windows and locks you live behind, and nothing commercial.',
    items: [
      { title: 'Emergency lockout help', desc: 'Locked out of the house? Call us and we will get you back in as calmly and quickly as we can, aiming to avoid damage to the door.' },
      { title: 'Lock changes and rekeying', desc: 'Moved in, lost keys or just want fresh locks? We change or re-key your locks so only the keys you trust will work.' },
      { title: 'uPVC door lock repair', desc: 'Stiff, jammed or broken multipoint locks and handles repaired or replaced, including on older uPVC doors.' },
      { title: 'Anti-snap and high-security cylinders', desc: 'Upgrade to anti-snap and anti-bump cylinders that resist the most common break-in methods.' },
      { title: 'Mortice lock fitting', desc: 'Fitting and replacing traditional deadlocks on wooden and composite doors.' },
      { title: 'Garage, shed and gate locks', desc: 'Secure the outbuildings and side gates around your home with the right lock for the job.' },
      { title: 'Letterbox and handle locks', desc: 'Letterbox locks and door handle replacements that keep your front door secure and easy to use.' },
      { title: 'Window restrictors', desc: 'Restrictors fitted to your windows so they can be aired safely while staying secure.' },
      { title: 'Spare key cutting', desc: 'Spare keys cut for most domestic locks, including many uPVC and mortice keys.' },
      { title: 'Broken key removal', desc: 'A snapped key stuck in the lock? We carefully remove it and check the lock still works.' },
      { title: 'Burglary damage repairs', desc: 'After a break-in we repair the door, frame and locks, and point out the weak spots we found.' },
      { title: 'Home security advice', desc: 'A friendly look around your home to show where it could be stronger, with no pressure to buy.' },
    ],
  },

  about: {
    eyebrow: 'About us',
    heading: 'Quiet, careful work in your home',
    paragraphs: [
      'Paramount Locksmiths looks after homes in Bradford. A lock is about trust, so whoever works on your door should be respectful, tidy and clear about what they are doing.',
      'We focus on residential work only, so every visit is about the doors, windows and locks in your home. We explain the options, let you choose, and leave the place as we found it.',
      'Whether a lock has started sticking or you want a full set of new locks, we will talk it through with you first.',
    ],
    image: '',
  },

  process: {
    heading: 'From first call to finished door',
    steps: [
      { title: 'Tell us what is happening', desc: 'Call us and describe the problem: a lockout, a broken lock, a move or a home security worry.' },
      { title: 'We agree the job', desc: 'We talk you through the options so you know what the work involves before anything starts.' },
      { title: 'We do the work', desc: 'Our engineer arrives, works carefully and keeps your home tidy while they are there.' },
      { title: 'We check it with you', desc: 'Before we leave, we test every lock and key together so you can see it working.' },
    ],
  },

  areas: {
    heading: 'Covering Bradford and nearby',
    intro: 'We work with homeowners and tenants across Bradford and the surrounding areas. Call us to check we can reach you.',
    towns: ['Bradford city centre', 'Shipley', 'Bingley', 'Keighley', 'Baildon', 'Idle', 'Thornton', 'Wibsey', 'Allerton', 'Heaton'],
  },

  blog: [
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
  ],
};
