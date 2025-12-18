'use client';

import Image from 'next/image';

const Actus = () => {
  return (
    <div>
      <h1>Actualités</h1>
      <section id="actus">
        <Image
          src="/TeamDragons.png"
          alt="Team Dragon"
          width={905}
          height={593}
        />
        <Image
          src="/Team_depart.png"
          alt="Team Depart"
          width={452}
          height={290}
        />
        <Image
          src="/DragonFlame_Stadium.png"
          alt="Dragon Flame Stadium"
          width={452}
          height={290}
        />
        <Image
          src="/image_fictif_jeu.png"
          alt="Image Fictif Jeu"
          width={452}
          height={290}
        />
        <Image
          src="/Premier_Stade.png"
          alt=" Premier Stade"
          width={452}
          height={290}
        />
        <Image
          src="/Entrainement_agilite1.png"
          alt=" Entrainement Agilite1"
          width={452}
          height={290}
        />
      </section>
    </div>
  );
};
export default Actus;
