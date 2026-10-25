export interface LessonEntry {
  order: number;
  slug: string;
  title: string;
  /** ISO date (YYYY-MM-DD) of the Sunday this lesson is taught */
  date: string;
  /** true = has a published page; false = title/date only, no page */
  published: boolean;
  /** false means the sidebar entry is not a link even if there is no page yet */
  clickable: boolean;
}

// Class schedule: Sundays starting Oct 11, 2026 through May 23, 2027.
// Breaks (no class): Nov 1, Nov 29, Dec 27 (2026); Jan 3, Mar 28 (2027).
export const lessons: LessonEntry[] = [
  { order: 1,  slug: '01-intro',               title: 'Intro',             date: '2026-10-11', published: true,  clickable: true  },
  { order: 2,  slug: '02-the-kerygma',         title: 'The Kerygma',       date: '2026-10-18', published: true,  clickable: true  },
  { order: 3,  slug: '03-creation',            title: 'Creation',          date: '2026-10-25', published: true,  clickable: true  },
  { order: 4,  slug: '04-the-fall',            title: 'The Fall',          date: '2026-11-08', published: false, clickable: false },
  { order: 5,  slug: '05-salvation',           title: 'Salvation',         date: '2026-11-15', published: false, clickable: false },
  { order: 6,  slug: '06-tbd',                 title: 'TBD',               date: '2026-11-22', published: false, clickable: false },
  { order: 7,  slug: '07-tbd',                 title: 'TBD',               date: '2026-12-06', published: false, clickable: false },
  { order: 8,  slug: '08-tbd',                 title: 'TBD',               date: '2026-12-13', published: false, clickable: false },
  { order: 9,  slug: '09-tbd',                 title: 'TBD',               date: '2026-12-20', published: false, clickable: false },
  { order: 10, slug: '10-tbd',                 title: 'TBD',               date: '2027-01-10', published: false, clickable: false },
  { order: 11, slug: '11-tbd',                 title: 'TBD',               date: '2027-01-17', published: false, clickable: false },
  { order: 12, slug: '12-tbd',                 title: 'TBD',               date: '2027-01-24', published: false, clickable: false },
  { order: 13, slug: '13-tbd',                 title: 'TBD',               date: '2027-01-31', published: false, clickable: false },
  { order: 14, slug: '14-tbd',                 title: 'TBD',               date: '2027-02-07', published: false, clickable: false },
  { order: 15, slug: '15-tbd',                 title: 'TBD',               date: '2027-02-14', published: false, clickable: false },
  { order: 16, slug: '16-tbd',                 title: 'TBD',               date: '2027-02-21', published: false, clickable: false },
  { order: 17, slug: '17-tbd',                 title: 'TBD',               date: '2027-02-28', published: false, clickable: false },
  { order: 18, slug: '18-tbd',                 title: 'TBD',               date: '2027-03-07', published: false, clickable: false },
  { order: 19, slug: '19-tbd',                 title: 'TBD',               date: '2027-03-14', published: false, clickable: false },
  { order: 20, slug: '20-tbd',                 title: 'TBD',               date: '2027-03-21', published: false, clickable: false },
  { order: 21, slug: '21-tbd',                 title: 'TBD',               date: '2027-04-04', published: false, clickable: false },
  { order: 22, slug: '22-tbd',                 title: 'TBD',               date: '2027-04-11', published: false, clickable: false },
  { order: 23, slug: '23-tbd',                 title: 'TBD',               date: '2027-04-18', published: false, clickable: false },
  { order: 24, slug: '24-tbd',                 title: 'TBD',               date: '2027-04-25', published: false, clickable: false },
  { order: 25, slug: '25-tbd',                 title: 'TBD',               date: '2027-05-02', published: false, clickable: false },
  { order: 26, slug: '26-tbd',                 title: 'TBD',               date: '2027-05-09', published: false, clickable: false },
  { order: 27, slug: '27-tbd',                 title: 'TBD',               date: '2027-05-16', published: false, clickable: false },
  { order: 28, slug: '28-tbd',                 title: 'TBD',               date: '2027-05-23', published: false, clickable: false },
];

/** Format an ISO date string as "Oct 11". Treats the string as a local date. */
export function formatShortDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

/** Format an ISO date string as "Sunday, October 11, 2026". */
export function formatLongDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
