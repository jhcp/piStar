$(document).ready(function () {
    istar.setupModel();
    istar.setupDiagram();
    istar.setupMetamodel(istarcoreMetamodel);
    ui.setupUi();
    istar.examples.loadPistarWelcome();
    ui.selectElement(istar.graph);//clear selection
});
