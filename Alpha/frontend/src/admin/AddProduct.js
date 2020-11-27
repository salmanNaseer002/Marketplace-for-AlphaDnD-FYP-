import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { createProduct, getCategories } from './apiAdmin';
import './AdminDashboard.css';
import Particles from './Particles';
import './Particle.css';

const AddProduct = () => {
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        
        
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    });

    const { user, token } = isAuthenticated();
    const {
        name,
        description,
        price,
        categories,
        
        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values;

    // load categories and set form data
    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    categories: data,
                    formData: new FormData()
                });
            }
        });
    };

    useEffect(() => {
        init();
    }, []);

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });

        createProduct(user._id, token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: '',
                    description: '',
                    photo: '',
                    price: '',
                    
                    loading: false,
                    createdProduct: data.name
                });
            }
        });
    };

       const newPostForm = () => (
        <form style={{fontWeight:'700'}} className="mb-3" onSubmit={clickSubmit}>
            
            <div style={{display:'block'}} className="form-group">
                <label style={{display:'flex'}} className="btn btn-secondary">
                <h4 style={{marginRight:'30px'}} >Post Photo</h4> <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />
                </label>
            </div>

            <div className="form-group">
               
                <input onChange={handleChange('name')} placeholder='Name' type="text" className="form-control Category-input" value={name} />
            </div>

            <div className="form-group">
             
                <textarea onChange={handleChange('description')}placeholder='Description' className="form-control Category-input" value={description} />
            </div>

            <div className="form-group">
               
                <input onChange={handleChange('price')} type="number" placeholder='Price'className="form-control Category-input" value={price} />
            </div>

            <div className="form-group">
                <select  style = {{backgroundColor:'#d6e7f5'}} onChange={handleChange('category')} className="form-control">
                    <option>Category</option>
                    {categories &&
                        categories.map((c, i) => (
                            <option key={i} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                </select>
            </div>

         

         

            <button className="btn Category-btn">Create Product</button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdProduct ? '' : 'none' }}>
            <h2>{`${createdProduct}`} is created!</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );

    return (
        <div>
        <Layout 
        title="MarketPlace For AlphaD&D."
        description='marketplace for react themes and plugins made in AlphaD&D, which is a web based application, used to make themes and plugins by simply dragging and dropping options.'
        className="container-fluid"/>
        
       
        <div style={{background:'#d6e7f5'}}>
        <Particles height='440px'/>
             <div style={{paddingTop :'6%',paddingBottom:'6%'}} className = 'container'>
             <div  className="row">
               
               <div className="col-md-8 offset-md-2">
                   {showLoading()}
                   {showSuccess()}
                   {showError()}
                   {newPostForm()}
               </div>
           </div>
</div>
       
        
        </div>
        </div>
    );
};

export default AddProduct;