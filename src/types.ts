export interface Diff {
  id: string;
  title: string;
  files: any[]
}

export interface File {
  hunks: Hunk[];
  index: number;
  new_path: string;
  old_path: string;
  type: "unchanged" | "changed";
}

export interface Hunk {
  header: string;
  index: number;
  lines: Line[];
  old_range: [number, number];
}

export interface Line {
  type: "context" | "add" | "remove";
  content: "string";
  locator: Locator;
  new_line_number: number;
  original_line_number: number;
}

export type Locator = [number?, number?, number?, number?];

export interface ClientConfiguration {
  token: string,
  apiBaseUrl: string,
  diffId: string
  mode: DiffMode;
}

export interface Annotation {
  id?: string;
  body: string;
  admin?: string;
  locator: Locator;
  draft?: boolean;
  created_at?: string;
  type: string;
}

export enum DiffMode {
  ANNOTATION = "annotation",
  COMMENT = "comment"
}
