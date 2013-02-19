var App = App || {};
(function() {

  App.AnalysisView = Backbone.View.extend({
    initialize: function() {
      this.listenTo(App.Tasks, "change", this.render);
      //this.model.bind('change', this.render, this);
    },

    render: function(taskSet) {
      $('#graph').html('');
      var taskSet = App.Tasks;
      var tasks = taskSet.models;
      var t = taskSet.hyperperiod() * 2;
      //var t = 40;
      console.log(t);
      var asdf = [];
      var idlePoints = [];

      var previousDemand = taskSet.demand(tasks.length - 1, i - 1);
      for (var i = 1; i <= t; i++) {
        var previousDemand = taskSet.demand(tasks.length - 1, i - 1);
        var currentDemand = taskSet.demand(tasks.length - 1, i)

        if (previousDemand != currentDemand && i > 1) {
          asdf.push([i - 1, previousDemand]);
        }
        if (currentDemand == i) {
          idlePoints.push(i);
        }

        asdf.push([i - 1, currentDemand]);
      }

      console.log(idlePoints);

      // define dimensions of graph
      var m = 20; // [20, 20, 20, 20]; // margins
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

      // create yAxis
      var xAxis = d3.svg.axis().scale(x).tickSize(-w); //.ticks(t); // .tickSubdivide(true);

      // Add the x-axis.
      graph.append("svg:g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + h + ")")
        .call(xAxis);

      // create left yAxis
      var yAxisLeft = d3.svg.axis().scale(y).tickSize(-h).orient("left"); //.ticks(t);

      // Add the y-axis to the left
      graph.append("svg:g")
            .attr("class", "y axis")
            .call(yAxisLeft);

      graph.append("svg:path").attr("class", "service").attr("d", serviceLine(asdf.slice(0,t)));
      graph.append("svg:path").attr("class", "demand").attr("d", line(asdf));
    }
  });

}());
