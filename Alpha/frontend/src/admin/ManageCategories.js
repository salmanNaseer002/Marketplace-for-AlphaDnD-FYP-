import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getCategories } from "./apiAdmin";

const ManageCategories = () => {
    const [categories, setCategories] = useState([]);

    const { user, token } = isAuthenticated();

    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                console.log(data);
                setCategories(data);
            }
        });
    };

    

    useEffect(() => {
        loadCategories();
    }, []);

    return (
        <Layout
        title="MarketPlace For AlphaD&D."
        description='marketplace for react themes and plugins made in AlphaD&D, which is a web based application, used to make themes and plugins by simply dragging and dropping options.'
        className="container-fluid"
        >
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center">
                        Total {categories.length} categories
                    </h2>
                    <hr />
                    <ul className="list-group">
                        {categories.map((c, i) => (
                            <li
                                key={i}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                <strong>{c.name}</strong>
                                <Link to={`/admin/category/update/${c._id}`}>
                                    <span className="badge badge-warning badge-pill">
                                        Update
                                    </span>
                                </Link>
                                
                            </li>
                        ))}
                    </ul>
                    <br />
                </div>
            </div>
        </Layout>
    );
};

export default ManageCategories;