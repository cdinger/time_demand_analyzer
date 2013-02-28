var App = App || {};
(function() {

  App.AnalysisView = Backbone.View.extend({
    initialize: function() {
      this.listenTo(App.Tasks, "change", this.render);
    },

    // Renders a d3.js line graph
    render: function() {
      $('#graph').html('');
      var taskSet = App.Tasks;
      var tasks = taskSet.models;
      var t = _.last(tasks).get('deadline') || _.last(tasks).get('period');
      var lines = [];
      var taskIndex = 0;

      for (taskIndex; taskIndex < tasks.length; taskIndex++) {
        var previousDemand = taskSet.demand(taskIndex, i - 1);
        var currentDemand = -1;
        var points = [];
        var idles = [];
        var stop = (tasks[taskIndex].get('deadline') || tasks[taskIndex].get('period')) + 1;

        for (var i = 1; i <= stop; i++) {
          var previousDemand = taskSet.demand(taskIndex, i - 1);
          var currentDemand = taskSet.demand(taskIndex, i)
          var extraPointAdded = false;

          if (previousDemand != currentDemand && i > 1) {
              // add an extra point to create 'staircase' line graph
              points.push([i - 1, previousDemand]);
              extraPointAdded = true;
          }
          if (currentDemand == i) {
            idles.push(i);
          }
          if (i <= (tasks[taskIndex].get('deadline') || tasks[taskIndex].get('period')) || !extraPointAdded) {
            points.push([i - 1, currentDemand]);
          }
        }
        lines.push({points: points, idlePoints: idles});
      }

      // define dimensions of graph
      var m = 50; // [20, 20, 20, 20]; // margins
      var w = 600 - (2 * m); // width
      var h = w;

      var x = d3.scale.linear().domain([0, t]).range([0, w]);
      var y = d3.scale.linear().domain([0, t]).range([h, 0]);

      var serviceLine = d3.svg.line().x(function(d,i) {
        return x(i);
      }).y(function(d,i) {
        return y(i);
      });

      var line = d3.svg.line().x(function(d,i) {
        return x(d[0]);
        //return x(i);
      }).y(function(d,i) {
        return y(d[1]);
        //return y(taskSet.demand(tasks.length - 1, i));
      });

      // Add an SVG element with the desired dimensions and margin.
      var graph = d3.select("#graph").append("svg:svg")
        .attr("width", w + (m * 2))
        .attr("height", h + (m * 2))
        .append("svg:g")
        .attr("transform", "translate(" + m + "," + m + ")");

      // create xAxis
      var xAxis = d3.svg.axis().scale(x).tickSize(-5, -4, -3).tickSubdivide(true).tickPadding(5); //.ticks(t); // .tickSubdivide(true);

      // Add the x-axis
      graph.append("svg:g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + h + ")")
        .call(xAxis);

      // create left yAxis
      var yAxisLeft = d3.svg.axis().scale(y).tickSize(-5, -3, -3).tickSubdivide(true).tickPadding(5).orient("left"); //.ticks(t);

      // Add the y-axis to the left
      graph.append("svg:g")
            .attr("class", "y axis")
            .call(yAxisLeft);

      graph.append("svg:path")
        .attr("class", "service")
        .attr("d", serviceLine(points.slice(0,t + 1)));

      _.each(lines, function(lineData, i) {
         if (_.last(lineData.points)[0] >= _.last(lineData.points)[1]) {
          // feasible
          if (lineData.idlePoints[0] > 0) {
            graph.append("circle")
              .attr("r", 4)
              .attr("cx", x(lineData.idlePoints[0]))
              .attr("cy", y(lineData.idlePoints[0]));
          }
          graph.append("svg:path")
            .attr("class", "demand")
            .attr("d", line(lineData.points));
        }
        else {
          // infeasible
          graph.append("svg:path")
            .attr("class", "demand")
            .attr("d", line(lineData.points))
            .style("stroke-dasharray", ("15,4,2,4"));
        }
        graph.append("svg:text")
          .attr("x", x(lineData.points[lineData.points.length - 1][0]) + 10)
          .attr("y", y(lineData.points[lineData.points.length - 1][1]) + 3)
          .attr('class', 'line-label')
          .text('w')
          .append('tspan')
          .attr('style', 'baseline-shift:sub')
          .attr('font-size', '.8em')
          .text(i + 1)
          .append('tspan')
          .attr('font-size', '1.2em')
          .text('(t)');
      });

    }
  });

}());
