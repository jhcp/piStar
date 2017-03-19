/*! This is open-source. Feel free to use, modify, redistribute, and so on.
 */
examples = {};
examples.smallExample = function () {
	ui.clearDiagram();
	var actor = istar.addActor(49,49,'a1');
	this.goal1 = istar.addGoal(200,88,'g1');istar.embedNode(this.goal1, actor);
	this.goal2 = istar.addGoal(110,170,'g2');istar.embedNode(this.goal2, actor);
	this.goal3 = istar.addGoal(267,170,'g3');istar.embedNode(this.goal3, actor);
	this.quality1 = istar.addQuality(510,250,'q1');istar.embedNode(this.quality1, actor);
	this.quality2 = istar.addQuality(440,100,'q2');istar.embedNode(this.quality2, actor);
	this.task1 = istar.addTask(150,270,'t1');istar.embedNode(this.task1, actor);
	this.task2 = istar.addTask(315,260,'t2');istar.embedNode(this.task2, actor);
	this.resource1 = istar.addResource(335,340,'r1');istar.embedNode(this.resource1, actor);
	this.resource2 = istar.addResource(560,180,'r2');istar.embedNode(this.resource2, actor);
	istar.addAndRefinementLink(this.goal2, this.goal1);
	istar.addAndRefinementLink(this.goal3, this.goal1);
	istar.addOrRefinementLink(this.task1, this.goal3);
	istar.addOrRefinementLink(this.task2, this.goal3);
	istar.addNeededByLink(this.resource1, this.task2);
	istar.addContributionLink(this.resource1, this.quality1, 'hurt');
	istar.addContributionLink(this.task2, this.quality2, 'make');
	istar.addQualificationLink(this.quality2, this.resource2);
	this.resource1.translate(1);//trick to resize the actor's bounday
};

examples.justAnActor = function () {
	var actor = istar.addActor(119,49,'Researcher');
	this.goal1 = istar.addGoal(200,88,'i* models created');istar.embedNode(this.goal1, actor);
};

examples.pistarIntro = function () {
	var actor = istar.addActor(119,49,'Researcher');
	this.goal1 = istar.addGoal(320,88,'i* models created');istar.embedNode(this.goal1, actor);
	this.task1 = istar.addTask(290,170,'Use piStar');istar.embedNode(this.task1, actor);
	this.quality1 = istar.addQuality(190,65,'Good Quality');istar.embedNode(this.quality1, actor);
	istar.addAndRefinementLink(this.task1, this.goal1);
	istar.addContributionLink(this.task1, this.quality1, 'help')
		.set('vertices', [{ x: 200, y: 180 }])
		.set('smooth', true)
		.on('change:vertices', ui._toggleSmoothness);;

	// console.log(link);
	this.task1.translate(1);//trick to resize the actor's bounday
};

examples.travelReimbursement = function () {
	ui.clearDiagram();
	var student = 	istar.addRole(244,29,'Student', {id:'830b5ef8-0f41-4a17-ba2a-ba4a8f4e799b'});
	student.embedNode(	istar.addGoal(598,29,'Travel organized', {id:'8f5b5975-10bc-44b5-92b2-c53e2394b2c9'})	);
	student.embedNode(	istar.addGoal(394,91,'Authorization obtained', {id:'d7350e31-1d29-46b0-bce5-e191189720cd'})	);
	student.embedNode(	istar.addGoal(321,160,'Request prepared', {id:'c3f53c8d-b421-4c60-8dbf-03b07978295b'})	);
	student.embedNode(	istar.addGoal(491,145,'Authorization signed', {id:'4e767af4-fd1e-4e3e-8a82-3740521e576a'})	);
	student.embedNode(	istar.addTask(244,229,'Fill in paper form', {id:'191249f9-d249-47db-b5f2-c09449307eb4'})	);
	student.embedNode(	istar.addTask(356,267,'Fill in online form', {id:'9bb7e927-3dee-4485-8fda-01954d324c88'})	);
	student.embedNode(	istar.addQuality(276,378,'No errors', {id:'0055d468-1097-43b2-95bf-1781730b1985'})	);
	student.embedNode(	istar.addTask(431,215,'Supervisor authorizes', {id:'37b28c3f-7554-4c62-91cd-44cac0873977'})	);
	student.embedNode(	istar.addTask(546,251,'Head-of-dept authorizes', {id:'102cbb1c-5600-4058-bed9-cc9e1ad1d9e9'})	);
	student.embedNode(	istar.addQuality(423,388,'Quick booking', {id:'0afa08e3-2306-40c8-9d40-2c144b748664'})	);
	student.embedNode(	istar.addGoal(741,184,'Trip booked', {id:'16d9b9bf-fdef-4832-8f7d-8dcb42513371'})	);
	student.embedNode(	istar.addGoal(678,261,'Trip parts booked', {id:'d8991d04-c2a6-45f0-a3ed-3ebed2a2d86d'})	);
	student.embedNode(	istar.addTask(855,281,'Bundle booked', {id:'f2ad4e2a-1b6d-44ce-94d7-28aee4e08d3d'})	);
	student.embedNode(	istar.addGoal(634,342,'Tickets booked', {id:'f34b98b9-6cba-4410-8a49-451e00049e43'})	);
	student.embedNode(	istar.addGoal(796,331,'Accommodati on booked', {id:'94b43d28-480c-4a22-92ed-c8ba69a1d111'})	);
	student.embedNode(	istar.addTask(544,410,'Agency buys tickets', {id:'4934265e-abf6-4fe1-91c9-38c2a6aadcb0'})	);
	student.embedNode(	istar.addTask(709,406,'Self-book tickets', {id:'11d870d2-7987-45c9-a36a-7b177219ae50'})	);
	student.embedNode(	istar.addGoal(811,415,'Conference hotel booked', {id:'89643e71-e10f-4474-9ac6-3ddd413bfda8'})	);
	student.embedNode(	istar.addGoal(980,358,'Budget hotel booked', {id:'b73684df-4238-47d2-ae5a-e9d88df9559a'})	);
	student.embedNode(	istar.addTask(631,504,'Buy tickets', {id:'1747e206-fa35-4229-b4be-67b3893e84d1'})	);
	student.embedNode(	istar.addTask(758,498,'Pay for tickets', {id:'49da8a06-b243-4c6e-9c50-dded496bec94'})	);
	student.embedNode(	istar.addResource(667,555,'Credit card', {id:'8a867e08-5a70-4816-ab02-1d84cf1b79dd'})	);
	student.embedNode(	istar.addTask(946,446,'Buy through booking.com', {id:'13efea03-96a0-4162-b89e-f46efc9a96c4'})	);
	student.embedNode(	istar.addTask(1042,478,'Buy through hotel website', {id:'59d154e2-8af7-48da-9f55-195ffebab399'})	);
	student.embedNode(	istar.addQuality(543,578,'Comfort', {id:'c8e311fd-2a1a-40f1-b5e5-c62eb3e3a397'})	);
	student.embedNode(	istar.addQuality(911,596,'Minimal own payments', {id:'685e4589-9717-487f-aa94-2eab2f7c5b46'})	);
	student = 	istar.addAgent(205,768,'Univ. trip mgmt IS', {id:'9ebf064b-88e2-48e0-9a63-7adda0ae89d0'})	;
	student.embedNode(	istar.addTask(289,800,'Process form', {id:'ac7c22c2-6538-4fe3-a14f-8f8a2233a472'})	);
	student.embedNode(	istar.addGoal(213,866,'Details validated', {id:'7897dbdc-5dd5-4332-9e31-cac22e01f1e1'})	);
	student.embedNode(	istar.addTask(253,909,'Request authorization', {id:'609eedc5-29e7-4360-b9ad-5ca23076033c'})	);
	student.embedNode(	istar.addTask(339,866,'Notify applicant', {id:'334c70d0-7786-4dda-8340-aa63c921bc03'})	);
	student = 	istar.addRole(105,67,'PhD student', {id:'c7b6f310-8fab-4181-8323-a4190cd35c26'})	;
	student.collapse();
	student = 	istar.addAgent(148,276,'Mike White', {id:'77f4dfe4-1af2-4271-bbfa-0f5892cad0e4'})	;
	student.collapse();
	student = 	istar.addAgent(168,572,'Univ. of Wonder-Land', {id:'a0b5233e-414b-4c96-b87c-45d3167c1ea6'})	;
	student.collapse();
	student = 	istar.addActor(1184,676,'Travel agency', {id:'3c57900f-ba6a-4277-ba86-a688b23628a8'})	;
	student.embedNode(	istar.addTask(1302,694,'Book bundle via expedia', {id:'9544119c-dd79-417e-8a19-6f67455d784b'})	);
	istar.addGoal(327,704,'Online form processed', {id:'fe9bc590-394b-4585-be24-66419eb353b9'})	;
	istar.addGoal(1193,315,'Trip bundle booked', {id:'dc25d9f6-7aea-46fd-8b59-1e317f5017f1'})	;
	istar.addTask(668,800,'Buy flight tickets', {id:'f26ec7d2-3133-42b0-b54c-2b4695e9ee1b'})	;
	istar.addAndRefinementLink(istar.graph.getCell('7897dbdc-5dd5-4332-9e31-cac22e01f1e1'),istar.graph.getCell('ac7c22c2-6538-4fe3-a14f-8f8a2233a472'));
	istar.addAndRefinementLink(istar.graph.getCell('609eedc5-29e7-4360-b9ad-5ca23076033c'),istar.graph.getCell('ac7c22c2-6538-4fe3-a14f-8f8a2233a472'));
	istar.addAndRefinementLink(istar.graph.getCell('334c70d0-7786-4dda-8340-aa63c921bc03'),istar.graph.getCell('ac7c22c2-6538-4fe3-a14f-8f8a2233a472'));
	istar.addIsALink(istar.graph.getCell('c7b6f310-8fab-4181-8323-a4190cd35c26'),istar.graph.getCell('830b5ef8-0f41-4a17-ba2a-ba4a8f4e799b'));
	istar.addParticipatesInLink(istar.graph.getCell('77f4dfe4-1af2-4271-bbfa-0f5892cad0e4'),istar.graph.getCell('c7b6f310-8fab-4181-8323-a4190cd35c26'));
	istar.addAndRefinementLink(istar.graph.getCell('d7350e31-1d29-46b0-bce5-e191189720cd'),istar.graph.getCell('8f5b5975-10bc-44b5-92b2-c53e2394b2c9'));
	istar.addAndRefinementLink(istar.graph.getCell('c3f53c8d-b421-4c60-8dbf-03b07978295b'),istar.graph.getCell('d7350e31-1d29-46b0-bce5-e191189720cd'));
	istar.addAndRefinementLink(istar.graph.getCell('4e767af4-fd1e-4e3e-8a82-3740521e576a'),istar.graph.getCell('d7350e31-1d29-46b0-bce5-e191189720cd'));
	istar.addOrRefinementLink(istar.graph.getCell('191249f9-d249-47db-b5f2-c09449307eb4'),istar.graph.getCell('c3f53c8d-b421-4c60-8dbf-03b07978295b'));
	istar.addOrRefinementLink(istar.graph.getCell('9bb7e927-3dee-4485-8fda-01954d324c88'),istar.graph.getCell('c3f53c8d-b421-4c60-8dbf-03b07978295b'));
	istar.addQualificationLink(istar.graph.getCell('0055d468-1097-43b2-95bf-1781730b1985'),istar.graph.getCell('c3f53c8d-b421-4c60-8dbf-03b07978295b'));
	istar.addOrRefinementLink(istar.graph.getCell('37b28c3f-7554-4c62-91cd-44cac0873977'),istar.graph.getCell('4e767af4-fd1e-4e3e-8a82-3740521e576a'));
	istar.addOrRefinementLink(istar.graph.getCell('102cbb1c-5600-4058-bed9-cc9e1ad1d9e9'),istar.graph.getCell('4e767af4-fd1e-4e3e-8a82-3740521e576a'));
	istar.addContributionLink(istar.graph.getCell('191249f9-d249-47db-b5f2-c09449307eb4'),istar.graph.getCell('0055d468-1097-43b2-95bf-1781730b1985'),'hurt');
	istar.addContributionLink(istar.graph.getCell('9bb7e927-3dee-4485-8fda-01954d324c88'),istar.graph.getCell('0055d468-1097-43b2-95bf-1781730b1985'),'help');
	istar.addContributionLink(istar.graph.getCell('37b28c3f-7554-4c62-91cd-44cac0873977'),istar.graph.getCell('0afa08e3-2306-40c8-9d40-2c144b748664'),'help');
	istar.addContributionLink(istar.graph.getCell('102cbb1c-5600-4058-bed9-cc9e1ad1d9e9'),istar.graph.getCell('0afa08e3-2306-40c8-9d40-2c144b748664'),'break');
	istar.addAndRefinementLink(istar.graph.getCell('16d9b9bf-fdef-4832-8f7d-8dcb42513371'),istar.graph.getCell('8f5b5975-10bc-44b5-92b2-c53e2394b2c9'));
	istar.addOrRefinementLink(istar.graph.getCell('d8991d04-c2a6-45f0-a3ed-3ebed2a2d86d'),istar.graph.getCell('16d9b9bf-fdef-4832-8f7d-8dcb42513371'));
	istar.addOrRefinementLink(istar.graph.getCell('f2ad4e2a-1b6d-44ce-94d7-28aee4e08d3d'),istar.graph.getCell('16d9b9bf-fdef-4832-8f7d-8dcb42513371'));
	istar.addAndRefinementLink(istar.graph.getCell('f34b98b9-6cba-4410-8a49-451e00049e43'),istar.graph.getCell('d8991d04-c2a6-45f0-a3ed-3ebed2a2d86d'));
	istar.addAndRefinementLink(istar.graph.getCell('94b43d28-480c-4a22-92ed-c8ba69a1d111'),istar.graph.getCell('d8991d04-c2a6-45f0-a3ed-3ebed2a2d86d'));
	istar.addOrRefinementLink(istar.graph.getCell('4934265e-abf6-4fe1-91c9-38c2a6aadcb0'),istar.graph.getCell('f34b98b9-6cba-4410-8a49-451e00049e43'));
	istar.addOrRefinementLink(istar.graph.getCell('11d870d2-7987-45c9-a36a-7b177219ae50'),istar.graph.getCell('f34b98b9-6cba-4410-8a49-451e00049e43'));
	istar.addOrRefinementLink(istar.graph.getCell('89643e71-e10f-4474-9ac6-3ddd413bfda8'),istar.graph.getCell('94b43d28-480c-4a22-92ed-c8ba69a1d111'));
	istar.addOrRefinementLink(istar.graph.getCell('b73684df-4238-47d2-ae5a-e9d88df9559a'),istar.graph.getCell('94b43d28-480c-4a22-92ed-c8ba69a1d111'));
	istar.addAndRefinementLink(istar.graph.getCell('1747e206-fa35-4229-b4be-67b3893e84d1'),istar.graph.getCell('11d870d2-7987-45c9-a36a-7b177219ae50'));
	istar.addAndRefinementLink(istar.graph.getCell('49da8a06-b243-4c6e-9c50-dded496bec94'),istar.graph.getCell('11d870d2-7987-45c9-a36a-7b177219ae50'));
	istar.addNeededByLink(istar.graph.getCell('8a867e08-5a70-4816-ab02-1d84cf1b79dd'),istar.graph.getCell('49da8a06-b243-4c6e-9c50-dded496bec94'));
	istar.addOrRefinementLink(istar.graph.getCell('13efea03-96a0-4162-b89e-f46efc9a96c4'),istar.graph.getCell('b73684df-4238-47d2-ae5a-e9d88df9559a'));
	istar.addOrRefinementLink(istar.graph.getCell('59d154e2-8af7-48da-9f55-195ffebab399'),istar.graph.getCell('b73684df-4238-47d2-ae5a-e9d88df9559a'));
	istar.addParticipatesInLink(istar.graph.getCell('9ebf064b-88e2-48e0-9a63-7adda0ae89d0'),istar.graph.getCell('a0b5233e-414b-4c96-b87c-45d3167c1ea6'));
	istar.addQualificationLink(istar.graph.getCell('0afa08e3-2306-40c8-9d40-2c144b748664'),istar.graph.getCell('d8991d04-c2a6-45f0-a3ed-3ebed2a2d86d'));
	istar.addContributionLink(istar.graph.getCell('11d870d2-7987-45c9-a36a-7b177219ae50'),istar.graph.getCell('0afa08e3-2306-40c8-9d40-2c144b748664'),'help');
	istar.addContributionLink(istar.graph.getCell('0afa08e3-2306-40c8-9d40-2c144b748664'),istar.graph.getCell('c8e311fd-2a1a-40f1-b5e5-c62eb3e3a397'),'help');
	istar.addContributionLink(istar.graph.getCell('685e4589-9717-487f-aa94-2eab2f7c5b46'),istar.graph.getCell('c8e311fd-2a1a-40f1-b5e5-c62eb3e3a397'),'help');
	istar.addContributionLink(istar.graph.getCell('4934265e-abf6-4fe1-91c9-38c2a6aadcb0'),istar.graph.getCell('685e4589-9717-487f-aa94-2eab2f7c5b46'),'help');
	istar.addContributionLink(istar.graph.getCell('11d870d2-7987-45c9-a36a-7b177219ae50'),istar.graph.getCell('685e4589-9717-487f-aa94-2eab2f7c5b46'),'hurt');
	istar.addContributionLink(istar.graph.getCell('f2ad4e2a-1b6d-44ce-94d7-28aee4e08d3d'),istar.graph.getCell('685e4589-9717-487f-aa94-2eab2f7c5b46'),'make');
	istar.addDependencyLink(istar.graph.getCell('9bb7e927-3dee-4485-8fda-01954d324c88'), istar.graph.getCell('fe9bc590-394b-4585-be24-66419eb353b9'), istar.graph.getCell('ac7c22c2-6538-4fe3-a14f-8f8a2233a472'));
	istar.addDependencyLink(istar.graph.getCell('f2ad4e2a-1b6d-44ce-94d7-28aee4e08d3d'), istar.graph.getCell('dc25d9f6-7aea-46fd-8b59-1e317f5017f1'), istar.graph.getCell('9544119c-dd79-417e-8a19-6f67455d784b'));
	istar.addDependencyLink(istar.graph.getCell('4934265e-abf6-4fe1-91c9-38c2a6aadcb0'), istar.graph.getCell('f26ec7d2-3133-42b0-b54c-2b4695e9ee1b'), istar.graph.getCell('3c57900f-ba6a-4277-ba86-a688b23628a8'));
	istar.graph.getCell('fe9bc590-394b-4585-be24-66419eb353b9').prop('position/x', 327);
	istar.graph.getCell('fe9bc590-394b-4585-be24-66419eb353b9').prop('position/y', 704);
	istar.graph.getCell('dc25d9f6-7aea-46fd-8b59-1e317f5017f1').prop('position/x', 1193);
	istar.graph.getCell('dc25d9f6-7aea-46fd-8b59-1e317f5017f1').prop('position/y', 315);
	istar.graph.getCell('f26ec7d2-3133-42b0-b54c-2b4695e9ee1b').prop('position/x', 668);
	istar.graph.getCell('f26ec7d2-3133-42b0-b54c-2b4695e9ee1b').prop('position/y', 800);
};

examples.experimentExample = function () {
	console.log('Go drink some water, this will take a while');
	var actor = istar.addActor(23, 23, 'Actor');
	for (var i = 1; i <= 40; i++) {
		 for (var j = 0; j < 25; j++)
		{
			var kindOfElement = examples.util.randomIntegerFromMinToMax(0, 4);
			var x = 10+i*30;
			var y = 10 + j*30;
			var name = 'element ' + (j*40 + i);
			var priority = examples.util.randomIntegerFromMinToMax(1, 101);

			var creationFunction = istar.addGoal;
			if (kindOfElement === 1) creationFunction = istar.addQuality;
			else if (kindOfElement === 2) creationFunction = istar.addTask;
			else if (kindOfElement === 3) creationFunction = istar.addResource;
			var newElement = creationFunction(x, y, name);
			newElement.prop('customProperties/Priority', priority);
			actor.embedNode(newElement);
		}
	}
};

examples.util = {};
examples.util.randomIntegerFromMinToMax = function(min, max) {
	//min (included)
	//max (excluded)
	return Math.floor(Math.random() * (max - min)) + min;
};
