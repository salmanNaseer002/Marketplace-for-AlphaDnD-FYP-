import React from "react";
import Menu from "./Menu";
import "../styles.css";
import './Home.css';

const Layout = ({
    title = "Title",
    description = "Description",
    className,
    children
}) => (
    <div>
        
        <Menu />
        
       
        <div   style={{textAlign :'center',marginBottom:'0'}} className="jumbotron ">
            
            <h1  >{title}</h1>
            
            <p style={{width : '70%',margin :'auto'}} className="lead">{description}</p>
            
           
        </div>
        <div className={className}>{children}</div>
    </div>
);

export default Layout;
