$(document).ready(function () {
    istar.setupModel();
    istar.setupDiagram();
    istar.setupMetamodel(istar.metamodel);
    ui.setupUi();
    istar.examples.loadPistarWelcome();
    ui.selectModel();//clear selection
});
