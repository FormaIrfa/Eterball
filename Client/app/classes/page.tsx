'use client';

import { useEffect, useMemo, useState } from 'react';
import ClassCard from '@/app/components/Classes/ClassCard';
import ClassModal from '@/app/components/Classes/ClassModal';
import { ClassType } from '@/app/types/class';
import { getClasses } from '@/services/classesApi';
import './classes.scss';

export default function ClassesPage() {
  const [classes, setClasses] = useState<ClassType[]>([]);
  const [selected, setSelected] = useState<ClassType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getClasses();
        if (mounted) setClasses(data);
      } catch (e: unknown) {
        if (mounted) {
          const message = e instanceof Error ? e.message : 'Erreur inconnue';
          setError(message);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const sorted = useMemo(
    () => [...classes].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    [classes]
  );

  if (loading) return <p>Chargement des classes…</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <>
      <section className="classes-hero" aria-hidden="true">
        <h1>Classes</h1>
      </section>

      <div className="classes-grid">
        {sorted.map((cls) => (
          <ClassCard
            key={cls._id}
            data={cls}
            onClick={() => setSelected(cls)}
          />
        ))}
      </div>

      {selected && (
        <ClassModal data={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
