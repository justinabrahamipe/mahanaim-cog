import { ChurchInfo, NavItem } from '@/types';

export const churchInfo: ChurchInfo = {
  name: 'Mahanaim Church of God',
  shortName: 'Mahanaim COG',
  pastor: 'Biju Cherian',
  address: '21 Wilbraham Road, Manchester M14 6JS',
  phone: '+44 7411 539877',
  email: 'mahanaimcog@gmail.com',
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2375.1234567890123!2d-2.2584871!3d53.4613051!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487bb175faa298c9%3A0x8e534c997aaf43a5!2sMahanaim%20Church%20of%20God%2C%20Manchester!5e0!3m2!1sen!2suk!4v1234567890123!5m2!1sen!2suk',
  socialLinks: {
    facebook: 'https://www.facebook.com/mahanaimcog',
    instagram: 'https://www.instagram.com/mahanaim_church_manchester/',
    youtube: 'https://www.youtube.com/@mahanaimchurchofgodmanchester',
  },
  services: [
    {
      title: 'English Worship Service',
      day: 'Sunday',
      time: '9:15 AM - 10:00 AM',
      description: 'Join us for uplifting English worship and fellowship.',
    },
    {
      title: 'Malayalam Service',
      day: 'Sunday',
      time: '10:00 AM - 1:00 PM',
      description: 'Main worship service in Malayalam with powerful sermons and praise.',
    },
    {
      title: 'Sunday School',
      day: 'Sunday',
      time: '9:00 AM - 10:00 AM',
      description: 'Bible classes for children and young learners.',
    },
    {
      title: 'YPE (Youth Programme)',
      day: 'Sunday (Once a month)',
      time: '12:00 PM - 1:00 PM',
      description: 'Monthly youth programme during the Sunday service.',
    },
    {
      title: 'Night Prayer',
      day: 'Monday - Thursday',
      time: '8:00 PM - 9:00 PM',
      description: 'Midweek evening prayer meetings.',
    },
    {
      title: 'Friday Prayer',
      day: 'Friday',
      time: '11:00 AM - 2:00 PM',
      description: 'Come together in prayer and intercession for our community and beyond.',
    },
    {
      title: 'Fasting Prayer',
      day: 'First Friday, Saturday & Sunday of each month',
      time: '',
      description: 'Monthly fasting prayer to seek the Lord together.',
    },
  ],
};

export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Messages', href: '/sermons' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Leadership', href: '/leadership' },
  { label: 'Contact', href: '/contact' },
];
