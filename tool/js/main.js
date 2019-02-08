/*!
 * This is open-source. Which means that you can contribute to it, and help
 * make it better! Also, feel free to use, modify, redistribute, and so on.
 *
 * Please don't work directly from this source-code. Instead, download or fork it from
 * https://github.com/jhcp/pistar
 */

$(document).ready(function () {
    istar.setupModel();
    istar.setupDiagram();
    istar.setupMetamodel(istar.metamodel);
    ui.setupUi();
    istar.examples.loadPistarWelcome();
    ui.selectModel();//clear selection
});
