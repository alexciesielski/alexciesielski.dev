export enum Tech {
  GithubActions = 'github-actions',
  WASM = 'wasm',
  Typescript = 'typescript',
  Angular = 'angular',
  TailwindCSS = 'tailwindcss',
  MaterialDesign = 'material-design',
  Jest = 'jest',
  Playwright = 'playwright',
}

export interface ProjectAttributes {
  slug: string;
  title: string;
  description: string;

  org: string;
  orgDescription: string;
  orgUrl: string;
  orgIconUrl: string;

  location: string;
  remote: boolean;

  start: Date;
  end?: Date;

  tech: string[];
  visible?: boolean;
}

export interface TechAttributes {
  slug: string;
  title: string;
  avatar: string;
}
