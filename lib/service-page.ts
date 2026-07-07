import type { LucideIcon } from 'lucide-react';
import {
  BarChart3,
  BookOpen,
  Calendar,
  Filter,
  Gauge,
  Layers,
  LineChart,
  Megaphone,
  Monitor,
  MousePointer,
  Palette,
  Smartphone,
  Target,
  Users,
  Video,
  Zap
} from 'lucide-react';
import type { PricingTierKey } from '@/components/services/service-pricing-carousel';
import type { ServiceSlug } from '@/lib/services';

export type PricingTierData = {
  price: string;
  description: string;
  features: string[];
};

export type ServicePageContent = {
  badge: string;
  title: string;
  subtitle: string;
  problem: { title: string; body: string };
  solution: { title: string; body: string };
  deliverables: { title: string; description: string }[];
  tiers?: Partial<Record<PricingTierKey, { name?: string; tagline?: string }>>;
  pricing: Record<PricingTierKey, PricingTierData>;
  cta: { title: string; subtitle: string };
  faq: { question: string; answer: string }[];
};

export const SERVICE_DELIVERABLE_ICONS: Record<ServiceSlug, LucideIcon[]> = {
  branding: [Palette, BookOpen, Layers, Target],
  'diseno-web': [Monitor, Smartphone, MousePointer, Gauge],
  contenido: [Calendar, Video, Users, BarChart3],
  'estrategia-digital': [Megaphone, Filter, Zap, LineChart]
};
