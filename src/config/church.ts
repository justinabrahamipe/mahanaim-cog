import { ChurchInfo, NavItem } from '@/types';

export const churchInfo: ChurchInfo = {
  name: 'Mahanaim Church of God',
  shortName: 'Mahanaim COG',
  pastor: 'Biju Cherian',
  address: '21 Wilbraham Road, Manchester M14 6JS',
  phone: '+44 123 456 7890',
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
      title: 'Sunday Worship Service',
      day: 'Sunday',
      time: '10:00 AM - 12:00 PM',
      description: 'Join us for uplifting worship, powerful sermons, and fellowship.',
    },
    {
      title: 'Bible Study',
      day: 'Wednesday',
      time: '7:00 PM - 8:30 PM',
      description: 'Dive deeper into the Word of God with our midweek Bible study.',
    },
    {
      title: 'Prayer Meeting',
      day: 'Friday',
      time: '6:00 PM - 7:30 PM',
      description: 'Come together in prayer and intercession for our community and beyond.',
    },
    {
      title: 'Youth Service',
      day: 'Saturday',
      time: '5:00 PM - 7:00 PM',
      description: 'Dynamic service designed for young people to grow in faith.',
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
