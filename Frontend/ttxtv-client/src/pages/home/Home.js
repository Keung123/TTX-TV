/** 
 * @file Home Page of the app
 */

 import React from 'react';
 import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

 import './Home.css';

 import bgimg from '../../res/assets/movienight.jpg';
 
 const bodyStyle = {
   position: "fixed",
   top: "0",
   width: "100%",
   height: "100%",
   backgroundSize: "cover",
   backgroundImage: "url(" + bgimg + ")",
   filter: "alpha(opacity=90)",
     opacity: "0.9",
   backgroundColor: "#000000" 
 }
 
 const titleStyle = {
     display: "block",
     marginTop: "20%",
     fontSize: "55",
     color: "#000000",
 }
 
 function Home() {
   return (
     <React.Fragment>

       <h1 style={titleStyle} className="bigtitle">Host Your Cloud Movie Night!</h1>
       <div style={bodyStyle}></div>

     </React.Fragment>
   );
 }
 
 export default Home;
 