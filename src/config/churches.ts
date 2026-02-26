import { SisterChurch } from '@/types';

const placeholderContact = {
  phone: '+440000000000',
  whatsapp: '+440000000000',
  facebook: '#',
  instagram: '#',
};

export const churches: SisterChurch[] = [
  {
    name: 'Mahanaim Church of God Manchester',
    location: 'Manchester',
    pastor: 'Pr. Biju Cherian',
    pastorPhone: '+447411539877',
    pastorWhatsapp: '+447411539877',
    associatePastors: [
      { name: 'Pr. Blesson Sojan', phone: '+440000000000', whatsapp: '+440000000000' },
      { name: 'Evg. Soney C George', phone: '+440000000000', whatsapp: '+440000000000' },
      { name: 'Evg. Gibin Abraham', phone: '+440000000000', whatsapp: '+440000000000' },
      { name: 'Evg. Felix Gonsalves', phone: '+440000000000', whatsapp: '+440000000000' },
    ],
    isMotherChurch: true,
    contact: {
      phone: '+447411539877',
      whatsapp: '+447411539877',
      facebook: 'https://www.facebook.com/mahanaimcog',
      instagram: 'https://www.instagram.com/mahanaim_church_manchester/',
      website: 'https://mahanaimchurch.com',
    },
  },
  {
    name: 'Mahanaim Church of God Telford',
    location: 'Telford',
    pastor: 'Pr. Rejoy Stephan',
    contact: placeholderContact,
  },
  {
    name: 'Mahanaim Church of God Keighley',
    location: 'Keighley',
    pastor: 'Evg. Prince Varughese',
    contact: placeholderContact,
  },
  {
    name: 'Mahanaim Church of God Burnley',
    location: 'Burnley',
    pastor: 'Evg. Ajeesh Mathew',
    contact: placeholderContact,
  },
  {
    name: 'Mahanaim Church of God Shrewsbury',
    location: 'Shrewsbury',
    pastor: 'Evg. Blubin John',
    contact: placeholderContact,
  },
  {
    name: 'Mahanaim Church of God Ludlow',
    location: 'Ludlow',
    pastor: 'Evg. John K Joy',
    contact: placeholderContact,
  },
  {
    name: 'Mahanaim Church of God Preston',
    location: 'Preston',
    pastor: 'Evg. Allan Chacko',
    contact: placeholderContact,
  },
  {
    name: 'Mahanaim Church of God Bolton',
    location: 'Bolton',
    pastor: 'Evg. Bino Mathew',
    contact: placeholderContact,
  },
  {
    name: 'Mahanaim Church of God Crewe',
    location: 'Crewe',
    pastor: 'Pr. Blesson Sojan',
    contact: placeholderContact,
  },
  {
    name: 'Mahanaim Church of God Bradford',
    location: 'Bradford',
    pastor: 'Evg. Prince George',
    contact: placeholderContact,
  },
  {
    name: 'Mahanaim Church of God Warrington',
    location: 'Warrington',
    pastor: 'Evg. Gibin Abraham',
    contact: placeholderContact,
  },
  {
    name: 'Mahanaim Church of God Dolgellau',
    location: 'Dolgellau, North Wales',
    pastor: 'Evg. Stanly Stephen',
    contact: placeholderContact,
  },
  {
    name: 'Mahanaim Church of God Bangor',
    location: 'Bangor, North Wales',
    pastor: 'Br. Johncy Koshy',
    contact: placeholderContact,
  },
];
