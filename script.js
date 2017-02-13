var width = 960,
	height = 500;
 
var svg = d3.select('body').append('svg')
	.attr('width', width)
	.attr('height', height);
 
var projection = d3.geo.albersUsa()
	.scale(1000)
	.translate([width / 2, height / 2]);
 
var path = d3.geo.path()
	.projection(projection);

d3.json('us.json', function(error, us) {
	svg.selectAll('.states')
		.data(topojson.feature(us, us.objects.usStates).features)
		.enter()
		.append('path')
		.style('opacity', function(d){
			return d.properties.unemployment * 0.075;
		})
		.style('fill', 'orange')
		.attr('class', 'states')
		.attr('d', path)
		.on('mouseover', function(d){
			var name = d.properties.STATE_ABBR;
			var rate = d.properties.unemployment;
			return document.getElementById('name').innerHTML=name + ': ' + rate;
		});
});
