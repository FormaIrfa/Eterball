import { ClassType } from '@/app/types/class';

const API_ORIGIN =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ||
  'http://localhost:5000';

const getClasses = async (): Promise<ClassType[]> => {
  const res = await fetch(`${API_ORIGIN}/api/classes`, { cache: 'no-store' });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Erreur API classes: ${res.status} ${text}`);
  }

  return res.json();
};

const getClassBySlug = async (slug: string): Promise<ClassType> => {
  const res = await fetch(`${API_ORIGIN}/api/classes/${slug}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Erreur API classe (${slug}): ${res.status} ${text}`);
  }

  return res.json();
};

export { getClasses, getClassBySlug };
