var App = App || {};
(function() {

  App.Task = Backbone.Model.extend({
    defaults: {
      period: 0,
      executionTime: 0,
      deadline: undefined,
      blockingTime: undefined
    },

    initialize: function() {
      this.change();
    },

    change: function() {
      var values = [];
      values.push(this.get('period'));
      values.push(this.get('executionTime'));
      values.push(this.get('deadline'));
      values = _.compact(values);
      this.set('string', values.join(', '));
    },

    parse: function(str) {
      ret = undefined;

      if (str !== undefined) {
        str = str.replace(/\s+/g, '');
        if (str.indexOf('.') >= 0) {
          ret = parseFloat(str);
        }
        else {
          ret = parseInt(str, 10);
        }
      }

      return ret;
    },

    parseString: function(str) {
      var arr = str.split(',');
      this.set('period', this.parse(arr[0]));
      this.set('executionTime', this.parse(arr[1]));
      this.set('deadline', this.parse(arr[2]));
      this.set('blockingTime', this.parse(arr[3]));
      this.change();
    },

    // Calculates demand for the given task at index i at time t
    demand: function(tasks, t, w) {
      var taskIndex = tasks.indexOf(this);
      w = w || 0;
      // var w = this.get('executionTime');
      if (taskIndex == 0) {
        return this.get('executionTime');
      }
      else {
        while (taskIndex >= 0) {
          // w += Math.ceil(t/this.models[i-1].get('period')) * this.models[i-1].get('executionTime');
          return w + tasks[taskIndex - 1].demand(tasks, t, w);
        }
      }
    }

  });

}());
