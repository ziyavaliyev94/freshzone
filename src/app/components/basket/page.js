"use client";
import React, { useEffect, useState } from 'react';
import "./basket.css";

const Page = () => {

  const [card, setCard] = useState([]);

  useEffect(() => {
    const result = JSON.parse(localStorage.getItem("cart")) || [];
    setCard(result);
  }, []);

  // Silmək funksiyası
  const handleDelete = (id) => {
    const updatedCart = card.filter((item) => item.id !== id);
    setCard(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Yerli yaddaşı yenilə
  };

  return (
    <section className='basket'>
      {
        card && card.map((item) => (
          <div key={item.id} className="basketCard">
            <div className="itemImage">
              <img src={item.image} alt={item.title} />
              <button
                className="deleteButton"
                onClick={() => handleDelete(item.id)}
              >
                🗑️
              </button>
            </div>
            <h1 className="itemTitle">{item.title}</h1>
            <p className="itemDescription">{item.description}</p>
            <h2 className="itemPrice">${item.price}</h2>
            <span className="itemCategory">{item.category}</span>
          </div>
        ))
      }
    </section>
  );
};

export default Page;
