$(function() {

  App.getParameterByName = function(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    return (results === null) ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  };

  var appView = new App.AppView();
  // var analysis = new App.Analysis(App.Tasks);

  /*
  App.Tasks.add(new App.Task({period: 25, executionTime: 8}));
  App.Tasks.add(new App.Task({period: 50, executionTime: 13}));
  App.Tasks.add(new App.Task({period: 100, executionTime: 40}));
 */

  /*
  App.Tasks.add(new App.Task({period: 5, executionTime: 3}));
  App.Tasks.add(new App.Task({period: 10, executionTime: 3}));
  App.Tasks.add(new App.Task({period: 15, executionTime: 1}));
 */

  /*
  App.Tasks.add(new App.Task({period: 3, executionTime: 1}));
  App.Tasks.add(new App.Task({period: 6, executionTime: 3}));
 */

  var t = App.getParameterByName('t');
  var a = eval(t);
  for (t in a) {
    App.Tasks.add(new App.Task({period: a[t][0], executionTime: a[t][1], deadline: a[t][2], nonpreemptibleTime: a[t][3]}));
  }

  var analysisView = new App.AnalysisView();
  analysisView.render(App.Tasks);
  // Analysis.analyze();

});
