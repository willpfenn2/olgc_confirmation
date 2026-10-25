export interface LessonEntry {
  order: number;
  slug: string;
  title: string;
  published: boolean;
}

export const lessons: LessonEntry[] = [
  { order: 1,  slug: '01-Intro',       title: 'What is Confirmation?',         published: true  },
  { order: 2,  slug: '02-the-holy-spirit',            title: 'The Holy Spirit',                published: false },
  { order: 3,  slug: '03-gifts-of-the-spirit',        title: 'Gifts of the Holy Spirit',       published: false },
  { order: 4,  slug: '04-fruits-of-the-spirit',       title: 'Fruits of the Holy Spirit',      published: false },
  { order: 5,  slug: '05-the-sacraments',             title: 'The Sacraments',                 published: false },
  { order: 6,  slug: '06-baptism-and-confirmation',   title: 'Baptism and Confirmation',       published: false },
  { order: 7,  slug: '07-the-apostles-creed',         title: "The Apostles' Creed",            published: false },
  { order: 8,  slug: '08-the-trinity',                title: 'The Trinity',                    published: false },
  { order: 9,  slug: '09-jesus-christ',               title: 'Jesus Christ',                   published: false },
  { order: 10, slug: '10-the-church',                 title: 'The Church',                     published: false },
  { order: 11, slug: '11-the-mass',                   title: 'The Mass',                       published: false },
  { order: 12, slug: '12-the-eucharist',              title: 'The Eucharist',                  published: false },
  { order: 13, slug: '13-prayer',                     title: 'Prayer',                         published: false },
  { order: 14, slug: '14-the-our-father',             title: 'The Our Father',                 published: false },
  { order: 15, slug: '15-mary-and-the-saints',        title: 'Mary and the Saints',            published: false },
  { order: 16, slug: '16-the-ten-commandments',       title: 'The Ten Commandments',           published: false },
  { order: 17, slug: '17-the-beatitudes',             title: 'The Beatitudes',                 published: false },
  { order: 18, slug: '18-sin-and-forgiveness',        title: 'Sin and Forgiveness',            published: false },
  { order: 19, slug: '19-choosing-a-confirmation-saint', title: 'Choosing a Confirmation Saint', published: false },
  { order: 20, slug: '20-living-as-a-confirmed-catholic', title: 'Living as a Confirmed Catholic', published: false },
];
