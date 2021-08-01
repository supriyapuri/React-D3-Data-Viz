import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import Dataset from './Dataset';
import Home from './Home';
import About from './About';


const Chart2 = (props) => {
  return(
    
    <div >
      <h1>chart2</h1>
      
       
      </div>
  )
}

// const About= (props) => {
//   return(
    
//     <div >
//       <body style = {{backgroundImage: "url(" + "https://img.freepik.com/free-photo/empty-living-room-with-blue-sofa-plants-table-empty-white-wall-background-3d-rendering_41470-1778.jpg?size=626&ext=jpg&ga=GA1.2.2099647507.1627689600" + ")"}}>
//           <h2 style = {{textAlign: 'center'}}> About the Visualisation : to be updated</h2>
//           <p><h4>Hybrid Structure :</h4> This narrative visualization follows an interactive slideshow hybrid structure to guide users through various selected scenarios. Data for each slide has been pre-processed and aggregated separately offline.</p>

//           <p><h4>Scenes: </h4>Four scenes have been included in this visualization using consistent template and layout. Each slide can be navigated using arrows at left or right, or using the navigation dots on top. Or use keyboard left and right buttons.</p>

//           <p><h4>Annotations: </h4> Interesting trends are annotated using orange color font and box in chart 1, 2 and 3.</p>

//           <p><h4>Parameters:</h4> Chart 2 and 3 include filters to display data from selected type of data source. Chart 4 includes a checkbox to reveal / hide grid that covers on top of the map.</p>

//           <p><h4>Triggers:</h4> The animation of chart 3 and 4 will be triggered automatically when the scene / slide is displayed. Changing filter in chart 3 will also trigger the chart animation.</p>
        
      
      
//       </body> 
//     </div>
//   )
// }
const Chart1 = (props) => {
  return(
    
    <div >
      <h1>chart1</h1>
      
       {/* <a href= "https://en.wikipedia.org/wiki/Rick_and_Morty" ><h1>Time for Rick and Morty</h1></a>
      <img className= "poster" src=
      "https://cdn11.bigcommerce.com/s-1n8r405nxd/images/stencil/2000x2000/products/6104/10383/20364-1-Rick_Morty_Portal_Poster-Cheapest_Affordable_Online_Wholesale_Waterbedsnstuff__78431.1536271014.jpg?c=2" 
      alt="Rick and Morty poster"/> */}
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
          <Route path= "/chart1" component= {Chart1}  />
          <Route exact path ="/chart2" component= {Chart2} />
          


          <Route path = "*" component ={NotFound} />
          
        </Switch>
      </Router>
      </div>
      
    
  );
}

export default App;



