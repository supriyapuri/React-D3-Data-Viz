import React from 'react';
import {Link} from 'react-router-dom';

export default class Home extends React.Component{

render(){
        return (
            <div>
        
            <p>
                
                <img className= "poster"  src= "https://i.insider.com/5ec2d9701918247c51728645?width=2000&format=jpeg&auto=webp" width="900" 
            height="500" />
            
                <a href= "https://scispeak.com/5-factors-for-choosing-an-airbnb/" ><h2 >New York Airbnb Rentals - Ranking Factors</h2></a>
                
                <ul>
                    <li> What factors affect the choice of Airbnb?</li>
                    <li> What can we learn about different hosts and areas?</li>
                    <li> Is there any noticeable difference of traffic among different areas and what could be the reason for it?</li>
                    <li> How can hosts use this data to improve user experience and increase income?</li>
                </ul> 
                <Link to ="/Dataset">
                <i className="material-icons">arrow_forward_ios</i>
                <i className="material-icons">arrow_forward_ios</i>
                </Link>
            
            </p > 
            <p align = "center">
            <text > Tip: Use the next arrow to go to the next page. <br/> </text>
            <text align = "center">  Click on the heading to "New York Airbnb Rentals" to read about interesting factors</text>
            </p>
            
        </div>
        )
    }
}