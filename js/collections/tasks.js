var App = App || {};
(function() {

  App.TaskSet = Backbone.Collection.extend({
    model: App.Task,

    comparator: function(task) {
      // sort into a deadline monotonic order
      return task.get('deadline') || task.get('period');
    },

    // Caclulates worst-case blocking time for task at index i
    blockingTime: function(i) {
      var b = 0;
      for (i-1; i < this.models.length; i++) {
        b += this.models[i].get('nonpreemptibleTime') || 0;
      }
      return b;
    },

    // Calculates demand for the given task at index i at time t
    demand: function(i, t) {
      var w = this.models[i].get('executionTime');
      for (i; i > 0; i--) {
        w += this.blockingTime(i) + Math.ceil(t/this.models[i-1].get('period')) * this.models[i-1].get('executionTime');
      }
      return w;
    }
  });

  App.Tasks = new App.TaskSet();

}());
