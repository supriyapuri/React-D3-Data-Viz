import React, {useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import * as d3 from 'd3';
import data from './data/pie_data.js'

var viewportWidth  = document.documentElement.clientWidth;
var viewportHeight = document.documentElement.clientHeight;




const Pie = () => {

    const pieChart = useRef()

    useEffect(() => {
        // position for each data object
        const radius = 180;
        
        const piedata = d3.pie().value(d=> d.number_of_reviews)(data)


        // const data_ready = pie(d3.entries(data))

        //Set Arc
        const arc = d3.arc().innerRadius(0).outerRadius(radius)
        // const colors = d3.scaleOrdinal(['#004c6d', '#255e7e', '#3d708f', '#5383a1', '#6996b3', '#7faac6', '#94bed9', '#abd2ec', '#c1e7ff', '#c1e7eb', '#8C92AC', '#92A1CF', '#C4C3D0', '#CCCCFF', '#F8F8FF'])
        const colors = d3.scaleOrdinal(['#003f5c', '#2d4a7c', '#645090', '#9d4f95', '#d14e87', 'f6586b','#ff7644', '#ff9f00', '#ffd800', '#ffef00','#f4ca16','#ffe135','#fada5e', '#fbec5d', '#fdfd96', '#fffdd0',])

        const g = d3.select(pieChart.current)
                    .attr('width', viewportWidth)
                    .attr('height', viewportHeight/2)
                    .append('g')
                        .attr('transform', `translate(${viewportWidth/2},${viewportHeight/4})`)

        //Tooltip
        const tooldiv = d3.select('#chartArea')
                        .append('div')
                        .style('visibility', 'hidden')
                        .style('position', 'absolute')
                        .style('background-color', 'white')

        //  label
        // 
        const label = d3.arc().innerRadius(radius-90).outerRadius(radius)



        
        const pies = g.selectAll('.arc')
        .data(piedata)
        .enter()
        .append('g')
        .attr('class','arc')

        pies.append('path')
            .attr('d', arc)
            .attr('fill', (d,i) => colors (i))
            .attr('stroke', 'white')
            
            .on('mouseover', (e,d)=>{
                tooldiv.style('visibility', 'visible')
                        .text(`${d.data.host_name}` +' from '+`'${d.data.neighbourhood_group}'`+' has '+`'${d.data.number_of_properties}'`+' property'+ ' and ' + `'${d.data.number_of_reviews}'` + ' average reviews ')
                        //  .text('\n Number of Properties')
                        // .text('Neighbourhood'+`:${d.data.neighbourhood_group}`)
                        // .text('Average Reviews'+`:${d.data.number_of_reviews}`)


            })
            .on('mousemove',(e,d) => {
              tooldiv.style('top', (e.pageY -50) +'px')
                                   .style('left', (e.pageX -50) +'px') 
            })
            .on('mouseout',() => {
                            
                tooldiv.style('visibility', 'hidden')
            })


        pies.append('text')
            .attr('stroke', 'white')   
            .attr('transform', function(d){
                        return  `translate(${label.centroid(d)})`;
                    })
            .text(d => d.data.host_name)

        

    
    })
    
        return (

            <div id = 'chartArea'>
                <body>
                    <h1 align="center">Top 15 Airbnb Hosts based on reviews in New York Area</h1>
                    <h4 align="center">Tip : Hover over the Host name to see more details</h4>
                    <svg ref = {pieChart}></svg>

                    <p align="center">The airbnb reviews pay a huge role in booking of the rentals and the hosts try to
                    provide the best service to gain maximum reviews. More reviews means more guests and more income. </p>
                    <p align="center"><b> Dona from Queens have an average 600+ reviews from the two properties that she owns in Queens.</b> </p>

                        <Link to ="/barchart">
                                <i className="material-icons" style = {{color : "black", float :"right"}}>arrow_forward_ios</i>
                                <i className="material-icons"style = {{color : "black", float :"right"}}>arrow_forward_ios</i>
                            </Link>

                            <Link to ="/About">
                                <i className="material-icons" style = {{color : "black", float :"left"}}>arrow_back_ios</i>
                                <i className="material-icons"style = {{color : "black", float :"left"}}>arrow_back_ios</i>
                        </Link>
                    
                </body>
            </div>

        )
    
}

export default Pie;