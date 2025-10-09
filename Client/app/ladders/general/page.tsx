'use client';

import Image from 'next/image';
import './general.scss';
import Link from 'next/link';

const Ladders = () => {
  return (
    <div>
      <section id="laddersGeneral">
        <article id="general">
          <div id="title">
            <h2>Ladder général</h2>
            <ul className="ladderNavigation">
              <Link href="/ladders/general">
                <li>GÉNÉRAL</li>
              </Link>
              <Link href="/ladders/soccherium">
                <li>SOCCHERIUM</li>
              </Link>
              <Link href="/ladders/succes">
                <li>SUCCÈS</li>
              </Link>
            </ul>
          </div>

          <div className="ladder-image">
            <Image
              src="/Ladder_Gen.png"
              alt="General ladder"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 850px"
              style={{ objectFit: 'cover' }}
            />
          </div>

          <table id="classement">
            <thead>
              <tr>
                <th className="ranking">#</th>
                <th>Nom</th>
                <th className="class">Classe</th>
                <th className="server">Serveur</th>
                <th className="lvl">Niveau</th>
                <th className="game">Matchs</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="rank">1</td>
                <td>
                  <Image
                    src="/Miniature_Milieu.png"
                    alt="Nagaa"
                    width="50"
                    height="50"
                  />
                  &nbsp;Nagaa
                </td>
                <td className="class">Milieu</td>
                <td className="server">Dragos</td>
                <td className="lvl">100 GEN</td>
                <td className="game">2 500</td>
              </tr>
              <tr>
                <td className="rank">2</td>
                <td>
                  <Image
                    src="/Miniature_Aillier.png"
                    alt="Poweur-Aizen"
                    width="50"
                    height="50"
                  />
                  &nbsp;Poweur-Aizen
                </td>
                <td className="class">Ailier</td>
                <td className="server">Dragos</td>
                <td className="lvl">99 GEN</td>
                <td className="game">2 432</td>
              </tr>
              <tr>
                <td className="rank">3</td>
                <td>
                  <Image
                    src="/Miniature_AT.png"
                    alt="Luigy"
                    width="50"
                    height="50"
                  />
                  &nbsp;Luigy
                </td>
                <td className="class">Attaquant</td>
                <td className="server">Dragos</td>
                <td className="lvl">98 GEN</td>
                <td className="game">2 396</td>
              </tr>
              <tr>
                <td className="rank">4</td>
                <td>
                  <Image
                    src="/Miniature_AT.png"
                    alt="Fastlearner"
                    width="50"
                    height="50"
                  />
                  &nbsp;Fastlearner
                </td>
                <td className="class">Attaquant</td>
                <td className="server">Dragos</td>
                <td className="lvl">98 GEN</td>
                <td className="game">2 355</td>
              </tr>
              <tr>
                <td className="rank">5</td>
                <td>
                  <Image
                    src="/Miniature_Milieu.png"
                    alt="Zeyrox"
                    width="50"
                    height="50"
                  />
                  &nbsp;Zeyrox
                </td>
                <td className="class">Gardien</td>
                <td className="server">Dragos</td>
                <td className="lvl">98 GEN</td>
                <td className="game">2 326</td>
              </tr>
              <tr>
                <td className="rank">6</td>
                <td>
                  <Image
                    src="/Miniature_AillierF.png"
                    alt="Satsuki71"
                    width="50"
                    height="50"
                  />
                  &nbsp;Satsuki71
                </td>
                <td className="class">Ailière</td>
                <td className="server">Dragos</td>
                <td className="lvl">96 GEN</td>
                <td className="game">2 058</td>
              </tr>
              <tr>
                <td className="rank">7</td>
                <td>
                  <Image
                    src="/Miniature_AT2.png"
                    alt="Hypernova-Gbx"
                    width="50"
                    height="50"
                  />
                  &nbsp;Hypernova-Gbx
                </td>
                <td className="class">Attaquant</td>
                <td className="server">Dragos</td>
                <td className="lvl">94 GEN</td>
                <td className="game">1 992</td>
              </tr>
              <tr>
                <td className="rank">8</td>
                <td>
                  <Image
                    src="/Miniature_Milieu.png"
                    alt="Le-H"
                    width="50"
                    height="50"
                  />
                  &nbsp;Le-H
                </td>
                <td className="class">Milieu</td>
                <td className="server">Dragos</td>
                <td className="lvl">92 GEN</td>
                <td className="game">1 765</td>
              </tr>
              <tr>
                <td className="rank">9</td>
                <td>
                  <Image
                    src="/Miniature_AillierF.png"
                    alt="Waiss"
                    width="50"
                    height="50"
                  />
                  &nbsp;Waiss
                </td>
                <td className="class">Ailière</td>
                <td className="server">Dragos</td>
                <td className="lvl">91 GEN</td>
                <td className="game">1 699</td>
              </tr>
              <tr>
                <td className="rank">10</td>
                <td>
                  <Image
                    src="/Miniature_Def.png"
                    alt="Xefreh"
                    width="50"
                    height="50"
                  />
                  &nbsp;Xefreh
                </td>
                <td className="class">Défenseur</td>
                <td className="server">Dragos</td>
                <td className="lvl">91 GEN</td>
                <td className="game">1 651</td>
              </tr>
            </tbody>
          </table>
        </article>
        <div id="filtre">
          <h2>Filtrer la liste</h2>
          <div id="server">
            <p className="category">Server</p>
            <p>
              <small>Dragos</small>
            </p>
          </div>
          <div id="search">
            <p className="category">Recherche</p>
            <input type="text" placeholder="Rechercher" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Ladders;
