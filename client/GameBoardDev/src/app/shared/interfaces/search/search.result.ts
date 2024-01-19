export interface SearchResult<T> {
  results: T[];
  pageNumber: number;
  totalElements: number;
}
