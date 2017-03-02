(function() {
const width = 1500,
      height = 1500

const svg = d3.select('#chart')
  .append('svg')
  .attr('height', height)
  .attr('width', width)
  .append('g')
  .attr('transform', 'translate(0,0)')

const radiusScale = d3.scaleSqrt()
      .domain([1, 9])
      .range([1, 15])

const simulation = d3.forceSimulation()
  .force('x', d3.forceX(width / 2).strength(0.04))
  .force('y',  d3.forceY(height / 2).strength(0.04))
  .force('collide', d3.forceCollide(function(d) {
    return radiusScale(d.magnitude)
  }))

const tooltip = d3.select('body').append('div')   
  .attr('class', 'tooltip')               
  .style('opacity', 0) 

d3.queue()
  .defer(d3.csv, '../data/data.csv')
  .await(ready)

function ready(err, dataPoints) {
  console.log(dataPoints.length + ' quakes above 5.0 since 2017')
  const circles = svg.selectAll('.placename')
    .data(dataPoints)
    .enter().append('circle')
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
          returnColor = 'black'
        } else if (d.magnitude >= 5 && d.magnitude < 5.3) { 
          returnColor = 'pink'
        } else if (d.magnitude >= 5.3 && d.magnitude < 5.7) {
          returnColor = 'purple'
        } else if (d.magnitude >= 5.7 && d.magnitude < 6.5) {
          returnColor = 'silver'
        } else {
          returnColor = 'lavender'
        }
        return returnColor
      })


  circles.on('mousemove', function(d) {
      tooltip.transition().duration(200).style('opacity', .9)      
      tooltip.html('<h5>' + d.placename + '</h5>' + 
                  '<h5>' + d.magnitude + '</h5>' +
                  '<h5>' + d.time + '</h5>')  
      .style('left', (d3.event.pageX) + 15 + 'px')     
      .style('top', (d3.event.pageY - 28) + 'px')    
  })                  
  .on('mouseout', function(d) {       
      tooltip.transition().duration(500).style('opacity', 0)   
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

}

})()