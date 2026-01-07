'use client';

import Image from 'next/image';
import './shop.scss';
import { useEffect, useState } from 'react';

type Item = {
  _id: string;
  name: string;
  price: number;
  imageURL: string; // ex: "/static/items/xxx.png"
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';

const ShopPage = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}/shop/items`, { cache: 'no-store' });

        // si jamais le back renvoie un 4xx/5xx, on évite un .json() trompeur
        if (!res.ok) {
          const text = await res.text().catch(() => '');
          console.error('Shop API error:', res.status, text);
          setItems([]);
          return;
        }

        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);

        if (!Array.isArray(data)) {
          console.warn('Shop API did not return an array:', data);
        }
      } catch (error) {
        console.error('Error fetching items:', error);
        setItems([]);
      }
    })();
  }, []);

  return (
    <div>
      <main>
        <h1 id="title-shop">Boutique d&apos;Eterball</h1>

        <section id="shop-section">
          <div>
            <ul className="cat">
              <li>Tous</li>
              <li>Booster</li>
              <li>Article du moment</li>
              <li>Eter</li>
              <li>Services</li>
              <li>Packs</li>
              <li>Objets</li>
              <li>Promotions</li>
            </ul>

            <ul className="item-list">
              {items.length === 0 ? (
                <p style={{ padding: 12 }}>Aucun article pour le moment.</p>
              ) : (
                items.map((it) => (
                  <li key={it._id} className="item">
                    <div className="card-container">
                      <Image
                        src={`${it.imageURL}`}
                        alt={it.name}
                        width={250}
                        height={250}
                      />
                      <p>{it.name}</p>
                      <p>{it.price} Eter</p>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ShopPage;
