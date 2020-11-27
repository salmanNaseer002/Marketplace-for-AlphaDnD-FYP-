import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getPurchaseHistory } from "./apiUser";
import moment from "moment";
import './Dashboard.css';
import Particles from '../admin/Particles';
import '../admin/Particle.css';

const Dashboard = () => {
    const [history, setHistory] = useState([]);

    const {
        user: { _id, name, email, role }
    } = isAuthenticated();
    const token = isAuthenticated().token;

    const init = (userId, token) => {
        getPurchaseHistory(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setHistory(data);
            }
        });
    };

    useEffect(() => {
        init(_id, token);
    }, []);

    const userLinks = () => {
        return (
            <div className="card mb-5">
                <h4 className="card-header User-header">User Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link User-link" to="/cart">
                            My Cart
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link User-link" to={`/profile/${_id}`}>
                            Update Profile
                        </Link>
                    </li>
                </ul>
            </div>
        );
    };

    const userInfo = () => {
        return (
            <div className="card mb-3">
                <h3 className="card-header User-header">User Information</h3>
                <ul className="list-group">
                    <li className="list-group-item User-link">{name}</li>
                    <li className="list-group-item User-link">{email}</li>
                    <li className="list-group-item User-link">
                        {role === 1 ? "Admin" : "Registered User"}
                    </li>
                </ul>
            </div>
        );
    };

    const purchaseHistory = history => {
        return (
            <div className="card mb-3">
                <h3 className="card-header User-header">Purchase history</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        {history.map((h, i) => {
                            return (
                                <div>
                                    <hr />
                                    {h.products.map((p, i) => {
                                        return (
                                            <div className= 'User-link' key={i}>
                                                <h6>Product name: {p.name}</h6>
                                                <h6>
                                                    Product price: ${p.price}
                                                </h6>
                                                <h6>
                                                    Purchased date:{" "}
                                                    {moment(
                                                        p.createdAt
                                                    ).fromNow()}
                                                </h6>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </li>
                </ul>
            </div>
        );
    };

    return (
        <div>
        <Layout
            title="MarketPlace For AlphaD&D."
            description='marketplace for react themes and plugins made in AlphaD&D, which is a web based application, used to make themes and plugins by simply dragging and dropping options.'
            className="container-fluid"
        />
<div style={{background:'#f5f9fc',height:'1200px'}}>
        <Particles height ='1200px'></Particles>
            <div style={{paddingTop:'5%'}}className ='container'>
            <div className="row">
                <div className="col-md-4">{userLinks()}</div>
                <div className="col-md-8">
                    {userInfo()}
                    {purchaseHistory(history)}
                </div>
            </div>
            </div>
            </div>
            </div>
    );
};

export default Dashboard;