'use client';
import Image from 'next/image';
import './shop.scss';
import { useEffect, useState } from 'react';

const ShopPage = () => {
  const [item, setItem] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/shop/items')
      .then((response) => response.json())
      .then((data) => setItem(data))
      .catch((error) => console.error('Error fetching items:', error));
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
              <li>Artcile du moment</li>
              <li>Eter</li>
              <li>Services</li>
              <li>Packs</li>
              <li>Objets</li>
              <li>Promotions</li>
            </ul>
            <ul className="item-list">
              {item.map((it) => (
                <li key={it._id} className="item">
                  <div className="card-container">
                    <Image
                      src={`http://localhost:5000${it.imageURL}`}
                      alt={it.name}
                      width="250"
                      height="250"
                    />
                    <p>{it.name}</p>
                    <p>{it.price} Eter</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ShopPage;
