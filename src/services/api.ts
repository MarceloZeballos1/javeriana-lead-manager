import type { Program, ProgramCategory } from '../types';

interface PostResponse {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const getPrograms = async (): Promise<Program[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=24');
  
  if (!response.ok) {
    throw new Error('Failed to fetch programs');
  }

  const data: PostResponse[] = await response.json();
  const categories: ProgramCategory[] = ['Pregrado', 'Posgrado', 'Ed. Continua', 'Otros'];

  return data.map((post) => ({
    id: post.id,
    title: post.title,
    description: post.body,
    category: categories[post.id % 4],
  }));
};
