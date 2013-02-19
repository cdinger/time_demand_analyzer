var App = App || {};
(function() {

  App.AppView = Backbone.View.extend({
    el: $('#app'),
    initialize: function() {
      this.listenTo(App.Tasks, 'add', this.addOne);
    },
    addOne: function(task) {
      task.set({index: App.Tasks.indexOf(task) + 1});
      var view = new App.TaskView({model: task});
      $("#task-list").append(view.render().el);
    }
  });

}());
