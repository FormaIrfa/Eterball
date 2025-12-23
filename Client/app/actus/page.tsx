'use client';

import Image from 'next/image';
import Link from 'next/link';
import './actus.scss';

const ACTUS = [
  {
    slug: 'les-dragons-debarquent',
    title: 'Les Dragons Débarquent !',
    tag: 'ÉQUIPE',
    image: '/TeamDragons.png',
    featured: true,
  },
  {
    slug: 'creer-ton-equipe',
    title: 'Créer ton équipe',
    tag: 'TEAM',
    image: '/Team_depart.png',
  },
  {
    slug: 'dragonflame-stadium',
    title: 'Dragonflame Stadium',
    tag: 'STADE',
    image: '/DragonFlame_Stadium.png',
  },
  {
    slug: 'capitale-eterball',
    title: 'Capitale d’Eterball',
    tag: 'MONDE',
    image: '/image_fictif_jeu.png',
  },
  {
    slug: 'chaque-stade-est-unique',
    title: 'Chaque stade est unique',
    tag: 'TERRAIN',
    image: '/Premier_Stade.png',
  },
  {
    slug: 'augmenter-son-agilite',
    title: 'Augmente ton agilité',
    tag: 'ENTRAÎNEMENT',
    image: '/Entrainement_agilite1.png',
  },
];

const featured = ACTUS.find((a) => a.featured);
const others = ACTUS.filter((a) => !a.featured);

export default function ActusPage() {
  return (
    <main className="actus-page">
      <h1 className="actus-title">Actualités</h1>

      {/* ===== TOP LAYOUT ===== */}
      {featured && (
        <section className="actus-layout">
          <Link
            href={`/actus/${featured.slug}`}
            className="actus-card actus-card--featured"
          >
            <Image src={featured.image} alt={featured.title} fill priority />
            <div className="actus-overlay">
              <span className="actus-tag">{featured.tag}</span>
              <h2>{featured.title}</h2>
            </div>
          </Link>

          <Link
            href={`/actus/${others[0].slug}`}
            className="actus-card actus-card--side"
          >
            <Image src={others[0].image} alt={others[0].title} fill />
            <div className="actus-overlay">
              <span className="actus-tag">{others[0].tag}</span>
              <h3>{others[0].title}</h3>
            </div>
          </Link>
        </section>
      )}

      {/* ===== GRID CLASSIQUE ===== */}
      <section className="actus-grid">
        {others.slice(1).map((actu) => (
          <Link
            key={actu.slug}
            href={`/actus/${actu.slug}`}
            className="actus-card"
          >
            <Image src={actu.image} alt={actu.title} fill />
            <div className="actus-overlay">
              <span className="actus-tag">{actu.tag}</span>
              <h3>{actu.title}</h3>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
