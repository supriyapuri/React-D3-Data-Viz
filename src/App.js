import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Dataset from './Components/Dataset';
import Home from './Components/Home';
import About from './Components/About';
import Pie from './Components/Pie';
import BarChart from './Components/Bar_chart';
import Bubble from './Components/Bubble';




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
         
         </div>
        <Switch>
          <Route path ="/" exact component ={Home} />
          <Route exact path ="/Dataset" component= {Dataset} />
          <Route exact path ="/About" component= {About} />
          <Route path= "/pie" component= {Pie}  />
          <Route exact path ="/barchart" component= {BarChart} />
          <Route path= "/bubble" component= {Bubble}  />

          <Route path = "*" component ={NotFound} />
          
        </Switch>
      </Router>
      </div>
      
    
  );
}

export default App;



