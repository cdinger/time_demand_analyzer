$(function() {

  App.getParameterByName = function(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    return (results === null) ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  };

  var appView = new App.AppView();
  var t = App.getParameterByName('t');
  var a = eval(t);

  for (t in a) {
    App.Tasks.add(new App.Task({period: a[t][0], executionTime: a[t][1], deadline: a[t][2], nonpreemptibleTime: a[t][3]}));
  }

  var analysisView = new App.AnalysisView();
  analysisView.render(App.Tasks);

  // Indicate the currently selected workload
  $('a[data-workload=' + App.getParameterByName('workload') + ']').parent().addClass('active');

});
