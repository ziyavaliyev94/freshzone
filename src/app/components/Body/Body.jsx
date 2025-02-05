"use client";
import React, { useEffect, useState } from "react";
import "./body.css";
import axios from "axios";
import Link from "next/link";
import { RiShoppingBasketLine } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";

const Body = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [card, setCard] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("");

  const addToWishlist = (product) => {
    const food = wishlist.some((item) => item.id === product.id);
    if (!food) {
      const updatewish = [...wishlist, product];
      localStorage.setItem("wishlist", JSON.stringify(updatewish));
      setWishlist(updatewish);
      alert(`${product.title} wishliste elave olundu`);
    } else {
      alert(`${product.title} artiq wishlistde movcuddur`);
    }
  };

  const addToCard = (product) => {
    const foods = card.some((item) => item.id === product.id);
    if (!foods) {
      const updateCard = [...card, product];
      localStorage.setItem("cart", JSON.stringify(updateCard));
      setCard(updateCard);
      alert(`${product.title} sebete elave olundu`);
    } else {
      alert(`${product.title} artiq sebetde movcuddur`);
    }
  };

  useEffect(() => {
    const getApi = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://fakestoreapi.com/products");
        setData(res.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    getApi();
  }, []);

  if (loading)
    return (
      <img
        className="loading"
        src="https://i.pinimg.com/originals/b6/52/46/b6524696cbd3ef85969e1216b28285e7.gif"
        alt="loading"
      />
    );
  if (error) return <h3>Xeta bash verdi</h3>;
  const filteredData = data.filter((item) =>
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = filteredData.sort((a, b) => {
    if (sortType === "az") {
      return a.category.localeCompare(b.category);
    } else if (sortType === "za") {
      return b.category.localeCompare(a.category);
    } else if (sortType === "low-to-high") {
      return a.price - b.price;
    } else if (sortType === "high-to-low") {
      return b.price - a.price;
    }
    return 0;
  });

  return (
    <main>
      <section className="first">
        <div className="firstSecContainer">
          <div className="contextImg">
            <img
              src="https://png.pngtree.com/png-vector/20240708/ourmid/pngtree-fresh-vegetables-with-wicker-basket-png-image_13008114.png"
              alt=""
            />
          </div>
          <div className="about">
            <h1>Lorem, ipsum dolor.</h1>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt
              voluptatibus iure veniam distinctio labore! Nihil, asperiores
              aliquid facere, laboriosam ipsa rem cupiditate iure aspernatur
              eligendi vero consequuntur architecto voluptatum!
            </p>
          </div>
        </div>
      </section>
      <section className="second">
        <h1>Food Galery</h1>
        <div className="filterPanel">
          <input
            type="text"
            placeholder="Axtar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select onChange={(e) => setSortType(e.target.value)} value={sortType}>
            <option value="">Filter</option>
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
            <option value="low-to-high">Ucuzdan - Bahaya</option>
            <option value="high-to-low">Bahadan - Ucuza</option>
          </select>
        </div>

        <div className="secondSecContainer">
          <div className="cards">
            {sortedData.map((item) => (
              <div className="card" key={item.id}>
                <div className="image">
                  <img src={item.image} alt="item image" />
                </div>
                <div className="content">
                  <span>
                    <Link href={`/detail/${item.id}`}>
                      <h3>{item.category}</h3>
                    </Link>
                  </span>
                  <p>Price: {item.price}$</p>
                </div>
                <RiShoppingBasketLine
                  className="basketIcon"
                  onClick={() => addToCard(item)}
                />
                <FaRegHeart
                  className="heart"
                  onClick={() => addToWishlist(item)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Body;
