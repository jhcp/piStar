istar.undoManager = {
  historyStack: [],
  current: -1,
  callback: function(empty) {},
  undo: function() {
    if (this.current < 0) {
      return;
    }

    this.historyStack[this.current]();
    this.current -= 1;
    this.callback(this.current < 0);
  },
  addToHistory: function(undoAction) {
    // Erase the already undone actions before adding a new action to the stack
    if (this.current + 1 < this.historyStack.length) {
      this.historyStack = this.historyStack.slice(0, this.current + 1);
    }

    this.historyStack.push(undoAction);
    this.current += 1;
    this.callback(this.current < 0);
  },
  reset: function() {
    this.historyStack = [];
    this.current = -1;
    this.callback(this.current);
  }
};