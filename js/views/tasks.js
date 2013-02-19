var App = App || {};
(function() {

  App.TaskView = Backbone.View.extend({
    tagName: "li",
    template: _.template( $('#task-template').html() ),
    initialize: function() {
      this.listenTo(this.model, "change", this.render);
      this.model.bind('change', this.render, this);
    },
    events: {
      'dblclick': 'edit',
      'blur input': 'close'
    },
    render: function() {
      this.$el.html( this.template( this.model.toJSON() ) );
      this.input = this.$('input');
      return this;
    },
    edit: function() {
      this.$el.addClass("editing");
      this.input.focus();
    },
    close: function() {
      var value = this.input.val();
      if (!value) {
        this.clear();
      } else {
        this.model.parseString(value);
        this.$el.removeClass("editing");
      }
    }
  });

}());
