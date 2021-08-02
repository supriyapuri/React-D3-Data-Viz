import React, {useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import * as d3 from 'd3';
import neighborhoodBubbleData from './data/all_neighbourhood_details';



const Bubble = () => {
    const bubble = useRef();
    useEffect(async () => {

        function charge(d) {
            return -Math.pow(d.radius, 2.0) * forceStrength;
          }

        function ticked() {
            bubbles
              .attr('cx', function (d) { return d.x; })
              .attr('cy', function (d) { return d.y; });
          }

        function groupBubbles() {
        // hideTitles('.state');
        // hideTitles('.stars');
    
        // d3.selectAll("#bubble_state_annotation").remove()
        // d3.selectAll("#bubble_star_annotation").remove()    
    
        // @v4 Reset the 'x' and 'y' force to draw the bubbles to the center.
        simulation.force('x', d3.forceX().strength(forceStrength).x(center.x));
        simulation.force('y', d3.forceY().strength(forceStrength).y(center.y));
    
        // @v4 We can reset the alpha value and restart the simulation
        simulation.alpha(1).restart();
        }

        function splitBubbles() {
            // hideTitles('.stars');
            // showTitles(stateTitle, 'state');
        
            // d3.selectAll("#bubble_state_annotation").remove()
            // d3.selectAll("#bubble_star_annotation").remove()
            d3.select("#bubble_svg").append("g")
              .attr("class", "annotation-group")
              .attr("id", "bubble_state_annotation")
              .call(bubble_state_makeAnnotations)      
        
            // @v4 Reset the 'x' force to draw the bubbles to their year centers
            simulation.force('x', d3.forceX().strength(forceStrength).x(nodeStatePosX));
            simulation.force('y', d3.forceY().strength(forceStrength).y(nodeStatePosY));
        
            // @v4 We can reset the alpha value and restart the simulation
            simulation.alpha(1).restart();
          }
        
          

        console.log(neighborhoodBubbleData);
        // Constants for sizing
        // var width = document.documentElement.clientWidth;;
        // var height = document.documentElement.clientHeight;
        const width = 800;
        const height = 800;

        // Locations to move bubbles towards, depending
        // on which view mode is selected.
        var center = { x: width / 2, y: height / 2 };

        var ngCenters = {
        Bronx: { x: 3 * width / 16, y: height / 3 },
        Brooklyn: { x: width / 3, y: 2* height / 3 },
        Manhattan: { x: 3 * width / 8, y: height / 3 },
        Queens: { x: width / 2, y: 2* height / 3 },
        StatenIsland: { x: 5 * width / 8, y: height / 3 },
        }

         // X locations of the state titles.
        var ngTitles = {
            Bronx: { x: width / 10, y: height / 8 },
            Brooklyn: { x: 9 * width / 40, y: 9 * height / 20 },
            Manhattan: { x: 7 * width / 20, y: height / 8 },
            Queens: { x: width / 2, y: 9 * height / 20 },
            StatenIsland: { x: 13 * width / 20, y: height / 8 },
        }

        var forceStrength = 0.03;

        var simulation = d3.forceSimulation()
        .velocityDecay(0.2)
        .force('x', d3.forceX().strength(forceStrength).x(center.x))
        .force('y', d3.forceY().strength(forceStrength).y(center.y))
        .force('charge', d3.forceManyBody().strength(charge))
        .on('tick', ticked);


        var fillColor = d3.scaleOrdinal(d3.schemePastel1)
                            .domain(['Bronx', 'Brooklyn', 'Manhattan', 'Queens', 'StatenIsland']);

        //TODO: wrap in function                    
        var maxAmount = d3.max(neighborhoodBubbleData, function (d) { return +d.avg_reviews; });

        console.log(maxAmount);

        var radiusScale = d3.scalePow()
        .exponent(0.5)
        .range([2, 35])
        .domain([0, maxAmount]);

        console.log(radiusScale);

        var nodes = neighborhoodBubbleData.map(function (d) {
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
          
          console.log(nodes);
          //TODO End function

          const bubble_svg = d3.select('#vis')
          .append('svg')
          .attr('id', 'bubble_svg')
          .attr('width', width)
          .attr('height', height)
          

          let bubbles = bubble_svg.selectAll('.bubble')
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

        //   .on('mouseover', showDetail)
        //   .on('mouseout', hideDetail);

          bubbles = bubbles.merge(bubblesE);

          bubbles.transition()
          .duration(2000)
          .attr('r', function (d) { return d.radius; });

          simulation.nodes(nodes);

          groupBubbles();

    })


    return(
    <body>
	<div class="section" id="background_bw">
		<div id="bubble_title"><h1>Overview of All Reviewed Restaurants</h1></div>
		<div id="bubble_content">
			<div id="bubble_text">
				<p>​We are able to see that the bulk of the reviews are from NV with a star rating between 2-4.</p>
			</div>
			<div id="bubble_container">
				<div id="toolbar">
					<a href="#" id="all" class="button active">All Reviews</a>
					<a href="#" id="ng_groups" class="button">Reviews By Neighbourhood Groups</a>
					
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