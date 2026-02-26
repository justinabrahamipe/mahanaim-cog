import { ContactMethod } from '@/types';

export const contactMethods: ContactMethod[] = [
  {
    title: 'Call Us',
    description: 'Speak to us directly',
    details: '+44 7411 539877',
    iconType: 'phone',
    actionUrl: 'tel:+447411539877',
    colorTheme: 'primary',
  },
  {
    title: 'WhatsApp',
    description: 'Chat with us on WhatsApp',
    details: '+44 7411 539877',
    iconType: 'whatsapp',
    actionUrl: 'https://wa.me/447411539877',
    colorTheme: 'secondary',
  },
  {
    title: 'Email Us',
    description: 'Send us a message',
    details: 'mahanaimcog@gmail.com',
    iconType: 'email',
    actionUrl: 'mailto:mahanaimcog@gmail.com',
    colorTheme: 'secondary',
  },
  {
    title: 'Facebook',
    description: 'Connect on social media',
    details: 'Mahanaim Church of God',
    iconType: 'facebook',
    actionUrl: 'https://www.facebook.com/mahanaimcog',
    colorTheme: 'primary',
  },
];
