import React from 'react';
import {Link} from 'react-router-dom';

export default class Dataset extends React.Component{

render(){
        return (
            <div >
        <body className =  "dataset">
            
            <h2 style = {{textAlign: 'center'}}> About the Dataset</h2>
            {/* <img style= {{alignItems: 'center', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} src= "https://p.kindpng.com/picc/s/132-1322163_air-bnb-png-airbnb-logo-transparent-png.png" width="900" 
            height="500" /> */}
            <p>
            
                <h4>Overview: </h4>
                <p>Through this dataset , I have analysed the Airbnb data for NewYork City, USA in order to understand how various factors
                influence the choice of the properties for the guests. Similarly, this dataset can help in finding out how hosts can determine the price of the rentals 
                and what modifications do they need to make so as to gain more monetary benefits.</p>
                
                <h4>Why do we want to look at Airbnb data? </h4>
                <p>Since 2008, guests and hosts have used Airbnb to expand on traveling possibilities and present more unique, personalized way of experiencing the world. Airbnb has presented 
                a more unique, personalized way of experiencing the world in a budget friendly manner and also a great source of income for those who love hosting and making friends. </p>

                <h4> Dataset: </h4>
                <p>This dataset describes the listing activity and metrics in NYC, NY for 2019. This public dataset is part of Airbnb, and the original source can be found on this website.</p>
                
            </p>
            <a href= "https://www.kaggle.com/dgomonov/new-york-city-airbnb-open-data/" ><h5>Dataset Source : <u style={{color:'blue'}}>"https://www.kaggle.com/dgomonov/new-york-city-airbnb-open-data/"</u> </h5></a> 
            <a href= "https://www.kaggle.com/dgomonov/new-york-city-airbnb-open-data?select=AB_NYC_2019.csv/" ><h5>Dataset CSV: <u style={{color:'blue'}}>"https://www.kaggle.com/dgomonov/new-york-city-airbnb-open-data?select=AB_NYC_2019.csv/"</u> </h5></a> 

            <Link to ="/About">
            <i className="material-icons" style = {{color : "black", float :"right"}}>arrow_forward_ios</i>
            <i className="material-icons"style = {{color : "black", float :"right"}}>arrow_forward_ios</i>
            </Link>

            <Link to ="/">
            <i className="material-icons" style = {{color : "black", float :"left"}}>arrow_back_ios</i>
            <i className="material-icons"style = {{color : "black", float :"left"}}>arrow_back_ios</i>
            </Link>
            
        
        
        </body> 
        </div>
        )
    }
}
