// Core data types
export interface JsonItem {
  [key: string]: unknown;
}

export interface ComparisonResult {
  additions: JsonItem[];
  deletions: JsonItem[];
  modifications: Array<{
    original: JsonItem;
    modified: JsonItem;
    differences: string[];
  }>;
  identical: JsonItem[];
  originalCount: number;
  filteredCount: number;
  queries: {
    array1: ParsedQuery;
    array2: ParsedQuery;
  };
}

export interface DiffItem {
  type: "addition" | "deletion" | "modification" | "identical";
  item: JsonItem;
  differences?: string[];
  original?: JsonItem;
}

// Query types
export interface QueryCondition {
  property: string;
  operator: string;
  value: unknown;
  logicalOperator?: "AND" | "OR";
}

export interface ParsedQuery {
  conditions: QueryCondition[];
  isValid: boolean;
  error?: string;
}

// Component prop types
export interface QueryBuilderProps {
  data: JsonItem[];
  onQueryChange: (query: ParsedQuery, filteredData: JsonItem[]) => void;
  label: string;
  placeholder?: string;
}