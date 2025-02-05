"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { use } from "react";
import "./detail.css";

const Detail = ({ params }) => {
    const unwrappedParams = use(params);
    const { id } = unwrappedParams;

    const [data, setData] = useState([]);

    const getApi = async () => {
        try {
            const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
            setData(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getApi();
    }, []);

    return (
        <>
            {data && (
                <div className="detailContainer">
                    <div className="productImage">
                        <img src={data.image} alt="" />
                    </div>
                    <div className="productInfo">
                        <h1>{data.title}</h1>
                        <h3>{data.description}</h3>
                        <h2>{data.price}</h2>
                    </div>
                </div>
            )}
        </>
    );
};

export default Detail;
