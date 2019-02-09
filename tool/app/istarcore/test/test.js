QUnit.config.collapse = true;

QUnit.test( "Test of QUnit", function( assert ) {
  assert.ok( 1 == "1", "QUnit is running!" );
});

QUnit.module('Elements', {

    beforeEach: function() {
        this.graph = new joint.dia.Graph();
		istar.setupModel(this.graph);
        istar.setupMetamodel(istarcoreMetamodel);
    },

    afterEach: function() {
        delete this.graph;
    }
});

QUnit.test('is empty', function() {
    ok(istar.isEmpty(), 'there are no cells in the model');
    var rect = new joint.shapes.basic.Rect({
        position: { x: 100, y: 30 }, size: { width: 100, height: 30 }
    });
    this.graph.addCell(rect);
    notOk(istar.isEmpty(), 'after adding a cell, it is not empty anymore');
});

QUnit.test('add Actor', function() {
    istar.addActor();
    ok(istar.getElements()[0].isActor());
});
QUnit.test('add Role', function() {
    istar.addRole();
    ok(istar.getElements()[0].isRole());
});
QUnit.test('add Agent', function() {
    istar.addAgent();
    ok(istar.getElements()[0].isAgent());
});
QUnit.test('add Goal', function() {
    istar.addAgent();
    ok(istar.getElements()[0].isAgent());
});
QUnit.test('add Quality', function() {
    istar.addAgent();
    ok(istar.getElements()[0].isAgent());
});
QUnit.test('add Task', function() {
    istar.addAgent();
    ok(istar.getElements()[0].isAgent());
});
QUnit.test('add Resource', function() {
    istar.addAgent();
    ok(istar.getElements()[0].isAgent());
});
QUnit.test('added element is just it', function() {
    istar.addActor();
    ok(istar.getElements()[0].isActor());
    notOk(istar.getElements()[0].isRole());
    notOk(istar.getElements()[0].isAgent());
    notOk(istar.getElements()[0].isGoal());
    notOk(istar.getElements()[0].isQuality());
    notOk(istar.getElements()[0].isTask());
    notOk(istar.getElements()[0].isResource());
});


QUnit.module('ActorLinks', {

    beforeEach: function() {
        this.graph = new joint.dia.Graph();
		istar.setupModel(this.graph);
        istar.setupMetamodel(istarcoreMetamodel);
    },

    afterEach: function() {
        delete this.graph;
    }
});

QUnit.test('add Is-A link from Actor to Actor', function() {
    var el1 = istar.addActor();
    var el2 = istar.addActor();
    var link = istar.addIsALink(el1, el2);
    ok(link.isIsALink());
});
QUnit.test('add Is-A link from Role to Role', function() {
    var el1 = istar.addRole();
    var el2 = istar.addRole();
    var link = istar.addIsALink(el1, el2);
    ok(link.isIsALink());
});
QUnit.test('not able to add Is-A link from Agent to Agent', function() {
    var el1 = istar.addAgent();
    var el2 = istar.addAgent();
    var link = istar.addIsALink(el1, el2);
    notOk(link);
});
QUnit.test('not able to add Is-A link from Actor to Role', function() {
    var el1 = istar.addActor();
    var el2 = istar.addRole();
    var link = istar.addIsALink(el1, el2);
    notOk(link);
});
QUnit.test('not able to add Is-A link from Role to Actor', function() {
    var el1 = istar.addRole();
    var el2 = istar.addActor();
    var link = istar.addIsALink(el1, el2);
    notOk(link);
});
QUnit.test('not able to add Is-A link from Actor to Agent', function() {
    var el1 = istar.addActor();
    var el2 = istar.addAgent();
    var link = istar.addIsALink(el1, el2);
    notOk(link);
});
QUnit.test('not able to add Is-A link from Agent to Actor', function() {
    var el1 = istar.addAgent();
    var el2 = istar.addActor();
    var link = istar.addIsALink(el1, el2);
    notOk(link);
});
QUnit.test('not able to add Is-A link from Role to Agent', function() {
    var el1 = istar.addRole();
    var el2 = istar.addAgent();
    var link = istar.addIsALink(el1, el2);
    notOk(link);
});
QUnit.test('not able to add Is-A link from Agent to Role', function() {
    var el1 = istar.addAgent();
    var el2 = istar.addRole();
    var link = istar.addIsALink(el1, el2);
    notOk(link);
});

QUnit.test('not add more than one Is-A link between the same actors', function() {
    var el1 = istar.addActor();
    var el2 = istar.addActor();
    var link1 = istar.addIsALink(el1, el2);
    var link2 = istar.addIsALink(el1, el2);
    var link3 = istar.addIsALink(el2, el1);
    ok(link1.isIsALink());
    notOk(link2);
    notOk(link3);
});

QUnit.test('add Participates-In link from Actor to Actor', function() {
    var el1 = istar.addActor();
    var el2 = istar.addActor();
    var link = istar.addParticipatesInLink(el1, el2);
    ok(link.isParticipatesInLink());
});
QUnit.test('add Participates-In link from Role to Role', function() {
    var el1 = istar.addRole();
    var el2 = istar.addRole();
    var link = istar.addParticipatesInLink(el1, el2);
    ok(link.isParticipatesInLink());
});
QUnit.test('add Participates-In link from Agent to Agent', function() {
    var el1 = istar.addAgent();
    var el2 = istar.addAgent();
    var link = istar.addParticipatesInLink(el1, el2);
    ok(link.isParticipatesInLink());
});
QUnit.test('add Participates-In link from Actor to Role', function() {
    var el1 = istar.addActor();
    var el2 = istar.addRole();
    var link = istar.addParticipatesInLink(el1, el2);
    ok(link.isParticipatesInLink());
});
QUnit.test('add Participates-In link from Role to Actor', function() {
    var el1 = istar.addRole();
    var el2 = istar.addActor();
    var link = istar.addParticipatesInLink(el1, el2);
    ok(link.isParticipatesInLink());
});
QUnit.test('add Participates-In link from Actor to Agent', function() {
    var el1 = istar.addActor();
    var el2 = istar.addAgent();
    var link = istar.addParticipatesInLink(el1, el2);
    ok(link.isParticipatesInLink());
});
QUnit.test('add Participates-In link from Agent to Actor', function() {
    var el1 = istar.addAgent();
    var el2 = istar.addActor();
    var link = istar.addParticipatesInLink(el1, el2);
    ok(link.isParticipatesInLink());
});
QUnit.test('add Participates-In link from Role to Agent', function() {
    var el1 = istar.addRole();
    var el2 = istar.addAgent();
    var link = istar.addParticipatesInLink(el1, el2);
    ok(link.isParticipatesInLink());
});
QUnit.test('add Participates-In link from Agent to Role', function() {
    var el1 = istar.addAgent();
    var el2 = istar.addRole();
    var link = istar.addParticipatesInLink(el1, el2);
    ok(link.isParticipatesInLink());
});
QUnit.test('not add more than one Participates-In link between the same actors', function() {
    var el1 = istar.addActor();
    var el2 = istar.addActor();
    var link1 = istar.addParticipatesInLink(el1, el2);
    var link2 = istar.addParticipatesInLink(el1, el2);
    var link3 = istar.addParticipatesInLink(el2, el1);
    ok(link1.isParticipatesInLink());
    notOk(link2);
    notOk(link3);
});

QUnit.test('not add a Participates-In and a Is-A link (in this order) between the same actors ', function() {
    var el1 = istar.addActor();
    var el2 = istar.addActor();
    var link1 = istar.addParticipatesInLink(el1, el2);
    var link2 = istar.addIsALink(el1, el2);
    var link3 = istar.addIsALink(el2, el1);
    ok(link1.isParticipatesInLink());
    notOk(link2);
    notOk(link3);
});
QUnit.test('not add an Is-A and a Participates-In link (in this order) between the same actors ', function() {
    var el1 = istar.addActor();
    var el2 = istar.addActor();
    var link1 = istar.addIsALink(el1, el2);
    var link2 = istar.addParticipatesInLink(el1, el2);
    var link3 = istar.addParticipatesInLink(el2, el1);
    ok(link1.isIsALink());
    notOk(link2);
    notOk(link3);
});


QUnit.module('ElementsLinks', {

    beforeEach: function() {
        this.graph = new joint.dia.Graph();
		istar.setupModel(this.graph);
        istar.setupMetamodel(istarcoreMetamodel);
        createGoalModel(this);
    },

    afterEach: function() {
        delete this.graph;
    }
});

QUnit.test('module ok', function() {
    ok(true);
});

QUnit.test('add And-Refinement from Goal to Goal', function() {
    var link1 = istar.addAndRefinementLink(this.goal1, this.goal2);
    ok(link1.isAndRefinementLink());
});
QUnit.test('add 1 to M And-Refinements between different Goals', function() {
    var link1 = istar.addAndRefinementLink(this.goal2, this.goal1);
    var link2 = istar.addAndRefinementLink(this.goal3, this.goal1);
    ok(link1.isAndRefinementLink());
    ok(link2.isAndRefinementLink());
});
QUnit.test('add And-Refinement from Goal to Goal', function() {
    var link1 = istar.addAndRefinementLink(this.goal1, this.goal2);
    ok(link1.isAndRefinementLink());
});
QUnit.test('add And-Refinement from Task to Task', function() {
    var link1 = istar.addAndRefinementLink(this.task1, this.task2);
    ok(link1.isAndRefinementLink());
});
QUnit.test('not add more than 1 And-Refinements between the same pair of Tasks', function() {
    var link1 = istar.addAndRefinementLink(this.task1, this.task2);
    var link2 = istar.addAndRefinementLink(this.task1, this.task2);
    ok(link1.isAndRefinementLink());
    notOk(link2);
});
QUnit.test('add And-Refinement from Goal to Task', function() {
    var link1 = istar.addAndRefinementLink(this.goal1, this.task2);
    ok(link1.isAndRefinementLink());
});
QUnit.test('not add more than 1 And-Refinements between the same tuple of Goal,Task', function() {
    var link1 = istar.addAndRefinementLink(this.goal1, this.task2);
    var link2 = istar.addAndRefinementLink(this.goal1, this.task2);
    var link3 = istar.addAndRefinementLink(this.task2, this.goal1);
    ok(link1.isAndRefinementLink());
    notOk(link2);
    notOk(link3);
});
QUnit.test('add And-Refinement from Task to Goal', function() {
    var link1 = istar.addAndRefinementLink(this.task1, this.goal2);
    ok(link1.isAndRefinementLink());
});
QUnit.test('not add more than 1 And-Refinements between the same tuple of Task,Goal', function() {
    var link1 = istar.addAndRefinementLink(this.task1, this.goal2);
    var link2 = istar.addAndRefinementLink(this.task1, this.goal2);
    var link3 = istar.addAndRefinementLink(this.goal2, this.task1);
    ok(link1.isAndRefinementLink());
    notOk(link2);
    notOk(link3);
});
QUnit.test('not allow to add And-Refinement between Goal and Quality', function() {
    var link1 = istar.addAndRefinementLink(this.goal1, this.quality1);
    var link2 = istar.addAndRefinementLink(this.quality2, this.goal2);
    notOk(link1);
    notOk(link2);
});
QUnit.test('not allow to add And-Refinement between Goal and Resource', function() {
    var link1 = istar.addAndRefinementLink(this.goal1, this.resource1);
    var link2 = istar.addAndRefinementLink(this.resource2, this.goal1);
    notOk(link1);
    notOk(link2);
});
QUnit.test('not allow to add And-Refinement between Task and Quality', function() {
    var link1 = istar.addAndRefinementLink(this.task1, this.quality1);
    var link2 = istar.addAndRefinementLink(this.quality2, this.task2);
    notOk(link1);
    notOk(link2);
});
QUnit.test('not allow to add And-Refinement between Task and Resource', function() {
    var link1 = istar.addAndRefinementLink(this.task1, this.resource1);
    var link2 = istar.addAndRefinementLink(this.resource2, this.task2);
    notOk(link1);
    notOk(link2);
});
QUnit.test('not allow to add And-Refinement between Quality and Quality', function() {
    var link1 = istar.addAndRefinementLink(this.quality1, this.quality2);
    notOk(link1);
});
QUnit.test('not allow to add And-Refinement between Resource and Resource', function() {
    var link1 = istar.addAndRefinementLink(this.resource1, this.resource2);
    notOk(link1);
});
QUnit.test('not allow to add And-Refinement between Quality and Resource', function() {
    var link1 = istar.addAndRefinementLink(this.quality1, this.resource1);
    var link2 = istar.addAndRefinementLink(this.resource1, this.quality2);
    notOk(link1);
    notOk(link2);
});

QUnit.test('add Needed-By from Resource to Task', function() {
    var link1 = istar.addNeededByLink(this.resource1, this.task1);
    ok(link1.isNeededByLink());
});
QUnit.test('not add more than 1 Needed-By between the same tuple of Resource,Task', function() {
    var link1 = istar.addNeededByLink(this.resource1, this.task1);
    var link2 = istar.addNeededByLink(this.resource1, this.task1);
    ok(link1.isNeededByLink());
    notOk(link2);
});

QUnit.test('only allow valid Needed-By combinations', function() {
    var tuples = [
        {source:this.goal1, target:this.goal2, allow:false},
        {source:this.goal1, target:this.quality1, allow:false},
        {source:this.goal1, target:this.task1, allow:false},
        {source:this.goal1, target:this.resource1, allow:false},
        {source:this.quality1, target:this.goal1, allow:false},
        {source:this.quality1, target:this.quality2, allow:false},
        {source:this.quality1, target:this.task1, allow:false},
        {source:this.quality1, target:this.resource1, allow:false},
        {source:this.task1, target:this.goal1, allow:false},
        {source:this.task1, target:this.quality1, allow:false},
        {source:this.task1, target:this.task2, allow:false},
        {source:this.task1, target:this.resource1, allow:false},
        {source:this.resource1, target:this.goal1, allow:false},
        {source:this.resource1, target:this.quality1, allow:false},
        {source:this.resource1, target:this.task1, allow:true},
        {source:this.resource1, target:this.resource2, allow:false},
    ];
    testDifferentNodeLinksCombinations(this, tuples, 'addNeededByLink', 'isNeededByLink');
});
QUnit.test('only allow valid Contribution combinations', function() {
    var tuples = [
        {source:this.goal1, target:this.goal2, allow:false},
        {source:this.goal1, target:this.quality1, allow:true},
        {source:this.goal1, target:this.task1, allow:false},
        {source:this.goal1, target:this.resource1, allow:false},
        {source:this.quality1, target:this.goal1, allow:false},
        {source:this.quality1, target:this.quality2, allow:true},
        {source:this.quality1, target:this.task1, allow:false},
        {source:this.quality1, target:this.resource1, allow:false},
        {source:this.task1, target:this.goal1, allow:false},
        {source:this.task1, target:this.quality1, allow:true},
        {source:this.task1, target:this.task2, allow:false},
        {source:this.task1, target:this.resource1, allow:false},
        {source:this.resource1, target:this.goal1, allow:false},
        {source:this.resource1, target:this.quality1, allow:true},
        {source:this.resource1, target:this.task1, allow:false},
        {source:this.resource1, target:this.resource2, allow:false},
    ];
    testDifferentNodeLinksCombinations(this, tuples, 'addContributionLink', 'isContributionLink');
});

QUnit.test('add Qualification from Quality to Goal', function() {
    var link1 = istar.addQualificationLink(this.quality1, this.goal1);
    ok(link1.isQualificationLink());
});
QUnit.test('add Qualification from Quality to Task', function() {
    var link1 = istar.addQualificationLink(this.quality1, this.task1);
    ok(link1.isQualificationLink());
});
QUnit.test('add Qualification from Quality to Resource', function() {
    var link1 = istar.addQualificationLink(this.quality1, this.resource1);
    ok(link1.isQualificationLink());
});
QUnit.test('not add more than 1 Qualification between the same tuple of Quality,Goal', function() {
    var link1 = istar.addQualificationLink(this.quality1, this.goal1);
    var link2 = istar.addQualificationLink(this.quality1, this.goal1);
    ok(link1.isQualificationLink());
    notOk(link2);
});
QUnit.test('only allow valid Qualification combinations', function() {
    var tuples = [
        {source:this.goal1, target:this.goal2, allow:false},
        {source:this.goal1, target:this.quality1, allow:false},
        {source:this.goal1, target:this.task1, allow:false},
        {source:this.goal1, target:this.resource1, allow:false},
        {source:this.quality1, target:this.goal1, allow:true},
        {source:this.quality1, target:this.quality2, allow:false},
        {source:this.quality1, target:this.task1, allow:true},
        {source:this.quality1, target:this.resource1, allow:true},
        {source:this.task1, target:this.goal1, allow:false},
        {source:this.task1, target:this.quality1, allow:false},
        {source:this.task1, target:this.task2, allow:false},
        {source:this.task1, target:this.resource1, allow:false},
        {source:this.resource1, target:this.goal1, allow:false},
        {source:this.resource1, target:this.quality1, allow:false},
        {source:this.resource1, target:this.task1, allow:false},
        {source:this.resource1, target:this.resource2, allow:false},
    ];
    testDifferentNodeLinksCombinations(this, tuples, 'addQualificationLink', 'isQualificationLink');
});

function createGoalModel(context) {
    var actor = istar.addActor();

    context.goal1 = istar.addGoal();istar.embedNode(context.goal1, actor);
    context.goal2 = istar.addGoal();istar.embedNode(context.goal2, actor);
    context.goal3 = istar.addGoal();istar.embedNode(context.goal3, actor);
    context.quality1 = istar.addQuality();istar.embedNode(context.quality1, actor);
    context.quality2 = istar.addQuality();istar.embedNode(context.quality2, actor);
    context.task1 = istar.addTask();istar.embedNode(context.task1, actor);
    context.task2 = istar.addTask();istar.embedNode(context.task2, actor);
    context.resource1 = istar.addResource();istar.embedNode(context.resource1, actor);
    context.resource2 = istar.addResource();istar.embedNode(context.resource2, actor);
}

function testDifferentNodeLinksCombinations (context, tuples, addFunctionName, isFunctionName) {
    for (var i = 0; i < tuples.length; i++) {
        istar.clearModel();
        createGoalModel(context);
        var link = istar[addFunctionName](tuples[i].source, tuples[i].target);
        var description = tuples[i].source.prop('type') + ' -> ' + tuples[i].target.prop('type');
        description += '  -  isValid:' + tuples[i].allow;
        if (tuples[i].allow) {
                ok(link[isFunctionName](), description);
        }
        else {
            notOk(link, description);
        }
    }
}
