import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import './Dashboard.css';
import '../admin/Particles';
import Particles from '../admin/Particles';
import '../admin/Particle.css';
const AdminDashboard = () => {
    const {
        user: { _id, name, email, role }
    } = isAuthenticated();

    const adminLinks = () => {
        return (
            <div className="card mb-5">
                <h4 className="card-header User-header">Admin Links</h4>
                <ul   className="list-group">
                    <li  className="list-group-item User-link Link-background">
                        <Link className="nav-link" to="/create/category">
                            Create Category
                        </Link>
                    </li>
                    <li className="list-group-item User-link Link-background">
                        <Link className="nav-link" to="/create/product">
                            Create Product
                        </Link>
                    </li>
                    <li className="list-group-item User-link Link-background">
                        <Link className="nav-link" to="/admin/orders">
                            View Orders
                        </Link>
                    </li>
                    <li className="list-group-item User-link Link-background">
                        <Link className="nav-link" to="/admin/products">
                            Manage Products
                        </Link>
                    </li>
                    <li className="list-group-item User-link">
                        <Link className="nav-link" to="/admin/categories">
                            Manage Categories
                        </Link>
                    </li>
                </ul>
            </div>

        );
    };

    const adminInfo = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header User-header">User Information</h3>
                <ul className="list-group">
                    <li className="list-group-item User-link Link-background">{name}</li>
                    <li className="list-group-item User-link Link-background">{email}</li>
                    <li className="list-group-item User-link Link-background">
                        {role === 1 ? "Admin" : "Registered User"}
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
            <div>

            
        <div style={{minHeight:'500px',marginBottom:'0',background:'#D6E7F5'}} >
            <Particles height ='500px'></Particles>
            <div  style={{margin : '50px',marginTop:'0px'}}  className=" row">
                
                <div  style={{marginTop : '50px'}} className="col-md-4">{adminLinks()}</div>
                <div  style={{marginTop : '50px'}} className="col-md-8">{adminInfo()}</div>
            </div>
            </div>
            
            </div>
            </div>
       
    );
};

export default AdminDashboard;
