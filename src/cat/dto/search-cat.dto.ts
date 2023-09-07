export interface SearchCatDto {
  row: number;
  q?: string;
  minAge?: number;
  maxAge?: number;
  minPrice?: number;
  maxPrice?: number;
  genders?: string[];
  colors?: string[];
  isRecommended?: boolean;
}
