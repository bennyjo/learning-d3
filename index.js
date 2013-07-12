var svg = d3.select("body").append("svg");
//Dynamic, random dataset
var dataset = [];
var numDataPoints = 50;
var xRange = Math.random() * 1000;
var yRange = Math.random() * 1000;
for (var i = 0; i < numDataPoints; i++) {
	var newNumber1 = Math.round(Math.random() * xRange);
	var newNumber2 = Math.round(Math.random() * yRange);
	dataset.push([newNumber1, newNumber2]);
}
var w = window.outerWidth,
	h = window.outerHeight;
var xScale = d3.scale.linear();
var yScale = d3.scale.linear();
var rScale = d3.scale.linear();
var colorScale = d3.scale.linear();
var padding = 40;
var w = window.outerWidth - padding,
	h = window.outerHeight - padding;

var xAxis = d3.svg.axis()
				.scale(xScale)
				.orient('bottom')
				.ticks(20);

var yAxis = d3.svg.axis()
				.scale(yScale)
				.orient('left')
				.ticks(10);

// Setup scales
colorScale.domain([0, d3.max(dataset, function(d) {
		return d[1];
	})])
	.range([0, 255]);

xScale.domain([0, d3.max(dataset, function(d) {
		return d[0];
	})])
	.range([0 + padding, w - padding]);

yScale.domain([0, d3.max(dataset, function(d) {
		return d[1];
	})])
	.range([h - padding, 0 + padding]);

rScale.domain([0, d3.max(dataset, function(d) {
		return d[1];
	})])
	.range([2, 10]);

svg.attr("width", w)
	.attr("height", h);

var circles = svg.selectAll("circle")
	.data(dataset)
	.enter()
	.append("circle");

svg.append('g')
	.attr('class', 'axis')
	.attr("transform", "translate(0," + (h - padding) + ")")
	.call(xAxis);

svg.append('g')
	.attr('class', 'axis')
	.attr("transform", "translate(" + padding + ",0)")
	.call(yAxis);

circles.attr("cx", function(d) {
		return xScale(d[0]);
	})
	.attr("cy", function(d) {
		return yScale(d[1]);
	})
	.attr("r", function(d) {
		return rScale(d[1]);
	})
	.attr("fill", "salmon")
	.attr("stroke", function(d) {
		return 'rgba(255, '+ Math.round(colorScale(d[1])) + ', '+ Math.round(colorScale(d[0])) +', 100)';
	})
	.attr("stroke-width", function(d) {
		return d[0] / 2;
	});