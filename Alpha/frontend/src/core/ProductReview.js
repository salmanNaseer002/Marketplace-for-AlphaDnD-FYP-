// import React, {useEffect, useState } from 'react';
// import { Link, Redirect } from 'react-router-dom';
// import { isAuthenticated } from '../auth';
// import "../styles.css";
// import Rating from '../components/Rating';
// import { makeComment } from './apiCore';

// const ProductReview = ({
//   product,
  
  
// }) => {

  
//     const [rating, setRating] = useState(0);
//     const [comment, setComment] = useState([]);
//     const [error, setError] = useState(false);
//     const [success, setSuccess] = useState(false);
    

//     // destructure user and token from localstorage
//     const  user  = isAuthenticated() && isAuthenticated().user;
//     const token = isAuthenticated() && isAuthenticated().token;
// const userId = user._id;
// const productId = product._id;
// console.log(productId);
//     const handleChange = e => {
//         setError("");
//         setComment(e.target.value);
//     };
//     console.log("your token is here");
//     const clickSubmit = e => {
//         e.preventDefault();
//         setError("");
//         setSuccess(false);
//         // make request to api to create category
// console.log(productId);
//         makeComment(productId, token, userId,{
          
//           name: user.name,
//           rating: rating,
//           comment: comment,
//         }).then(data => {
//           console.log(data);
//             if (data.error) {
//                 setError(data.error);
//             } else {
//                 setError("");
//                 setSuccess(true);
//             }
//         });
//     };

    
//     const showSuccess = () => {
//       if (success) {
//           return <h3 className="text-success">{comment} is created</h3>;
//       }
//   };

//   const showError = () => {
//       if (error) {
//           return <h3 className="text-danger">{error}</h3>;
//       }
//   };

    
//   console.log(product.name);
//   return (
   
        

    
//     <div className="content-margined">
//       {showSuccess()}
//       {showError()}
//             <h2>Reviews</h2>
           
            
//             <ul className="review" id="reviews">
              
//               { product.reviews.map((review) => (
//                 <li key={review._id}>
//                   <div>{review.name}</div>
//                   <div>
//                     <Rating value={review.rating}></Rating>
//                   </div>
//                   <div>{review.createdAt.substring(0, 10)}</div>
//                   <div>{review.comment}</div>
//                 </li>
//               ))}
//               <li>
//                 <h3>Write a customer review</h3>
//                 {user ? (
//                   <form onSubmit={clickSubmit}>
//                     <ul className="form-container">
//                       <li>
//                         <label htmlFor="rating">Rating</label>
//                         <select
//                           name="rating"
//                           id="rating"
//                           value={rating}
//                           onChange={(e) => setRating(e.target.value)}
//                         >
//                           <option value="1">1- Poor</option>
//                           <option value="2">2- Fair</option>
//                           <option value="3">3- Good</option>
//                           <option value="4">4- Very Good</option>
//                           <option value="5">5- Excelent</option>
//                         </select>
//                       </li>
//                       <li>
//                         <label htmlFor="comment">Comment</label>
//                         <textarea
//                           name="comment"
//                           value={comment}
//                           onChange={handleChange}
                    
//                         ></textarea>
//                       </li>
//                       <li>
//                         <button type="submit" className="button primary">
//                           Submit
//                         </button>
//                       </li>
//                     </ul>
//                   </form>
//                 ) : (
//                   <div>
//                     Please <Link to="/signin">Sign-in</Link> to write a review.
//                   </div>
//                 )}
//               </li>
//             </ul>
//           </div>
//   );
// };

// export default ProductReview;