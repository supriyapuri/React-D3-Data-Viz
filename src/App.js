import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import Dataset from './Dataset';
import Home from './Home';
import About from './About';
import Pie from './Pie'


const Chart2 = (props) => {
  return(
    
    <div >
      <h1>chart2</h1>
      
       
      </div>
  )
}



const NotFound = () => <div> 404 Not Found </div>

function App() {


  return (
    
      <div>
        <Router>
        <head>
          <title>Restaurants Analysis</title>
          <script src="https://d3js.org/d3.v5.min.js"></script>
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons"rel="stylesheet"></link>
        </head>
        
        <div>
         {/* <Link to ="/"> <em>Home </em></Link> 
         
         <Link to ="/chart1"><em>  Chart1 </em> </Link>
         <Link to ="/chart2"><em>  chart2 </em> </Link>

         
         <hr /> */}
        
         </div>
        <Switch>
          <Route path ="/" exact component ={Home} />
          <Route exact path ="/Dataset" component= {Dataset} />
          <Route exact path ="/About" component= {About} />
          <Route path= "/chart1" component= {Pie}  />
          <Route exact path ="/chart2" component= {Chart2} />
          


          <Route path = "*" component ={NotFound} />
          
        </Switch>
      </Router>
      </div>
      
    
  );
}

export default App;



