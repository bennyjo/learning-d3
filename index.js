var svg = d3.select("body").append("svg");
var dataset = [
	[5, 20],
	[480, 90],
	[250, 50],
	[100, 33],
	[330, 95],
	[410, 12],
	[475, 44],
	[25, 67],
	[85, 21],
	[220, 88],
	[52, 200],
	[04, 320]
];
var w = window.outerWidth,
	h = window.outerHeight;
var xScale = d3.scale.linear();
var yScale = d3.scale.linear();
var rScale = d3.scale.linear();
var colorScale = d3.scale.linear();
var padding = 40;
var w = window.outerWidth - padding,
	h = window.outerHeight - padding;

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