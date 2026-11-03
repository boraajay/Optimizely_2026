import {
  Activity,
  AlertCircle,
  ArrowRight,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Film,
  Globe,
  MapPin,
  Play,
  Plus,
  Search,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Star,
  Trash2,
  Trophy,
  Tv,
  X,
  type LucideIcon,
} from 'lucide-react';
import type { IconName } from '../types';

const ICONS: Record<IconName, LucideIcon> = {
  activity: Activity,
  'alert-circle': AlertCircle,
  'arrow-right': ArrowRight,
  check: Check,
  'check-circle': CheckCircle,
  'chevron-down': ChevronDown,
  'chevron-up': ChevronUp,
  film: Film,
  globe: Globe,
  'map-pin': MapPin,
  play: Play,
  plus: Plus,
  search: Search,
  'shopping-bag': ShoppingBag,
  'shopping-cart': ShoppingCart,
  sparkles: Sparkles,
  star: Star,
  'trash-2': Trash2,
  trophy: Trophy,
  tv: Tv,
  x: X,
};

interface IconProps {
  name: IconName;
  className?: string;
}

export function Icon({ name, className }: IconProps) {
  const Component = ICONS[name];
  return <Component className={className} aria-hidden="true" />;
}
