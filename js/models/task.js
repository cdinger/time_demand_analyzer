var App = App || {};
(function() {

  App.Task = Backbone.Model.extend({
    defaults: {
      period: 0,
      executionTime: 0,
      deadline: undefined,
      nonpreemptibleTime: undefined
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

    // Parses one string task element into an int or float.
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

    // Parses a string from the edit/add task form; A comma-separated list of
    // task elements: period, execute time, [relative deadline, non-preemptable time]
    parseString: function(str) {
      var arr = str.split(',');
      this.set('period', this.parse(arr[0]));
      this.set('executionTime', this.parse(arr[1]));
      this.set('deadline', this.parse(arr[2]));
      this.set('nonpreemptibleTime', this.parse(arr[3]));
      this.change();
    }

  });

}());
