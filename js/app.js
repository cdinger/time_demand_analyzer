$(function() {

  var appView = new App.AppView();
  // var analysis = new App.Analysis(App.Tasks);

  App.Tasks.add(new App.Task({period: 25, executionTime: 8}));
  App.Tasks.add(new App.Task({period: 50, executionTime: 13}));
  App.Tasks.add(new App.Task({period: 100, executionTime: 40}));

  /*
  App.Tasks.add(new App.Task({period: 5, executionTime: 3}));
  App.Tasks.add(new App.Task({period: 10, executionTime: 3}));
  App.Tasks.add(new App.Task({period: 15, executionTime: 1}));
 */

  /*
  App.Tasks.add(new App.Task({period: 3, executionTime: 1}));
  App.Tasks.add(new App.Task({period: 6, executionTime: 3}));
 */

  var analysisView = new App.AnalysisView();
  analysisView.render(App.Tasks);
  // Analysis.analyze();

});
