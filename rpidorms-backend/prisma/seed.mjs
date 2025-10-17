import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const dorms = [
  { name: 'Barton Hall', slug: 'barton-hall' },
  { name: 'Bray Hall', slug: 'bray-hall' },
  { name: 'Burdett Avenue Residence Hall', slug: 'barh' },
  { name: 'Cary Hall', slug: 'cary-hall' },
  { name: 'Crockett Hall', slug: 'crockett-hall' },
  { name: 'Davison Hall', slug: 'davison-hall' },
  { name: 'Nugent Hall', slug: 'nugent-hall' },
  { name: 'Hall Hall', slug: 'hall-hall' },
  { name: 'Nason Hall', slug: 'nason-hall' },
  { name: 'Sharp Hall', slug: 'sharp-hall' },
  { name: 'Warren Hall', slug: 'warren-hall' },
  { name: 'Beman and Brinsmade (RAHP B)', slug: 'rahp-b' },
  { name: 'Blitman Residence Commons', slug: 'blitman' },
  { name: 'Colvin and Albright (RAHP A)', slug: 'rahp-a' },
  { name: 'E-Complex', slug: 'e-complex' },
  { name: 'North Hall', slug: 'north-hall' },
  { name: 'Quadrangle (Quad)', slug: 'quad' },
  { name: 'Bryckwyck Apartments', slug: 'bryckwyck' },
  { name: 'City Station West', slug: 'city-station-west' },
  { name: 'Polytechnic Apartments', slug: 'polytechnic-apts' },
  { name: 'Stacwyck Apartments', slug: 'stacwyck' },
];
const amenities = ['AC','Laundry','Elevator','Kitchen','Study Lounges','WiFi'];

async function main() {
  await prisma.dorm.createMany({ data: dorms, skipDuplicates: true });
  await prisma.amenity.createMany({ data: amenities.map(name => ({ name })), skipDuplicates: true });
}

main().finally(() => prisma.$disconnect());
