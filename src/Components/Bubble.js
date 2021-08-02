import React, {useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import * as d3 from 'd3';
import neighborhoodBubbleData from './data/all_neighbourhood_details';

const Bubble = () => {
    const bubble = useRef();

    useEffect(() => {
        let bubbles = null;

        function ngGroupPosX(d) {
            return ngCenters[d.neighbourhood_group].x;
          }
        
          function ngGroupPosY(d) {
            return ngCenters[d.neighbourhood_group].y;
          } 

          // tooltip for mouseover functionality
        // let tooltip = floatingTooltip('gates_tooltip', 240);

        //Tooltip
        const tooldiv = d3.select('#vis')
                        .append('div')
                        .style('visibility', 'hidden')
                        .style('position', 'absolute')
                        .style('background-color', 'white')


        function setupButtons() {
            d3.select('#toolbar')
              .selectAll('.button')
              .on('click', function () {
                // Remove active class from all buttons
                d3.selectAll('.button').classed('active', false);
                // Find the button just clicked
                let button = d3.select(this);
          
                // Set it as the active button
                button.classed('active', true);
          
                // Get the id of the button
                let buttonId = button.attr('id');
          
                // Toggle the bubble chart based on
                // the currently clicked button.
                toggleDisplay(buttonId);
              });
          }

        setupButtons();

        function showTitles(title, titleClass) {
            let titleData = Object.keys(title);
            let titles = bubble_svg.selectAll('.'+titleClass)
              .data(titleData);
        
            console.log(titleData);
            titles.enter().append('text')
              .attr('class', titleClass)
              .attr('x', function (d) { console.log('xxx', title[d]); return title[d].x; })
              .attr('y', function (d) { return title[d].y; })
              .attr('text-anchor', 'middle')
              .style('color', 'white')
              .text(d => d); 
          }

          function hideTitles(title) {
            bubble_svg.selectAll(title).remove();
          }

        function charge(d) {
            return -Math.pow(d.radius, 2.0) * forceStrength;
          }

        function ticked() {
            bubbles
              .attr('cx', function (d) { return d.x; })
              .attr('cy', function (d) { return d.y; });
          }

        function groupBubbles() {
        hideTitles('.ng_groups');
        
       
    
        // @v4 Reset the 'x' and 'y' force to draw the bubbles to the center.
        simulation.force('x', d3.forceX().strength(forceStrength).x(center.x));
        simulation.force('y', d3.forceY().strength(forceStrength).y(center.y));
    
        // @v4 We can reset the alpha value and restart the simulation
        simulation.alpha(1).restart();
        }

        function splitBubbles() {
            showTitles(ngTitle, 'ng_groups');
        
            // @v4 Reset the 'x' force to draw the bubbles to their year centers
            simulation.force('x', d3.forceX().strength(forceStrength).x(ngGroupPosX));
            simulation.force('y', d3.forceY().strength(forceStrength).y(ngGroupPosY));
        
            // @v4 We can reset the alpha value and restart the simulation
            simulation.alpha(1).restart();
          }
        
        const bubbleChart = () => {
        let nodes = neighborhoodBubbleData.map(function (d) {
            return {
              id: d.neighbourhood,
              radius: radiusScale(+d.avg_reviews),
              reviews: +d.avg_reviews,
              price: +d.price,
              name: d.neighbourhood,
              propertyCount: d.count,
              neighbourhood_group: d.neighbourhood_group,
              x: Math.random() * 900,
              y: Math.random() * 800
            };
          });
      
          // sort them to prevent occlusion of smaller nodes.
          nodes.sort(function (a, b) { return b.reviews - a.reviews; });
          
          bubbles = bubble_svg.selectAll('.bubble')
          .data(nodes, function (d) { return d.id; });

        


          const bubblesE = bubbles.enter().append('circle')
          .classed('bubble', true)
          .attr('r', 0)
          .attr('fill', function (d) { return fillColor(d.neighbourhood_group); })
          .attr('stroke', function (d) { return d3.rgb(fillColor(d.neighbourhood_group)).darker(); })
          .attr('stroke-width', 2)
          .attr("transform", `translate(${width/12},${height/12})`)
          .attr('cx', (d)=> (d.x))
          .attr('cy', (d) => (d.y))
          .on('mouseover', (e,d)=>{
            tooldiv.style('visibility', 'visible')
                    .text(`Average rental price in ${d.name}, ${d.neighbourhood_group} is $${Math.round(d.price)} per ${Math.round(d.reviews)} reviews`)
                    


        })
        .on('mousemove',(e,d) => {
          tooldiv.style('top', (e.pageY -50) +'px')
                               .style('left', (e.pageX -50) +'px') 
        })
        .on('mouseout',() => {
                        
            tooldiv.style('visibility', 'hidden')
        }) 
        

          bubbles = bubbles.merge(bubblesE);

          bubbles.transition()
          .duration(2000)
          .attr('r', function (d) { return d.radius; });

          simulation.nodes(nodes);
          groupBubbles();
        }

        const toggleDisplay = function (displayName) {
            if (displayName === 'ng_groups') {
              splitBubbles();
            }else {
              groupBubbles();
            }
          };
        

        console.log(neighborhoodBubbleData);
        // Constants for sizing
        // const width = document.documentElement.clientWidth/2;;
        // const height = document.documentElement.clientHeight/1.25;
        const width = 850;
        const height = 750;

        // Locations to move bubbles towards, depending
        // on which view mode is selected.
        let center = { x: width / 2, y: height / 2 };

        let ngCenters = {
        Bronx: { x: 3 * width / 16, y: height / 3 },
        Brooklyn: { x: width / 3, y: 2* height / 3 },
        Manhattan: { x: 3 * width / 8, y: height / 3 },
        Queens: { x: width / 2, y: 2* height / 3 },
        StatenIsland: { x: 5 * width / 8, y: height / 3 },
        }

        let ngTitle = {
            Bronx: { x: 2 * width / 10, y: height / 8 },
            Brooklyn: { x: 10 * width / 40, y: 9 * height / 14 },
            Manhattan: { x: 8 * width / 20, y: height / 8 },
            Queens: { x:  3 * width / 4, y: 9 * height / 14 },
            StatenIsland: { x: 15 * width / 20, y: height / 8 },
        }

        const bubble_svg = d3.select('#vis')
          .append('svg')
          .attr('id', 'bubble_svg')
          .attr('width', width)
          .attr('height', height);

        let forceStrength = 0.03;

        let simulation = d3.forceSimulation()
        .velocityDecay(0.2)
        .force('x', d3.forceX().strength(forceStrength).x(center.x))
        .force('y', d3.forceY().strength(forceStrength).y(center.y))
        .force('charge', d3.forceManyBody().strength(charge))
        .on('tick', ticked);

        simulation.stop();


        let fillColor = d3.scaleOrdinal(d3.schemePastel1)
                            .domain(['Bronx', 'Brooklyn', 'Manhattan', 'Queens', 'StatenIsland']);

        //TODO: wrap in function                    
        let maxAmount = d3.max(neighborhoodBubbleData, function (d) { return +d.avg_reviews; });

        console.log(maxAmount);

        let radiusScale = d3.scalePow()
        .exponent(0.5)
        .range([2, 35])
        .domain([0, maxAmount]);

        console.log(radiusScale);
        bubbleChart();

    }, [])


    return(
    <body>
	<div class="section" id="background_bw">
		<div id="bubble_title"><h2 align = "center" style ={{color :'white'}}>Overview of All Reviewed Airbnb in New York City</h2 ></div>
		<div id="bubble_content">
			<div id="bubble_text">
				<p align = "center" style ={{color :'white'}}>​ Since Manhttan is the business capital and both Manhattan and Brooklyn
          are renowned tourist spots, we can see that larger chunks of Airbnb are available in those neighbourhoods</p>
          <p align = "center" style ={{color :'white'}}>Tip: use the two buttons below to see how Airbnb properties are ranked on the basis of reviews </p>
          <p align = "center" style ={{color :'white'}}> Hover over the bubbles to view the Airbnb rental details</p>
			</div>
      <Link to ="/barchart">
                        <i className="material-icons" style = {{color : "amber", float :"right"}}>arrow_forward_ios</i>
                        <i className="material-icons"style = {{color : "amber", float :"right"}}>arrow_forward_ios</i>
        </Link>

        <Link to ="/About">
                        <i className="material-icons" style = {{color : "amber", float :"left"}}>arrow_back_ios</i>
                        <i className="material-icons"style = {{color : "amber", float :"left"}}>arrow_back_ios</i>
        </Link>
			<div id="bubble_container">
				<div id="toolbar">
					<a href="#" id="all" className ="button" >All Reviews</a><span></span>
					<a href="#" id="ng_groups" className ="button" >Reviews By Neighbourhood Groups</a>
					
				</div>
				<div id="vis">
                <svg ref = {bubble}></svg>
                </div>
			</div>
		</div>
        
	</div>	
</body>

    )
}

export default Bubble