var App = App || {};
(function() {

  App.AnalysisView = Backbone.View.extend({
    initialize: function() {
      this.listenTo(App.Tasks, "change", this.render);
      //this.model.bind('change', this.render, this);
    },

    render: function() {
      $('#graph').html('');
      var taskSet = App.Tasks;
      var tasks = taskSet.models;
      // var t = 40;
      // var t = taskSet.hyperperiod() * 1.1;
      var t = _.last(tasks).get('deadline') || _.last(tasks).get('period');
      var lines = [];

      var taskIndex = 0;
      for (taskIndex; taskIndex < tasks.length; taskIndex++) {
        var previousDemand = taskSet.demand(taskIndex, i - 1);
        var currentDemand = -1;
        var asdf = [];
        var idles = [];
        for (var i = 1; i <= tasks[taskIndex].get('period') + 1; i++) {
          var previousDemand = taskSet.demand(taskIndex, i - 1);
          var currentDemand = taskSet.demand(taskIndex, i)


          var extraPointAdded = false;

          if (previousDemand != currentDemand && i > 1) {
              // add an extra point to create 'staircase' line graph
              asdf.push([i - 1, previousDemand]);
              extraPointAdded = true;
          }
          if (currentDemand == i) {
            idles.push(i);
          }

          if (i <= (tasks[taskIndex].get('deadline') || tasks[taskIndex].get('period')) || !extraPointAdded) {
          // if (i <= t || !extraPointAdded) {
            asdf.push([i - 1, currentDemand]);
          }

          //if (currentDemand >= t) {
            //break;
          //}
        }
        lines.push({points: asdf, idlePoints: idles});
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
        //.attr("transform", "translate(" + m + ",10)");

      // create yAxis
      var xAxis = d3.svg.axis().scale(x).tickSize(-5, -4, -3).tickSubdivide(true).tickPadding(5); //.ticks(t); // .tickSubdivide(true);

      // Add the x-axis.
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
        //.style("stroke-dasharray", ("2, 2"))
        .attr("class", "service")
        // .attr("d", serviceLine(asdf.slice(0,tasks[tasks.length - 1].get('period') + 1)));
        .attr("d", serviceLine(asdf.slice(0,t)));

      _.each(lines, function(asdf, i) {
        if (asdf.idlePoints.length) {
          // feasible
          graph.append("circle")
            .attr("r", 4)
            .attr("cx", x(asdf.idlePoints[0]))
            .attr("cy", y(asdf.idlePoints[0]));
          //graph.append("svg:text")
            //.attr("x", x(asdf.idlePoints[0]) + 10)
            //.attr("y", y(asdf.idlePoints[0]) + 20)
            //.text("t=" + asdf.idlePoints[0]);
          graph.append("svg:path")
            .attr("class", "demand")
            .attr("d", line(asdf.points));
        }
        else {
          // infeasible
          graph.append("svg:path")
            .attr("class", "demand")
            .attr("d", line(asdf.points));
            //.style("stroke-dasharray", ("15,4,2,4"));
        }
        graph.append("svg:text")
          .attr("x", x(asdf.points[asdf.points.length - 1][0]) + 10)
          .attr("y", y(asdf.points[asdf.points.length - 1][1]) + 3)
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
