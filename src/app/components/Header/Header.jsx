import React from 'react'
import "./header.css"
import { RiShoppingBasketLine } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import Link from 'next/link';

const Header = () => {
    return (
        <header>
            <div className="headCountainer">
                <Link href={"/"}>
                    <div className="logo">
                        <img src="https://templatemo.com/templates/templatemo_348_fresh_zone/images/templatemo_logo.png" alt="" />
                    </div>
                </Link>
                <nav>
                    <ul>
                        <li className='home'><a href="">Home</a></li>
                        <li><a href="">About</a></li>
                        <li><a href="">Galery</a></li>
                        <li><a href="">Blog</a></li>
                        <li><a href="">Contact</a></li>
                        <Link href="/components/wishlist"><FaRegHeart className='fa' /></Link>
                        <Link href="/components/basket"><RiShoppingBasketLine className='ri' /></Link>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header