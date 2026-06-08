// ============================================================================
// UAE Classifieds — Type Definitions
// ============================================================================

export type ListingCategory =
  | "vehicles"
  | "property"
  | "electronics"
  | "furniture"
  | "jobs"
  | "services"
  | "fashion"
  | "pets"
  | "other";

export type ListingCondition = "new" | "used" | "refurbished";

export type ListingSource = "direct" | "facebook" | "reddit" | "other";

export type UserRole = "guest" | "user" | "moderator" | "admin" | "super_admin";

export type UAECity =
  | "abu-dhabi"
  | "dubai"
  | "sharjah"
  | "ajman"
  | "ras-al-khaimah"
  | "fujairah"
  | "umm-al-quwain"
  | "al-ain";

export interface ListingImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: "AED";
  category: ListingCategory;
  condition: ListingCondition;
  images: ListingImage[];
  city: UAECity;
  neighborhood: string;
  source: ListingSource;
  originalUrl?: string;
  postedDate: string; // ISO 8601
  sellerName: string;
  sellerContact?: string;
  featured: boolean;
  verified: boolean;
  tags: string[];
}

export interface CategoryInfo {
  id: ListingCategory;
  name: string;
  nameAr: string;
  icon: string;
  count: number;
}

export interface CityInfo {
  id: UAECity;
  name: string;
  nameAr: string;
}

export interface SearchFilters {
  query: string;
  category: ListingCategory | "all";
  city: UAECity | "all";
  minPrice: number | null;
  maxPrice: number | null;
  condition: ListingCondition | "all";
  sortBy: "newest" | "price-asc" | "price-desc" | "relevance";
  page: number;
  pageSize: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  verified: boolean;
  avatar?: string;
  savedSearches: SavedSearch[];
  favorites: string[]; // listing IDs
}

export interface SavedSearch {
  id: string;
  name: string;
  filters: Omit<SearchFilters, "page" | "pageSize">;
  alertEnabled: boolean;
  createdAt: string;
}

export interface AdminStats {
  totalListings: number;
  pendingModeration: number;
  totalUsers: number;
  reportedListings: number;
  dailyActiveUsers: number;
  searchesToday: number;
}
