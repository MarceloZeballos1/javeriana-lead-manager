export type ProgramCategory = 'Pregrado' | 'Posgrado' | 'Ed. Continua';

export interface Program {
  id: number;
  title: string;
  category: ProgramCategory;
  description: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  programId: number;
  date: string;
}
