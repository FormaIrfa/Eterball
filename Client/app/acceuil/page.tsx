import Image from 'next/image';
import './accueil.scss';
const Acceuil = () => {
  return (
    <div>
      <section id="intro">
        <div id="description">
          <h1>Fais vibrer le terrain dans Eterball</h1>
          <p id="catchphrase">
            Plonge dans un MMORPG unique ou stratégie et esprit d'équipe
            règnent. Affronte des équipes redoutables dans des stades épiques et
            mène ta team vers la gloire. Sauras-tu prouver ta valeur sur le
            terrain ?
          </p>
        </div>
        <div>
          <button id="download">Télécharger</button>
        </div>
      </section>

      <section id="actus-news">
        <div id="actus">
          <div id="img-actus">
            <h2>Actus et Nouveautés</h2>
            <Image
              id="img-dragons"
              src="/TeamDragons.png"
              alt="Team Dragons"
              width={250}
              height={180}
            />
            <Image
              id="img-dragonStadium"
              src="/DragonFlame_Stadium.png"
              alt="Team Dragons"
              width={250}
              height={180}
            />
            <Image
              id="img-teamDepart"
              src="/Team_depart.png"
              alt="Team Dragons"
              width={250}
              height={180}
            />
            <Image
              id="img-trainAgility"
              src="/Entrainement_agilite1.png"
              alt="Team Dragons"
              width={250}
              height={180}
            />
          </div>
          <div id="events">
            <div id="titre-event">
              <h2>Event Important</h2>
              <Image
                id="img-event"
                src="/logo-event.png"
                alt="Event DragonFlame"
                width={400}
                height={330}
              />
              <button id="event-btn">Affrontez-les !</button>
            </div>
          </div>
        </div>
      </section>

      <section id="img-presentation">
        <div id="img-jeu">
          <Image
            id="img-dragons"
            src="/ville_principale_secteur_marchand.png"
            alt="Team Dragons"
            width={400}
            height={250}
          />
          <Image
            id="img-dragonStadium"
            src="/personnalisation_joueur.png"
            alt="Team Dragons"
            width={400}
            height={250}
          />
          <Image
            id="img-teamDepart"
            src="/entrainement_agilite1.png"
            alt="Team Dragons"
            width={400}
            height={250}
          />
        </div>
      </section>

      <section id="previsualisation-personnages">
        <div id="background"></div>
        <div id="classes">
          <div id="personnages">
            <Image
              id="personnage"
              src="/Milieu.png"
              alt="Milieu"
              width={200}
              height={300}
            />
          </div>
          <div id="intro-personnages">
            <h2>Classes et spécialités</h2>
            <p id="description">
              Le milieu de terrain est le cœur du jeu, véritable lien entre la
              défense et lattaque. Polyvalent et stratège, il dicte le rythme du
              match en orientant le jeu, en récupérant les ballons et en créant
              des opportunités.
            </p>
            <button id="pageJoueurs">Voir toutes les classes</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Acceuil;
