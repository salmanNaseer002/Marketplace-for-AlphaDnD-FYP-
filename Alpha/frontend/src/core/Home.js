import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';
import Search from './Search';
import './Home.css'
const Home = () => {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);

    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsBySell(data);
            }
        });
    };

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            console.log(data);
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
            }
        });
    };

    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
    }, []);

    return (
        <Layout
            title="Marketplace For AlphaD&D"
            description="Marketplace for react themes and plugins made in AlphaD&D, which is a web based application, used to make themes and plugins by simply dragging and dropping options."
            className="container-fluid"
        >
            <Search />

            
            <div style= {{margin :'5%'}}>
            <h2 style= {{marginBottom :'20px'}} >New Arrivals</h2>
            <div className="row">
                {productsByArrival.map((product, i) => (
                    <div key={i} className="col-md-6 col-lg-4 col-xl-3">
                        <Card  product={product} />
                    </div>
                ))}
            </div>
            </div>
            <div style= {{margin :'5%'}}>
            <h2 style= {{marginBottom :'20px'}} >Best Sellers</h2>
            <div className="row">
                {productsBySell.map((product, i) => (
                   
                    <div key={i} className="col-md-6 col-lg-4 col-xl-3">
                        
                        <Card product={product} />
                    </div>
                ))}
            </div>
            </div>
        </Layout>
    );
};

export default Home;