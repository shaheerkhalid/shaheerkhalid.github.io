import type { CategoryInfo, UAECity, CityInfo } from "@/types";
import { categoryCounts } from "./listings";

export const categories: CategoryInfo[] = [
  {
    id: "vehicles",
    name: "Vehicles",
    nameAr: "مركبات",
    icon: "🚗",
    count: categoryCounts.vehicles || 0,
  },
  {
    id: "property",
    name: "Property",
    nameAr: "عقارات",
    icon: "🏠",
    count: categoryCounts.property || 0,
  },
  {
    id: "electronics",
    name: "Electronics",
    nameAr: "إلكترونيات",
    icon: "📱",
    count: categoryCounts.electronics || 0,
  },
  {
    id: "furniture",
    name: "Furniture",
    nameAr: "أثاث",
    icon: "🛋️",
    count: categoryCounts.furniture || 0,
  },
  {
    id: "jobs",
    name: "Jobs",
    nameAr: "وظائف",
    icon: "💼",
    count: categoryCounts.jobs || 0,
  },
  {
    id: "services",
    name: "Services",
    nameAr: "خدمات",
    icon: "🔧",
    count: categoryCounts.services || 0,
  },
  {
    id: "fashion",
    name: "Fashion",
    nameAr: "موضة",
    icon: "👗",
    count: categoryCounts.fashion || 0,
  },
  {
    id: "pets",
    name: "Pets",
    nameAr: "حيوانات أليفة",
    icon: "🐾",
    count: categoryCounts.pets || 0,
  },
  {
    id: "other",
    name: "Other",
    nameAr: "أخرى",
    icon: "📦",
    count: categoryCounts.other || 0,
  },
];

export const cities: CityInfo[] = [
  { id: "dubai", name: "Dubai", nameAr: "دبي" },
  { id: "abu-dhabi", name: "Abu Dhabi", nameAr: "أبو ظبي" },
  { id: "sharjah", name: "Sharjah", nameAr: "الشارقة" },
  { id: "ajman", name: "Ajman", nameAr: "عجمان" },
  { id: "ras-al-khaimah", name: "Ras Al Khaimah", nameAr: "رأس الخيمة" },
  { id: "fujairah", name: "Fujairah", nameAr: "الفجيرة" },
  { id: "umm-al-quwain", name: "Umm Al Quwain", nameAr: "أم القيوين" },
  { id: "al-ain", name: "Al Ain", nameAr: "العين" },
];

export function formatPrice(price: number): string {
  if (price === 0) return "Free";
  return new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
    maximumFractionDigits: 0,
  }).format(price);
}

export function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString("en-AE", {
    day: "numeric",
    month: "short",
  });
}

export function getCityName(cityId: UAECity): string {
  return cities.find((c) => c.id === cityId)?.name || cityId;
}

export function getCategoryName(categoryId: string): string {
  return (
    categories.find((c) => c.id === categoryId)?.name || categoryId
  );
}
