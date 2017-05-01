(function() {

const width = 1000,
      height = 800

const svg = d3.select('#chart')
  .append('svg')
  .attr('height', height)
  .attr('width', width)
  .append('g')
  .attr('transform', 'translate(0,0)')

const radiusScale = d3.scaleSqrt()
      .domain([1, 9])
      .range([.01, 10])

const forceX = d3.forceX(width / 2).strength(0.015)
const forceY = d3.forceY(height / 2).strength(0.015)
const changeStrength = 0.175
const changeAlphaState = 0.175
const chosenMagnitudeXLocation = 200
const restOfGroupXLocation = 800

const forceCollide = d3.forceCollide(function(d) {
      return radiusScale(d.magnitude) + 2
    })

const simulation = d3.forceSimulation()
  .force('x', forceX)
  .force('y',  forceY)
  .force('collide', forceCollide)

const tooltip = d3.select('body').append('div')   
  .attr('class', 'tooltip')               
  .style('opacity', 0) 

d3.queue()
  .defer(d3.csv, '../data/data.csv')
  .await(ready)

function ready(err, dataPoints) {
  console.log(dataPoints.length + ' quakes 2017')
  const circles = svg.selectAll('.placename')
    .data(dataPoints)
    .enter()
    .append('circle')
    .attr('class','placename')
    .attr('r', function(d) {
      return radiusScale(d.magnitude)
    })
    .style('fill', 
      function(d) {
        let returnColor
        if (d.magnitude >= 1 && d.magnitude < 2) { 
          returnColor = 'green'
        } else if (d.magnitude >= 2 && d.magnitude < 3) {
          returnColor = 'yellow'
        } else if (d.magnitude >= 3 && d.magnitude < 4) {
          returnColor = 'blue'
        } else if (d.magnitude >= 4 && d.magnitude < 4.5) {
          returnColor = 'red'
        } else if (d.magnitude >= 4.5 && d.magnitude < 5) {
          returnColor = 'orange'
        } else if (d.magnitude >= 5 && d.magnitude < 5.15) { 
          returnColor = 'violet'
        } else if (d.magnitude >= 5.15 && d.magnitude < 5.3) { 
          returnColor = 'gold'
        } else if (d.magnitude >= 5.3 && d.magnitude < 5.7) {
          returnColor = 'teal'
        } else if (d.magnitude >= 5.7 && d.magnitude < 6.5) {
          returnColor = 'lavender'
        } else {
          returnColor = 'black'
        }
        return returnColor
    })
    .call(d3.drag()
    .on('start', dragstarted)
    .on('drag', dragged)
    .on('end', dragended))

function dragstarted(d) {
  d3.select(this).raise().classed('active', true);
}

function dragged(d) {
  d3.select(this).attr('cx', d.x = d3.event.x).attr('cy', d.y = d3.event.y);
}

function dragended(d) {
  d3.select(this).classed('active', false);
}

circles.on('mousemove', function(d) {
  tooltip.transition()
  .duration(200)
  .style('opacity', .9)
  .style('border-radius', 10)
  tooltip.html('<h5>' + d.placename + '</h5>' + 
              '<h5>' + d.magnitude + '</h5>' +
              '<h5>' + d.time + '</h5>')  
  .style('left', (d3.event.pageX) + 15 + 'px')     
  .style('top', (d3.event.pageY - 28) + 'px')    
})                  
.on('mouseout', function(d) {       
  tooltip.transition().duration(200).style('opacity', 0)   
})

simulation.nodes(dataPoints).
  on('tick', ticked)

function ticked() {
  circles
    .attr('cx', function(d) {
      return d.x
    })
    .attr('cy', function(d) {
      return d.y
    })
}

d3.select('#all').on('click', function() {
  simulation
    .force('x', d3.forceX(function(d) {
      return 600
    })
    .strength(0.05))
    .alphaTarget(0.1)
    .restart()
})

d3.select('#mag1').on('click', function() {
  simulation
    .force('x', d3.forceX(function(d) {
      if (d.magnitude >= 1 && d.magnitude < 2) { 
        return chosenMagnitudeXLocation
      } else {
        return restOfGroupXLocation
      }
    })
    .strength(changeStrength))
    .alphaTarget(changeAlphaState)
    .restart()
})

d3.select('#mag2').on('click', function() {
  simulation
    .force('x', d3.forceX(function(d) {
      if (d.magnitude >= 2 && d.magnitude < 3) { 
        return chosenMagnitudeXLocation
      } else {
        return restOfGroupXLocation
      }
    })
    .strength(changeStrength))
    .alphaTarget(changeAlphaState)
    .restart()
})

d3.select('#mag3').on('click', function() {
  simulation
    .force('x', d3.forceX(function(d) {
      if (d.magnitude >= 3 && d.magnitude < 4) { 
        return chosenMagnitudeXLocation
      } else {
        return restOfGroupXLocation
      }
    })
    .strength(changeStrength))
    .alphaTarget(changeAlphaState)
    .restart()
})

d3.select('#mag4').on('click', function() {
  simulation
    .force('x', d3.forceX(function(d) {
      if (d.magnitude >= 4 && d.magnitude < 5) { 
        return chosenMagnitudeXLocation
      } else {
        return restOfGroupXLocation
      }
    })
    .strength(changeStrength))
    .alphaTarget(changeAlphaState)
    .restart()
})

d3.select('#mag5').on('click', function() {
  simulation
    .force('x', d3.forceX(function(d) {
      if (d.magnitude >= 5 && d.magnitude < 6) { 
        return chosenMagnitudeXLocation
      } else {
        return restOfGroupXLocation
      }
    })
    .strength(changeStrength))
    .alphaTarget(changeAlphaState)
    .restart()
})

d3.select('#mag6').on('click', function() {
  simulation
    .force('x', d3.forceX(function(d) {
      if (d.magnitude >= 6 && d.magnitude < 7) { 
        return chosenMagnitudeXLocation
      } else {
        return restOfGroupXLocation
      }
    })
    .strength(changeStrength))
    .alphaTarget(changeAlphaState)
    .restart()
})

d3.select('#mag7').on('click', function() {
  simulation
    .force('x', d3.forceX(function(d) {
      if (d.magnitude >= 7 && d.magnitude < 8) { 
        return chosenMagnitudeXLocation
      } else {
        return restOfGroupXLocation
      }
    })
    .strength(changeStrength))
    .alphaTarget(changeAlphaState)
    .restart()
})

d3.select('#mag8').on('click', function() {
  simulation
    .force('x', d3.forceX(function(d) {
      if (d.magnitude >= 8 && d.magnitude < 9) { 
        return chosenMagnitudeXLocation
      } else {
        return restOfGroupXLocation
      }
    })
    .strength(changeStrength))
    .alphaTarget(changeAlphaState)
    .restart()
})

d3.select('#mag9').on('click', function() {
  simulation
    .force('x', d3.forceX(function(d) {
      if (d.magnitude >= 9) { 
        return chosenMagnitudeXLocation
      } else {
        return restOfGroupXLocation
      }
    })
    .strength(changeStrength))
    .alphaTarget(changeAlphaState)
    .restart()
})


}

})()