import React from 'react';
import {Link} from 'react-router-dom';

export default class About extends React.Component{

render(){
        return (
            <div className = "visualisation">
                <body>
                    <h2 style = {{textAlign: 'center'}}> About the Visualisation : to be updated</h2>
                    <p><h4>Hybrid Structure :</h4> This narrative visualization follows an interactive slideshow hybrid structure to guide users through various selected scenarios. Data for each slide has been pre-processed and aggregated separately offline.</p>

                    <p><h4>Scenes: </h4>Four scenes have been included in this visualization using consistent template and layout. Each slide can be navigated using arrows at left or right, or using the navigation dots on top. Or use keyboard left and right buttons.</p>

                    <p><h4>Annotations: </h4> Interesting trends are annotated using orange color font and box in chart 1, 2 and 3.</p>

                    <p><h4>Parameters:</h4> Chart 2 and 3 include filters to display data from selected type of data source. Chart 4 includes a checkbox to reveal / hide grid that covers on top of the map.</p>

                    <p><h4>Triggers:</h4> The animation of chart 3 and 4 will be triggered automatically when the scene / slide is displayed. Changing filter in chart 3 will also trigger the chart animation.</p>
                    
                    <Link to ="/Chart1">
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