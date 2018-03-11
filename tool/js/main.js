$(document).ready(function () {
    istar.setupModel();
    istar.setupDiagram();
    istar.setupMetamodel(istarcoreMetamodel);
    istar.examples.loadPistarWelcome();
    ui.setupUi();
});
