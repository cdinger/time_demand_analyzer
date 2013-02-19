var App = App || {};
(function() {

  App.Task = Backbone.Model.extend({
    defaults: {
      period: 0,
      executionTime: 0,
      deadline: null
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
      str = str.replace(/\s+/g, '');
      ret = 0;
      if (str.indexOf('.') >= 0) {
        ret = parseFloat(str);
      }
      else {
        ret = parseInt(str, 10);
      }
      return ret;
    },

    parseString: function(str) {
      var arr = str.split(',');
      this.set('period', this.parse(arr[0]));
      this.set('executionTime', this.parse(arr[1]));
      this.change();
    }

  });

}());
