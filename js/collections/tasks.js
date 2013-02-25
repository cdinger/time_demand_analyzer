var App = App || {};
(function() {

  App.TaskSet = Backbone.Collection.extend({
    model: App.Task,

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

    /*
    comparator: function(task) {
      //return chapter.get("page");
      return task.get('deadline') || task.get('period');
    },
   */

    // Caclulates blocking time for task at index i
    blockingTime: function(i) {
      var b = 0;
      for (i-1; i < this.models.length; i++) {
        b += this.models[i].get('nonpreemptibleTime') || 0;
      }
      return b;
    },

    // Calculates demand for the given task at index i at time t
    demand: function(i, t, w) {
      if (w === undefined) {
        w = this.models[i].get('executionTime');
      }
      else {
        w += this.blockingTime(i) + Math.ceil(t/this.models[i].get('period')) * this.models[i].get('executionTime');
      }
      if (i === 0) {
        return w;
      }
      else {
        return this.demand(i - 1, t, w);
      }
     /*
      var w = this.models[i].get('executionTime');
      for (i; i > 0; i--) {
        w += this.blockingTime(i) + Math.ceil(t/this.models[i-1].get('period')) * this.models[i-1].get('executionTime');
      }
      return w;
     */
    }
  });

  App.Tasks = new App.TaskSet();

}());
