import { ClassType } from '@/app/types/class';

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ||
  'http://localhost:5000/api';

export async function getClasses(): Promise<ClassType[]> {
  const res = await fetch(`${API_BASE}/classes`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error(`Erreur API classes: ${res.status}`);
  }

  return res.json();
}

export async function getClassBySlug(slug: string): Promise<ClassType> {
  const res = await fetch(`${API_BASE}/classes/${slug}`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error(`Erreur API classe (${slug}): ${res.status}`);
  }

  return res.json();
}
