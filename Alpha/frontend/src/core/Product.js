import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { read, listRelated, makeComment } from './apiCore';
import Card from './Card';
//import ProductReview from './ProductReview';
import Rating from '../components/Rating';
import { isAuthenticated } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import './ViewProduct.css'


const Product = props => {
    console.log(props.match.params.productId);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [hereredirect, setHereRedirect] = useState(false);
    const [product, setProduct] = useState({});
    const [run, setRun] = useState(false);
    // destructure user and token from localstorage
    const  {user,token}  = isAuthenticated() && isAuthenticated()
    

    const [relatedProduct, setRelatedProduct] = useState([]);
    
    
    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(  data );
                // fetch related products
                listRelated(data._id).then(data => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setRelatedProduct(data);
                    }
                });
            }
        });
    };

    const handleChange = e => {
        setError("");
        setComment(e.target.value);
    };


    const clickSubmit = e => {
        e.preventDefault();
        setError("");
        setSuccess(false);
        setRun(false);
        // make request to api to create category
        makeComment(props.match.params.productId, user._id, token, {
          name: user.name,
          rating: rating,
          comment: comment,
        }).then(data => {
          console.log(data);
            if (data.error) {
                setError(data.error);
            } else {
              console.log(data);
                setError("");
                setSuccess(true);
                setRun(true);
                setHereRedirect(true);
                
                
            }
        });
    };
    //ShowDiv display div of description after 2 sec    
    function showdiv() {
      setTimeout(function () {
          document.getElementById("description").style.visibility = "visible";
      }, 2000);
  }
    

    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
        window.scrollTo(0, 0)
        return () => {
          //
        };
        
    }, [props, run]);

    
    const showSuccess = () => {
        if (success) {
            return <h3 className="text-success">Review Added</h3>;
        }
    };
  
    const showError = () => {
        if (error) {
            return <h3 className="text-danger">{error}</h3>;
        }
    };


    
    return (
      <div>
        <Layout
        title="MarketPlace For AlphaD&D."
        description='marketplace for react themes and plugins made in AlphaD&D, which is a web based application, used to make themes and plugins by simply dragging and dropping options.'
        className="container-fluid"
        />
          {/* //onLoad={showdiv} */}
          

        
      <div style ={{margin:'5%'}}> 
      
            <div className="row mt-2"  onLoad={showdiv}>
                <div className="col-lg-6 " style={{paddingLeft:"50px",paddingRight:"20px"}}>

                  <div style={{height:'30px'}} ></div>
                  {/* Product */}
                    {product && product.description && <Card product={product} showViewProductButton={false} />}
                   {/* Product Description */}
                    <div className="card hide" id="description" style={{marginTop:"-3.6%",borderTop:"solid white", paddingLeft:"10px"}}>
                      <span  style = {{ color :'#4D4D4D',fontSize:"30px",fontWeight:"bold",padding:'2%'}} className="card-title">Description</span>
                        <span style={{color :'#4D4D4D',fontSize:"20px",padding:'2%'}} className="mb-2">{product.description}</span>
                      </div>
                    {/* Review Comment Map Below */}
                    <h2 className="ml-2 mt-5">Reviews</h2>
                          <ul className="review " id="reviews" > 
                              { product && product.description && product.reviews.map((review) => (
                                <li key={review._id} className="mb-1" style={{marginLeft:"-5px"}}>
                                  <div className="card" style={{padding:'1%',width:"100%",backgroundColor:"#FAFAFA",boxShadow:"none"}}>
                                      <div className="h6 card-title ml-2 mt-1 mb-2 " style={{color:"#00719B"}}>
                                        {review.name}
                                      </div>
                                      <div className="form-inline border-bottom">
                                          <Rating value={review.rating}></Rating>
                                          <span className="text-muted ml-2">{review.createdAt.substring(0, 10)}</span>
                                      </div>
                                      <p className="card-text text-muted ml-2 mt-2 mb-2">{review.comment}</p>
                                  </div> 
                                </li>  
                              ))}
                            </ul>  
                 </div>
            
            <div className=' col-1'></div>

                <div className=" col-lg-4 ">
                <h4 style={{textAlign :'center',height:'30px',fontWeight:'600'}}>Related products</h4>
                    {relatedProduct.map((p, i) => (
                        <div className="mb-3 col-md-11" key={i}>
                            <Card product={p} />
                        </div>
                    ))}
                </div>
            </div>
            {console.log(product.name)}
             
            
            <div>
            {showSuccess()}
            { showError() }
          
             <ul className="review ml-4 " id="reviews">
                <li>
                  <h3 style={{fontWeight:'600'}} className='mt-3 mb-2'>Write a Customer Review</h3>
                  {user ? (
                    <form onSubmit={clickSubmit} style={{width:"40%"}}>
                      <div className="form-group ">                     
                          <label htmlFor="rating" className="mr-4  h6">Rating</label>
                          <select
                            className="form-control form-control-sm"
                            name="rating"
                            id="rating"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value="1">1- Poor</option>
                            <option value="2">2- Fair</option>
                            <option value="3">3- Good</option>
                            <option value="4">4- Very Good</option>
                            <option value="5">5- Excelent</option>
                          </select>
                        </div>
                        <div className="form-group ">
                          <label htmlFor="comment" className="mr-2  h6">Comment</label>
                          <textarea
                            name="comment"
                            value={comment}
                            onChange={handleChange}
                            className="form-control md-textarea row=3"
                          ></textarea>
                        </div>
                        
                        <button type="submit" className="btn btn-primary rounded"> 
                            Submit          
                        </button>
                        
                    </form>
                  ) : (
                    <div style={{fontWeight:'600'}}>
                      Please <Link to="/signin">Sign-in</Link> to write a review.
                    </div>
                  )}
                </li>
           </ul>
           </div>
            </div>
        </div>
    );
};

export default Product;