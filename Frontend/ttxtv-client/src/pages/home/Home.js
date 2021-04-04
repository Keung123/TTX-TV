/** 
 * @file Home Page of the app
 */

 import React from 'react';
 import {
    Col,
    Container,
    Row
} from 'react-bootstrap';

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
   opacity: "0.90",
   color: "#000000" 
 }
 
 function Home() {
   return (
     <React.Fragment>
        <header style={bodyStyle}></header>
        <Container fluid>
        <h1 className="bigtitle">Host Your Cloud Movie Night!</h1>
        </Container>
       
       


     </React.Fragment>
   );
 }
 
 export default Home;
 