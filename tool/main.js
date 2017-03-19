$(document).ready(function(){
    istar.setupModel();
    istar.setupDiagram();
    istar.setupMetamodel(istarcoreMetamodel);
    ui.defineInteractions();
    examples.pistarIntro();
    ui.setupUi();
});
