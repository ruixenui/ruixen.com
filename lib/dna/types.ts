/**
 * DNA TYPES FOR RUIXEN REGISTRY
 *
 * Matches the DNA schema from mcp.ruixen.com
 */

export interface ComponentDNA {
  type: string;
  interaction: string[];
  a11y: string[];
  layout: string[];
  animation: string[];
  variants: string[];
}

export interface RegistryComponent {
  name: string;
  title: string;
  description: string;
  code: string;
  dna: ComponentDNA;
  dependencies: string[];
  files: string[];
}

export interface LookupResult {
  found: boolean;
  component?: RegistryComponent;
  similarComponents?: {
    name: string;
    similarity: number;
  }[];
}
