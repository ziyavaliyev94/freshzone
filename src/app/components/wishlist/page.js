"use client";

import { useEffect, useState } from "react";
import "./wishlist.css";

const Page = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const result = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(result);
  }, []);

  const handleDelete = (id) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <section className="wishlist">
      {wishlist &&
        wishlist.map((item) => (
          <div key={item.id} className="wishlistCard">
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
        ))}
    </section>
  );
};

export default Page;
