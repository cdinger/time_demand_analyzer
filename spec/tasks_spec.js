describe("Tasks", function() {
  beforeEach(function() {
    App.Tasks.reset();
  });

  it("should calculate demand for a single task", function() {
    var executionTime = 5;
    App.Tasks.add(new App.Task({executionTime: executionTime}));
    expect(App.Tasks.demand(0, 1)).toEqual(executionTime);
  });

  it("should calculate demand simple task set", function() {
    App.Tasks.add(new App.Task({period: 25, executionTime: 8}));
    App.Tasks.add(new App.Task({period: 50, executionTime: 13}));
    App.Tasks.add(new App.Task({period: 100, executionTime: 40}));
    expect(App.Tasks.demand(0, 1)).toEqual(8);
    expect(App.Tasks.demand(1, 1)).toEqual(21);
    expect(App.Tasks.demand(2, 1)).toEqual(61);
    expect(App.Tasks.demand(0, 40)).toEqual(8);
    expect(App.Tasks.demand(1, 40)).toEqual(29);
    expect(App.Tasks.demand(2, 40)).toEqual(69);
    //_.each(App.Tasks.models, function(task, i) {
      //expect(task.get('feasible').toBe(true));
    //});
  });
});

