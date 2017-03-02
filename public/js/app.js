(function() {
const width = 600,
      height = 600

const svg = d3.select('#chart')
  .append('svg')
  .attr('height', height)
  .attr('width', width)
  .append('g')
  .attr('transform', 'translate(0,0)')

const radiusScale = d3.scaleSqrt()
      .domain([5, 9])
      .range([10, 90])

const simulation = d3.forceSimulation()
  .force('x', d3.forceX(width / 2).strength(0.05))
  .force('y',  d3.forceY(height / 2).strength(0.05))
  .force('collide', d3.forceCollide(function(d) {
    return radiusScale(d.magnitude) + 1
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
    .attr('fill', 'green')


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