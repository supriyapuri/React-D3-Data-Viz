import React from 'react';
import {Link} from 'react-router-dom';

export default class About extends React.Component{

render(){
        return (
            <div className = "visualisation">
                <body>
                    <h2 style = {{textAlign: 'center'}}> About the Visualisation</h2>
                    <p><h4>Hybrid Structure :</h4> This narrative visualization follows an interactive slideshow hybrid structure to guide users through various selected scenarios. Data for each slide has been pre-processed and aggregated separately offline.</p>

                    <p><h4>Scenes: </h4>Three scenes have been included in this visualization using consistent template and layout. Each slide can be navigated using arrows at left or right. Each page's url changes as you navigate so the page can be accessed directly too.</p>

                    <p><h4>Annotations: </h4> Every visualisation includes a tooltip which explains the data used and the tips on the page tell how can the annotations be viewed.</p>

                    <p><h4>Parameters:</h4> The second chart, `The Bar Chart` includes filters to display data from selected type of data source.  </p>

                    
                    
                    <Link to ="/bubble">
                        <i className="material-icons" style = {{color : "black", float :"right"}}>arrow_forward_ios</i>
                        <i className="material-icons"style = {{color : "black", float :"right"}}>arrow_forward_ios</i>
                    </Link>

                    <Link to ="/Dataset">
                        <i className="material-icons" style = {{color : "black", float :"left"}}>arrow_back_ios</i>
                        <i className="material-icons"style = {{color : "black", float :"left"}}>arrow_back_ios</i>
                    </Link>
            
                </body> 
            </div>
        )
 }
}