import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import { addItem, updateItem, removeItem } from './cartHelpers';
import './Card.css'

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = f => f,
  run = undefined
  // changeCartSize
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = showViewProductButton => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-1">
          <button className="btn  mt-2 mb-2 card-btn-1 Card-viewButton border-rounded" ><span className="text-small">Preview</span> <i  className="ml-1 far fa-eye small eye"></i></button>
        </Link>
      )
    );
  };
  const addToCart = () => {
    // console.log('added');
    addItem(product, setRedirect(true));
  };

  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCartBtn = showAddToCartButton => {
    return (
      showAddToCartButton && (
        <button onClick={addToCart} style = {{ border :"0.1px solid yellowGreen" ,borderRadius:"2px", marginRight:"-10px"}} className="btn  mt-2 mb-2 card-btn-1 Card-addCart ">
         <i  className="fas fa-shopping-cart "></i>
        </button>
      )
    );
  };

  // const showStock = quantity => {
  //   return quantity > 0 ? (
  //     <span className="badge badge-primary badge-pill">In Stock </span>
  //   ) : (
  //     <span className="badge badge-primary badge-pill">Out of Stock </span>
  //   );
  // };

  const handleChange = productId => event => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  // const showCartUpdateOptions = cartUpdate => {
  //   return (
  //     cartUpdate && (
  //       <div>
  //         <div className="input-group mb-3">
  //           <div className="input-group-prepend">
  //             <span className="input-group-text">Adjust Quantity</span>
  //           </div>
  //           <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
  //         </div>
  //       </div>
  //     )
  //   );
  // };
  //{showCartUpdateOptions(cartUpdate)}
  const showRemoveButton = showRemoveProductButton => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          className="btn btn-outline-danger mt-2 mb-2 "
        >
          Remove Product
        </button>
      )
    );
  };
  return (
    <div className="card " style = {{ marginBottom :'30px',boxShadow:' 0 12px 12px rgba(0, 0, 0, 0.2 ), 0 12px 12px rgba(0, 0, 0, 0.2)'}}>
            <div className="card-body" style ={{alignItems : 'center',alignContent:'center',padding : '0px' }}>
        {shouldRedirect(redirect)}
        
        <div style ={{backgroundColor : '#fafafa',padding : '0.4px'}}>

        <div >
        <ShowImage  item={product} url="product" />
        </div>
        <Link to={`/product/${product._id}`}   style={{ color: '#454545' }}>
        <div style = {{height : '50px'}} className = 'Card-header mt-2'><span className="ml-3 " style = {{ color :'#4D4D4D',fontSize:"18px"}}>{product.name}</span></div>
        </Link>
        </div>
       

        <div style ={{padding : '10px'}} className="ml-2">
        
        <p style = {{marginBottom : '1px',color :'#454545'}} className="card-p "><span style = {{fontWeight : 'bold',fontSize : '25px',color:"yellowgreen"}}>${product.price}</span></p>
        <p style = {{marginBottom : '0px',color :'#454545',fontSize : '15px',fontWeight:"500"}}><span style = {{fontWeight : 'bold',fontSize : '15px'}}>Category : </span> {product.category && product.category.name}</p>

        <p style = {{marginBottom : '0px',color :'#454545' ,fontSize : '15px',fontWeight:"450"}}><span style = {{fontWeight : 'bold',fontSize : '15px'}}>Added on : </span>{moment(product.createdAt).fromNow()}</p>
        <p style = {{marginBottom : '1px',color :'#454545'}} className="card-p "><span style = {{fontWeight : 'bold',fontSize : '15px',color:"black"}}>Sales: {product.sold}</span></p>
       </div>
       
    <div className = 'Buttons'>
        {showViewButton(showViewProductButton)}

        {showAddToCartBtn(showAddToCartButton)}

        {showRemoveButton(showRemoveProductButton)}
        </div>
        
      </div>
    </div>
  );
};

export default Card;