import React from "react";
import { API } from "../config";

const ShowImage = ({ item, url }) => (
    <div >
        <img style ={{width :'100%',height:'17vw',objectFit:'cover'}} className = 'img-fluid'
            src={`${API}/${url}/photo/${item._id}`}
            alt={item.name}
           
            
        />
    </div>
);

export default ShowImage;