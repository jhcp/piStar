/*!
 * This is open-source. Which means that you can contribute to it, and help
 * make it better! Also, feel free to use, modify, redistribute, and so on.
 *
 * Please don't work directly from this source-code. Instead, download or fork it from
 * https://github.com/jhcp/pistar
 */

$(document).ready(function () {
    'use strict';

    istar.graph = istar.setup.setupModel();
    istar.paper = istar.setup.setupDiagram(istar.graph);
    istar.setupMetamodel(istar.metamodel);
    ui.setupUi();
    istar.fileManager.loadModel(istar.models.processModelParameter());
    ui.selectPaper();//clear selection
    // ui.alert('Hi there, this is a beta version of the tool, currently under testing. Please send us your feedback at <a href="https://goo.gl/forms/SaJlelSfkTkp819t2">https://goo.gl/forms/SaJlelSfkTkp819t2</a>',
    //     'Beta version');
});

/*definition of globals to prevent undue JSHint warnings*/
/*globals istar:false, ui:false, console:false, $:false */