import React, {useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import * as d3 from 'd3';
// import data from './data/barchart_data.js';

const neighborhoodData = [ 
    {neighbourhood_group: 'Bronx', total_properties: 1091, Private_room: 652,Entire_home : 379,Shared_room:60, average_price: 87.496, average_review: 26},
    {neighbourhood_group: 'Brooklyn',total_properties: 20104,Private_room :10132,Entire_home : 9559,Shared_room:413,average_price:124.38,average_review: 24.2},
    {neighbourhood_group: 'Manhattan',total_properties: 21661, Private_room: 7982,Entire_home : 13199,Shared_room:480,average_price:196.87,average_review: 20.985},
    {neighbourhood_group:'Queens',total_properties: 5666,Private_room: 3372,Entire_home :  2096,Shared_room:198,average_price:99.52,average_review: 27.7},
    {neighbourhood_group:'Staten Island',total_properties: 373,Private_room: 188, Entire_home : 176,Shared_room:9,average_price:114.81,average_review: 30.94}
       
   ]

var viewportWidth  = document.documentElement.clientWidth;
var viewportHeight = document.documentElement.clientHeight;


const BarChart = () => {
    const barChart = useRef()

    useEffect(() => {
        const margin  = {top: 50, right : 30, bottom:30 , left : 60}
        const chartwidth = viewportWidth/2;
        const chartheight = viewportHeight/2 -margin.top - margin.bottom;

        let selectedData = neighborhoodData;
        

        const chartContainer = d3.select(barChart.current)
                      .attr('width', chartwidth +margin.left+margin.right)
                      .attr('height', chartheight +margin.top+margin.bottom)


        const x = d3.scaleBand()
                 .range([margin.left, chartwidth - margin.right])
                 .padding(0.1)

        const max = d3.max(neighborhoodData, function(d){return d.total_properties});

        const y = d3.scaleLinear()
                    .range([chartheight, margin.top])

        x.domain(neighborhoodData.map((d) => d.neighbourhood_group));
        y.domain([0,max +100])

        
        const chart = chartContainer.append('g');

        chart.append('g').call(d3.axisBottom(x).tickSizeOuter(0))
             .attr('transform', `translate(0, ${chartheight})`)
             .attr('color', 'black')
             .style('font-size', 'x-large');
            
        function renderChart(){
            chart.selectAll('bar')
            .data(selectedData, data => data.neighbourhood_group)
            .enter()
            .append('rect')
            .classed('bar', true)
            .attr('fill', 'red')
            .attr('width', x.bandwidth())
            .attr('height',(data) => chartheight - y(data.total_properties))
            .attr('x', (data) => x(data.neighbourhood_group))
            .attr('y', (data) => y(data.total_properties))

            chart.selectAll('.bar').data(selectedData, data => data.neighbourhood_group).exit().remove();


            chart.selectAll('.label')
                .data(selectedData, data => data.neighbourhood_group)
                .enter() 
                .append('text') 
                .style('font-size', 'large')
                .style('font-weight', 'bold')
                .text((data) => data.total_properties) 
                .attr('x', (data) => x(data.neighbourhood_group)+  x.bandwidth()/2 )
                .attr('y', (data) => y(data.total_properties) - 20 ) 
                .attr('text-anchor', 'middle')
                .classed('label', true)
            
           chart.selectAll('.label')
                .data(selectedData, data => data.neighbourhood_group)
                .exit()
                .remove();

          }

            
    renderChart();

    let unselectedIds = [];

    const listItems  = d3
            .select('#data')
            .select('ul')
            .selectAll('li')
            .data(neighborhoodData)
            .enter()
            .append('li')

    listItems.append('span').text((data) => data.neighbourhood_group);

    listItems
        .append('input')
        .attr('type', 'checkbox')
        .attr('checked', true)
        .on('change', (event, data) => {
            
            if (unselectedIds.indexOf(data.neighbourhood_group)===-1){
                unselectedIds.push(data.neighbourhood_group)
            } else{
                unselectedIds = unselectedIds.filter((id) => id !== data.neighbourhood_group);
            }
            console.log(unselectedIds)

            selectedData = neighborhoodData.filter(
                (d) => unselectedIds.indexOf(d.neighbourhood_group)=== -1
            );

            renderChart();
    });

        
    })     



    return (
    
      
      <div>
          <body>
            <h2 align = "center"> Total no of properties in every NewYork Neighbourhood</h2>
            <h4 align="center">Tip : Select the checkbox to see the specific neighbourhood</h4>

            <div>
                <div id = 'chartArea'>
                    <svg ref = {barChart}></svg>
                </div>
                <div id = 'data'>
                    <ul></ul>
                </div>
            </div>

            <p align="center">Manhattan and Brooklyn areas have the maximum rentals </p>
                    
           
            <Link to ="/">
                <i className="material-icons" style = {{color : "black", float :"right"}}>arrow_forward_ios</i>
                <i className="material-icons"style = {{color : "black", float :"right"}}>arrow_forward_ios</i>
                </Link>

                <Link to ="/pie">
                <i className="material-icons" style = {{color : "black", float :"left"}}>arrow_back_ios</i>
                <i className="material-icons"style = {{color : "black", float :"left"}}>arrow_back_ios</i>
                </Link>
          </body>
    </div>
    )
  }


  export default BarChart;
