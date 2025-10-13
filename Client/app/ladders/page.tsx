'use client';

import Image from 'next/image';
import './ladders.scss';
import Link from 'next/link';

const Ladders = () => {
  return (
    <div>
      <section id="ladders">
        <article id="general">
          <h2>Ladder général</h2>
          <Image
            id="ladder-general"
            src="/Miniature_Ladder_gen.png"
            alt="General ladder"
            width={450}
            height={300}
          />
          <div id="classement">
            <ol id="players">
              <li id="joueur1">
                <div className="info">
                  <span className="rank">1</span>&nbsp;
                  <Image
                    id="personnage"
                    src="/Miniature_Milieu.png"
                    alt="first-player"
                    width={50}
                    height={50}
                  />
                  &nbsp;Nagaa
                </div>
                <div>
                  <p id="statPlayer">100 GEN</p>
                </div>
              </li>

              <li id="joueur2">
                <div className="info">
                  <span className="rank">2</span>&nbsp;
                  <Image
                    id="personnage"
                    src="/Miniature_Aillier.png"
                    alt="first-player"
                    width={50}
                    height={50}
                  />
                  &nbsp;Poweur-Aizen
                </div>
                <div>
                  <p id="statPlayer">99 GEN</p>
                </div>
              </li>
              <li id="joueur3">
                <div className="info">
                  <span className="rank">3</span>&nbsp;
                  <Image
                    id="personnage"
                    src="/Miniature_AT.png"
                    alt="first-player"
                    width={50}
                    height={50}
                  />
                  &nbsp;Luigy
                </div>
                <div>
                  <p id="statPlayer">98 GEN</p>
                </div>
              </li>
            </ol>
          </div>
          <div id="buttonClassement">
            <Link href="/ladders/general">
              <button id="voir-classement">Voir le classement complet</button>
            </Link>
          </div>
        </article>

        <article id="general">
          <h2>Ladder team vs team</h2>
          <Image
            id="ladder-soccherium"
            src="/Soccherium.png"
            alt="Soccherium ladder"
            width={450}
            height={300}
          />
          <div id="classement">
            <ol id="players">
              <li id="joueur1">
                <div className="info">
                  <span className="rank">1</span>&nbsp;
                  <Image
                    id="personnage"
                    src="/Miniature_AT.png"
                    alt="first-player"
                    width={50}
                    height={50}
                  />
                  &nbsp;MG|E
                </div>
                <div>
                  <p id="statPlayer">50 v</p>
                </div>
              </li>

              <li id="joueur2">
                <div className="info">
                  <span className="rank">2</span>&nbsp;
                  <Image
                    id="personnage"
                    src="/Miniature_Milieu.png"
                    alt="first-player"
                    width={50}
                    height={50}
                  />
                  &nbsp;NANKATSU
                </div>
                <div>
                  <p id="statPlayer">49 v</p>
                </div>
              </li>
              <li id="joueur3">
                <div className="info">
                  <span className="rank">3</span>&nbsp;
                  <Image
                    id="personnage"
                    src="/Miniature_Aillier.png"
                    alt="first-player"
                    width={50}
                    height={50}
                  />
                  &nbsp;MAGMA
                </div>
                <div>
                  <p id="statPlayer">48 v</p>
                </div>
              </li>
            </ol>
          </div>
          <div id="buttonClassement">
            <Link href="/ladders/soccherium">
              <button id="voir-classement">Voir le classement complet</button>
            </Link>
          </div>
        </article>

        <article id="general">
          <h2>Ladder succès</h2>
          <Image
            id="ladder-succes"
            src="/Succes.png"
            alt="Succes ladder"
            width={450}
            height={300}
          />
          <div id="classement">
            <ol id="players">
              <li id="joueur1">
                <div className="info">
                  <span className="rank">1</span>&nbsp;
                  <Image
                    id="personnage"
                    src="/Miniature_Aillier.png"
                    alt="first-player"
                    width={50}
                    height={50}
                  />
                  &nbsp;Poweur-Aizen
                </div>
                <div>
                  <p id="statPlayer">9245</p>
                </div>
              </li>

              <li id="joueur2">
                <div className="info">
                  <span className="rank">2</span>&nbsp;
                  <Image
                    id="personnage"
                    src="/Miniature_AT.png"
                    alt="first-player"
                    width={50}
                    height={50}
                  />
                  &nbsp;Luigy
                </div>
                <div>
                  <p id="statPlayer">8875</p>
                </div>
              </li>
              <li id="joueur3">
                <div className="info">
                  <span className="rank">3</span>&nbsp;
                  <Image
                    id="personnage"
                    src="/Miniature_Milieu.png"
                    alt="first-player"
                    width={50}
                    height={50}
                  />
                  &nbsp;Nagaa
                </div>
                <div>
                  <p id="statPlayer">8600</p>
                </div>
              </li>
            </ol>
          </div>
          <div id="buttonClassement">
            <Link href="/ladders/succes">
              <button id="voir-classement">Voir le classement complet</button>
            </Link>
          </div>
        </article>
      </section>
    </div>
  );
};

export default Ladders;
