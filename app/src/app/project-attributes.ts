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
  orgUrl: string;
  orgIconUrl: string;

  start: Date | string;
  end?: Date | string;

  tech: Array<{
    tech: Tech;
    description?: string;
  }>;
}
