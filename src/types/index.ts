export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
  children?: NavItem[];
}

export interface ServiceTime {
  title: string;
  day: string;
  time: string;
  description: string;
}

export interface SocialLinks {
  facebook: string;
  instagram: string;
  youtube: string;
}

export interface ChurchInfo {
  name: string;
  shortName: string;
  pastor: string;
  address: string;
  phone: string;
  email: string;
  mapEmbedUrl: string;
  socialLinks: SocialLinks;
  services: ServiceTime[];
}

export interface Leader {
  priority: number;
  name: string;
  designation: string;
  imageUrl: string;
  type: 'pastor' | 'cpc' | 'official' | 'cell';
  phone?: string;
  whatsapp?: string;
  facebookUrl?: string;
}

export interface ContactMethod {
  title: string;
  description: string;
  details: string;
  iconType: 'phone' | 'email' | 'location' | 'whatsapp' | 'facebook';
  actionUrl: string;
}

export interface ChurchContact {
  phone?: string;
  contactNumbers?: string[];
  website?: string;
  instagram?: string;
  facebook?: string;
  facebookLinks?: string[];
  whatsapp?: string;
  email?: string;
  youtube?: string;
}

export interface SisterChurch {
  name: string;
  location: string;
  pastor: string;
  pastorPhone?: string;
  pastorWhatsapp?: string;
  isMotherChurch?: boolean;
  contact?: ChurchContact;
  photo?: string;
  familyPhotoStatus?: string | null;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  location: string;
  start: string;
  end: string;
  allDay: boolean;
}

export interface GalleryImage {
  src: string;
  title: string;
  description: string;
}

export interface PageMeta {
  title: string;
  description: string;
  path: string;
}

export interface MagazineArticle {
  slug: string;
  title: string;
  author: string;
  date: string;
  coverImage: string;
  excerpt: string;
  content: string;
}
