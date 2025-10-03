'use client';

import Image from 'next/image';
import './ladders.scss';

const Ladders = () => {
  return (
    <div>
      <section id="ladders">
        <article id="general">
          <h2>Ladder général</h2>
          <Image
            id="ladder-general"
            src="/Ladder_Gen.png"
            alt="General ladder"
            width={450}
            height={300}
          />
          <div id="classement">
            <ol id="players">
              <li id="joueur1">
                <div className="info">
                  <span id="rank">1</span>&nbsp;
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
                  <span id="rank">2</span>&nbsp;
                  <Image
                    id="personnage"
                    src="/Miniature_Aillier.png"
                    alt="first-player"
                    width={50}
                    height={50}
                  />
                  &nbsp;Nagaa
                </div>
                <div>
                  <p id="statPlayer">8875</p>
                </div>
              </li>
              <li id="joueur3">
                <div className="info">
                  <span id="rank">3</span>&nbsp;
                  <Image
                    id="personnage"
                    src="/Miniature_Aillier.png"
                    alt="first-player"
                    width={50}
                    height={50}
                  />
                  &nbsp;Luigy
                </div>
                <div>
                  <p id="statPlayer">8600</p>
                </div>
              </li>
            </ol>
          </div>
          <div id="buttonClassement">
            <button id="voir-classement">Voir le classement complet</button>
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
                  <span id="rank">1</span>&nbsp;
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
                  <span id="rank">2</span>&nbsp;
                  <Image
                    id="personnage"
                    src="/Miniature_Aillier.png"
                    alt="first-player"
                    width={50}
                    height={50}
                  />
                  &nbsp;Nagaa
                </div>
                <div>
                  <p id="statPlayer">8875</p>
                </div>
              </li>
              <li id="joueur3">
                <div className="info">
                  <span id="rank">3</span>&nbsp;
                  <Image
                    id="personnage"
                    src="/Miniature_Aillier.png"
                    alt="first-player"
                    width={50}
                    height={50}
                  />
                  &nbsp;Luigy
                </div>
                <div>
                  <p id="statPlayer">8600</p>
                </div>
              </li>
            </ol>
          </div>
          <div id="buttonClassement">
            <button id="voir-classement">Voir le classement complet</button>
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
                  <span id="rank">1</span>&nbsp;
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
                  <span id="rank">2</span>&nbsp;
                  <Image
                    id="personnage"
                    src="/Miniature_Aillier.png"
                    alt="first-player"
                    width={50}
                    height={50}
                  />
                  &nbsp;Nagaa
                </div>
                <div>
                  <p id="statPlayer">8875</p>
                </div>
              </li>
              <li id="joueur3">
                <div className="info">
                  <span id="rank">3</span>&nbsp;
                  <Image
                    id="personnage"
                    src="/Miniature_Aillier.png"
                    alt="first-player"
                    width={50}
                    height={50}
                  />
                  &nbsp;Luigy
                </div>
                <div>
                  <p id="statPlayer">8600</p>
                </div>
              </li>
            </ol>
          </div>
          <div id="buttonClassement">
            <button id="voir-classement">Voir le classement complet</button>
          </div>
        </article>
      </section>
    </div>
  );
};

export default Ladders;
