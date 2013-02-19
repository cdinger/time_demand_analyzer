/*
var App = App || {};
(function() {

  App.Analysis = Backbone.Model.extend({
    initialize: function(tasks) {
      this.tasks = tasks.models;
    },

    _gcd: function(a, b) {
      var t;
      while (b != 0) {
          t = b;
          b = a % b;
          a = t;
      }
      return a;
    },

    _lcm: function(a, b) {
      return (a * b / this._gcd(a, b));
    },

    _lcmm: function(args) {
      if (args.length == 2){
        return this._lcm(args[0], args[1]);
      }
      else {
        var arg0 = args[0];
        args.shift();
        return this._lcm(arg0, this._lcmm(args));
      }
    },

    hyperperiod: function() {
      var periods = _.map(this.tasks, function(task) { return task.get('period'); });
      return this._lcmm(periods);
    },

    analyze: function() {
      var plots = [];
      var releasedWork = 0;

      for (var t = 0; t <= this.hyperperiod(); t++) {
        for (var i = 0; i < this.tasks.length; i++) {
          if (t % this.tasks[i].get('period') === 0 || t === 0) {
            // this task is released at time t
            releasedWork += this.tasks[i].get('executionTime');
          }
        }

        if (plots.length > 0) {
          var previousReleasedWork = plots[plots.length - 1][1];
          if (releasedWork != previousReleasedWork) {
            // new work was released; add an extra plot point to force the
            // staircase line.
            plots.push([t, previousReleasedWork]);
          }
        }

        plots.push([t, releasedWork]);
      }

      return plots;
      // this.renderGraph(plots);
    }
  });

}());
*/
