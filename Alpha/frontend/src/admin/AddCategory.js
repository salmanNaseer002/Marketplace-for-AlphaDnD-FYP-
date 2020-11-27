import React, { useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createCategory } from "./apiAdmin";
import Particles from './Particles';
import './Particle.css';
import './AdminDashboard.css';


const AddCategory = () => {

    const style={
        root:{
            marginBottom:0
        }
    }
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    // destructure user and token from localstorage
    const { user, token } = isAuthenticated();

    const handleChange = e => {
        setError("");
        setName(e.target.value);
    };

    const clickSubmit = e => {
        e.preventDefault();
        setError("");
        setSuccess(false);
        // make request to api to create category
        createCategory(user._id, token, { name }).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setError("");
                setSuccess(true);
            }
        });
    };

    const newCategoryFom = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                
                <input 
               
                    type="text"
                    placeholder='Category Name'
                    className="form-control Category-input"
                    onChange={handleChange}
                    value={name}
                    autoFocus
                    required
                />
            </div>
            <button className='Category-btn' >Create Category</button>
        </form>
    );

    const showSuccess = () => {
        if (success) {
            return <div  className="isa_success">
       
               <h4 style={{ marginBottom:'0px'}}><i style={{marginRight:'15px'}}class="fa fa-check"></i>Category Created!!!</h4>
       </div>
            
        }
    };

    const showError = () => {
        if (error) {

            return (     <div class="isa_error">
            <i style={{marginRight:'15px'}} class="fa fa-times-circle"></i>
                    Category Should Be Unique!!!
            </div>);
            
           
        }
    };

    const goBack = () => (
        <div className="mt-5">
            <Link to="/admin/dashboard" className="Category-dashboardLink">
                Back to Dashboard
            </Link>
        </div>
    );

    return (
    <div>            
        <Layout 
        title="MarketPlace For AlphaD&D."
        description='marketplace for react themes and plugins made in AlphaD&D, which is a web based application, used to make themes and plugins by simply dragging and dropping options.'
        className="container-fluid"
        />    
        <div  >
        <Particles height = '470px' /> 
       
       <div style={{background:'#D6E7F5',height:'470px'}}>
          <div className='container'>
                    <div  className='row' >
<div style = {{margin:'15%',marginBottom:'0px'}} className='col-6'>
                            {showSuccess()}
                            {showError()}
                            {newCategoryFom()}
                            {goBack()} 
                            </div>
                    </div>
            </div>
            </div>
           
        </div>  
    </div>
    );
};

export default AddCategory;