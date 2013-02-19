var App = App || {};
(function() {

  App.TaskSet = Backbone.Collection.extend({
    model: App.Task,

    _gcd: function(a, b) {
      var t;
      while (b !== 0) {
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
      var periods = _.map(this.models, function(task) { return task.get('period'); });
      return this._lcmm(periods);
    },

    deadline_monotonic_assignment: function () {
      // TODO: how to handle multiple tasks with the same period?
      return _.sortBy(this.models, function(task) {
        return task.get('deadline') || task.get('period');
      });
    },

    rate_monotonic_assignment: function () {
      // TODO: how to handle multiple tasks with the same execute time?
      return _.sortBy(this.models, function(task) {
        return task.get('executionTime');
      });
    },

    // Calculates demand for the given task at index i at time t
    demand: function(i, t) {
      var w = this.models[i].get('executionTime');
      for (i; i > 0; i--) {
        w += Math.ceil(t/this.models[i-1].get('period')) * this.models[i-1].get('executionTime');
      }
      return w;
    }
  });

  App.Tasks = new App.TaskSet();

}());
