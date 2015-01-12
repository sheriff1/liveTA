var epochFrom = -1;
var epochTo = -1;
var chipsDiv = [];
var inView = [];
var notInView = [];
var cD= document.getElementsByClassName("incomplete");
var completedDiv = document.getElementsByClassName("completed");
var chips = [];
var completed = [];

/*
COLOR: CATEGORY
BLUE: 	0
RED: 	1
GREEN: 	2
YELLOW: 3
ORANGE: 4
PURPLE: 5

currentView: [focus, filter, complete]
focus:
   -1: no focus
	0: priority
	1: no priority
	2: upcoming
	3: from todo app
	4: from calendar app
	5: from email app
filter:
   -1: no filter
	0: category 0
	1: category 1
	2: category 2
	3: category 3
	4: category 4
	5: category 5
	6: date
completekey: "value", 
	0: view all
	1: view completed
*/
var currentView = [-1, -1, 0];


$(document).ready(function(){
	setInitData();
	initButtons();
	setInterval(function(){updateData(); console.log("YIP");},(180000));
});

function initData(){
	for (var i = chips.length - 1; i >= 0; i--) {
		placeChip(chips[i]);
	}
	for (var i = completed.length - 1; i >= 0; i--) {
		placeChip(completed[i]);
	}

	for (var i = cD.length - 1; i >= 0; i--) {
		chipsDiv.push(cD[i]);
	}
}

function setData(){
	for (var i = chips.length - 1; i >= 0; i--) {
		placeChip(chips[i]);
	}
	for (var i = completed.length - 1; i >= 0; i--) {
		placeChip(completed[i]);
	}

	for (var i = cD.length - 1; i >= 0; i--) {
		chipsDiv.push(cD[i]);
	}

	if($(inView[0]).hasClass("completed")){ //show complete chips
		$('.incomplete').hide();
		$('.completed').show();
		$('.past').show();
		$('.description-left').hide();
		$('.description-right').hide();
		inView = completedDiv;
		notInView = [];
		$(this).siblings('#filter, #focus').prop('disabled', true);
		currentView = [-1,-1,1];
		checkFilter();
		checkFocus();
		updateViewStatus();
	}
	else{ //show incomplete chips
		$('.incomplete').show();
		$('.completed').hide();
		$('.past').hide();
		$('.description-left').hide();
		$('.description-right').hide();
		inView = chipsDiv;
		notInView = [];
		$(this).siblings('#filter, #focus').prop('disabled', false);
		currentView = [-1,-1,0];
		checkFilter();
		checkFocus();
		updateViewStatus();
	}
}

function placeChip(chip){
	var todo = document.createElement('div');
	todo.id = chip.ID;
	addDetails(todo, chip);
	document.body.appendChild(todo);
}

function addDetails(todo,chip){
	//CATEGORY + COLOR
	setCatAndColor(todo,chip);

	//PRIORITY
	setPriority(todo,chip);

	//POSITION
	$(todo).css({"position":"absolute", "top": chip.gridY, "left": chip.gridX});

	//SOURCE
	setSource(todo,chip);

	//DESCRIPTION PLACEMENT
	setDescription(todo,chip);

	//EVENT LISTENER
	$(todo).click(function()
	{
		chip.clickCount++;
		showChipInfo(todo, chip);
		//console.log("ClickCount for " + chip.ID + " is: " + chip.clickCount);
	});

	checkCompleted(todo,chip);
}

function checkCompleted(todo,chip){
	if(chip.isComplete)
	{
		$(todo).append('<div class="complete-marker"><i class="fa fa-check"></i></div>');
		todo.className += " completed";
	}
	else if (chip.isPast)
	{
		$(todo).append('<div class="complete-marker"><i class="fa fa-clock-o"></i></div>');
		todo.className += " completed past";
	}
}

function showChipInfo(todo,chip){
	if($(todo).hasClass("completed") || $(todo).hasClass("past") )
	{
		$(todo).siblings(".completed").toggle(100);
	}
	else if($(todo).hasClass("incomplete"))
	{
		for (var i = inView.length - 1; i >= 0; i--) {
			if($(inView[i]).get(0).id != $(todo).get(0).id)
			{$(inView[i]).toggle(100);}
		};
	}
	$('#filterMenu').hide();
	$('#focusMenu').hide();
	$('#categoryMenu').hide();
	$('#dateMenu').hide();
	$(todo).css({"overflow": "visible"});
	$(todo).children(".description-left").toggle();
	$(todo).children(".description-right").toggle();
}

function setCatAndColor(todo,chip){
	switch (chip.category) {
		case 0:
		todo.className += "chip blue"

		if(chip.isUpcoming)
			{todo.className += " upcoming-blue"; }

		var catName = document.createElement('div');
		catName.className += "category";
		$(catName).text(chip.categoryName.toUpperCase());
		todo.appendChild(catName);

		break;
		case 1:
		todo.className += "chip red"

		if(chip.isUpcoming)
			{ todo.className += " upcoming-red"; }

		var catName = document.createElement('div');
		catName.className += "category";
		$(catName).text(chip.categoryName.toUpperCase());
		todo.appendChild(catName);

		break;
		case 2:
		todo.className += "chip green"

		if(chip.isUpcoming)
			{ todo.className += " upcoming-green"; }

		var catName = document.createElement('div');
		catName.className += "category";
		$(catName).text(chip.categoryName.toUpperCase());
		todo.appendChild(catName);

		break;
		case 3:
		todo.className += "chip yellow"

		if(chip.isUpcoming)
			{ todo.className += " upcoming-yellow"; }

		var catName = document.createElement('div');
		catName.className += "category";
		$(catName).text(chip.categoryName.toUpperCase());
		todo.appendChild(catName);

		break;
		case 4:
		todo.className += "chip orange"

		if(chip.isUpcoming)
			{ todo.className += " upcoming-orange"; }

		var catName = document.createElement('div');
		catName.className += "category";
		$(catName).text(chip.categoryName.toUpperCase());
		todo.appendChild(catName);

		break;
		case 5:
		todo.className += "chip purple"

		if(chip.isUpcoming)
			{ todo.className += " upcoming-purple"; }

		var catName = document.createElement('div');
		catName.className += "category";
		$(catName).text(chip.categoryName.toUpperCase());
		todo.appendChild(catName);

		break;
	}
	if(!(chip.isPast || chip.isComplete))
	{
		{todo.className += " incomplete";}
	}
}

function setPriority(todo,chip){
	if(chip.priority && !(chip.isComplete || chip.isPast))
	{
		var priority = document.createElement('div');
		priority.className += "priority";
		$(priority).text("! ! !");
		todo.appendChild(priority);
	}
}

function setSource(todo,chip){
	var source = document.createElement('div');
	if(chip.source=="email"){
		source.className += "email";
		$(source).html('<i class="fa fa-envelope"></i>');
		todo.appendChild(source);
	}
	else if(chip.source=="list"){
		source.className += "list";
		$(source).html('<i class="fa fa-list-ul"></i>');
		todo.appendChild(source);
	}
	else if(chip.source=="cal"){
		source.className += "cal";
		$(source).html('<i class="fa fa-calendar"></i>');
		todo.appendChild(source);
	}
}

function setDescription(todo,chip){
	var description = document.createElement('div');
	var options = {timeZone:'UTC', timeZoneName: 'short'};
	if(!(isNaN(chip.date)) && chip.source=="cal" && (chip.date.toUTCString().substring(17,29) == "00:00:00 GMT"))
	{
		$(description).html("Task: "+chip.description+"<br><br> Date: "+chip.date.toUTCString().substring(16,-1)+"<br><br> Calendar label: "+chip.label);
	}
	else if(!(isNaN(chip.date)) && chip.source=="cal")
	{
		$(description).html("Task: "+chip.description+"<br><br> Date: "+chip.date.toString().substring(21,-1).splicenstein(3,0,", ").splicenstein(17,0, " at ")+"<br><br> Calendar label: "+chip.label);
	}
	else if(!(isNaN(chip.date)) && chip.source=="list")
	{
		$(description).html("Task: "+chip.description+"<br><br> Date: "+chip.date.toUTCString().substring(16,-1)+"<br><br> Project label: "+chip.label);
	}
	else if(chip.source=="list")
	{
		$(description).html("Task: "+chip.description+"<br><br> Project label: "+chip.label);
	}
	else
	{
		$(description).html("Task: "+chip.description+"<br><br>");
	}

	if(chip.gridX < 512)
	{
		description.className += "description-right";
	}
	else
	{
		description.className += "description-left";
	}
	if(chip.gridY < 384)
	{
		description.className += " above";
	}
	else
	{
		description.className += " below";
	}

	todo.appendChild(description);
}

function initButtons(){

	//Focus Menu
	$('#focus').click(function(){
		$('#focusMenu').toggle(200);
		$('#filterMenu').hide();
	});

	//Filter Menu
	$('#filter').click(function(){
		$('#categoryMenu').hide();
		$('#dateMenu').hide();
		$('#filterMenu').toggle(200);
		$('#focusMenu').hide();
	});
	//View All
	$('#viewAll').click(setDefaultView);

	//View Completed
	$('#viewComp').click(function(){
		$('.incomplete').hide();
		$('.completed').show();
		$('.past').show();
		$('#focusMenu').hide();
		$('#filterMenu').hide();
		inView=completedDiv;
		$(this).siblings('#filter, #focus').prop('disabled', true);
		currentView[2] = 1;
		updateViewStatus();
	});

	//Refresh
	$('#refresh').click(function(){
		updateData();
		// $(this).siblings('#filter, #focus').prop('disabled', false);
		// currentView[0]=-1;
		// currentView[1]=-1;
		// currentView[2]= 0;
		// updateViewStatus();
	});

	//Settings
	$('#settings').click(function(){
		$(this).siblings('#filter, #focus').prop('disabled', false);
		window.location.href = "http://localhost/taskambient/settings.php";
	});

	/**********************************************************************************************
	 ALL FUNCTIONS OF FOCUS AND FILTER STEPS MAY BE PUT IN AND CALLED THROUGH "updateViewStatus()"
	**********************************************************************************************/
	/*
		FOCUS STEPS:
		1) set currentView[0]
		2) show all chips
		3) check if any filters are on and hide chips accordingly
		4) hide chips that are not in whichever focus is selected
	*/

	//Priority Focus:  find all chips with .priority child
	$("#priority-focus").click(function(){
		inView = [];
		notInView = [];
		$(chipsDiv).show();

		checkFilter();

		for (var i = chipsDiv.length - 1; i >= 0; i--) {
			if($(chipsDiv[i]).children('.priority').length <= 0)
			{
				notInView.push(chipsDiv[i]);
			}
			else
			{
				inView.push(chipsDiv[i]);
			}
		}

		currentView[0]=0;
		updateViewStatus();
	});

	//No Priority Focus: find all chips without .priority child
	$("#no-priority-focus").click(function(){
		inView = [];
		notInView = [];
		$(chipsDiv).show();

		checkFilter();

		for (var i = chipsDiv.length - 1; i >= 0; i--) {
			if($(chipsDiv[i]).children('.priority').length > 0)
			{
				notInView.push(chipsDiv[i]);
			}
			else
			{
				inView.push(chipsDiv[i]);
			}
		}

		currentView[0]=1;
		updateViewStatus();
	});

	//Upcoming Focus: find all chips with .upcoming-(red,green,blue,orange,purple,yellow) in to-do class
	$("#upcoming-focus").click(function(){
		inView = [];
		notInView = [];
		$(chipsDiv).show();

		checkFilter();

		for (var i = chipsDiv.length - 1; i >= 0; i--) {
			if(!($(chipsDiv[i]).hasClass('upcoming-blue')||
				$(chipsDiv[i]).hasClass('upcoming-red')||
				$(chipsDiv[i]).hasClass('upcoming-green')||
				$(chipsDiv[i]).hasClass('upcoming-yellow')||
				$(chipsDiv[i]).hasClass('upcoming-purple')||
				$(chipsDiv[i]).hasClass('upcoming-orange')))
			{
				notInView.push(chipsDiv[i]);
			}
			else
			{
				inView.push(chipsDiv[i]);
			}
		}

		currentView[0]=2;
		updateViewStatus();
	});

	//Todo Focus: find all chips with .source-list child
	$("#todo-focus").click(function(){
		inView = [];
		notInView = [];
		$(chipsDiv).show();

		checkFilter();

		for (var i = chipsDiv.length - 1; i >= 0; i--) {
			if($(chipsDiv[i]).children('.list').length <= 0)
			{
				notInView.push(chipsDiv[i]);
			}
			else
			{
				inView.push(chipsDiv[i]);
			}
		}

		currentView[0]=3;
		updateViewStatus();
	});

	//Email Focus: find all chips with .source-email child
	$("#email-focus").click(function(){
		inView = [];
		notInView = [];
		$(chipsDiv).show();

		checkFilter();

		for (var i = chipsDiv.length - 1; i >= 0; i--) {
			if($(chipsDiv[i]).children('.email').length <= 0)
			{
				notInView.push(chipsDiv[i]);
			}
			else
			{
				inView.push(chipsDiv[i]);
			}
		}

		currentView[0]=5;
		updateViewStatus();
	});

	//Calendar Focus: find all chips with .source-cal child
	$("#calendar-focus").click(function(){
		inView = [];
		notInView = [];
		$(chipsDiv).show();

		checkFilter();
		
		for (var i = chipsDiv.length - 1; i >= 0; i--) {
			if($(chipsDiv[i]).children('.cal').length <= 0)
			{
				notInView.push(chipsDiv[i]);
			}
			else
			{
				inView.push(chipsDiv[i]);
			}
		}

		currentView[0]=4;
		updateViewStatus();
	});

	/*
		FILTER STEPS:
		1) set currentView[1]
		2) show all chips
		3) check if any focuses are on and hide chips accordingly
		4) hide chips that are not in whichever filter is selected
	*/

	//Category Filter: find all chips with .(red,green,blue,orange,purple,yellow) in to-do class
	$("#category-filter").click(function(){
		$('#dateMenu').hide();
		$("#categoryMenu").toggle(200);
		//use "numCategories" to see how many colors need to be shown
	});

	//functions for all show/hide for individual categories
	$("#cat0").click(function(){
		inView = [];
		notInView = [];
		$(chipsDiv).show();

		checkFocus();

		for (var i = chipsDiv.length - 1; i >= 0; i--) {
			if(!($(chipsDiv[i]).hasClass('blue')))
			{
				notInView.push(chipsDiv[i]);
			}
			else
			{
				inView.push(chipsDiv[i]);
			}
		}

		currentView[1] = 0;
		updateViewStatus();
	});
	$("#cat1").click(function(){
		inView = [];
		notInView = [];
		$(chipsDiv).show();

		checkFocus();

		for (var i = chipsDiv.length - 1; i >= 0; i--) {
			if(!($(chipsDiv[i]).hasClass('red')))
			{
				notInView.push(chipsDiv[i]);
			}
			else
			{
				inView.push(chipsDiv[i]);
			}
		}

		currentView[1] = 1;
		updateViewStatus();
	});
	$("#cat2").click(function(){
		inView = [];
		notInView = [];
		$(chipsDiv).show();

		checkFocus();

		for (var i = chipsDiv.length - 1; i >= 0; i--) {
			if(!($(chipsDiv[i]).hasClass('green')))
			{
				notInView.push(chipsDiv[i]);
			}
			else
			{
				inView.push(chipsDiv[i]);
			}
		}

		currentView[1] = 2;
		updateViewStatus();
	});
	$("#cat3").click(function(){
		inView = [];
		notInView = [];
		$(chipsDiv).show();

		checkFocus();

		for (var i = chipsDiv.length - 1; i >= 0; i--) {
			if(!($(chipsDiv[i]).hasClass('yellow')))
			{
				notInView.push(chipsDiv[i]);
			}
			else
			{
				inView.push(chipsDiv[i]);
			}
		}

		currentView[1] = 3;
		updateViewStatus();
	});
	$("#cat4").click(function(){
		inView = [];
		notInView = [];
		$(chipsDiv).show();

		checkFocus();

		for (var i = chipsDiv.length - 1; i >= 0; i--) {
			if(!($(chipsDiv[i]).hasClass('orange')))
			{
				notInView.push(chipsDiv[i]);
			}
			else
			{
				inView.push(chipsDiv[i]);
			}
		}

		currentView[1] = 4;
		updateViewStatus();
	});
	$("#cat5").click(function(){
		inView = [];
		notInView = [];
		$(chipsDiv).show();

		checkFocus();

		for (var i = chipsDiv.length - 1; i >= 0; i--) {
			if(!($(chipsDiv[i]).hasClass('purple')))
			{
				notInView.push(chipsDiv[i]);
			}
			else
			{
				inView.push(chipsDiv[i]);
			}
		}

		currentView[1] = 5;
		updateViewStatus();
	});
	
	//Date Filter: if between epochTimeA and epochTimeB, then display it, if not hide it.
	$("#date-filter").click(function(){
		$('#categoryMenu').hide();
		$("#dateMenu").toggle(200);

		$( "#from" ).datepicker({
			defaultDate: "+1w",
			changeMonth: true,
			numberOfMonths: 1,
			onClose: function( selectedDate ) {
				$( "#to" ).datepicker( "option", "minDate", selectedDate );
				epochFrom = selectedDate.split("/");
			}
		});
		$( "#to" ).datepicker({
			defaultDate: "+1w",
			changeMonth: true,
			numberOfMonths: 1,
			onClose: function( selectedDate ) {
				$( "#from" ).datepicker( "option", "maxDate", selectedDate );
				epochTo = selectedDate.split("/");
			}
		});
	});

	//Date OK: runs filter.
	$("#dateOK").click(function(){

		inView = [];
		notInView = [];
		var after = 86399000; //to go to 11:59:59pm on the after date instead of 12am
		var before = 0;
		$(chipsDiv).show();

		checkFocus();

		if($("#from").val() && $("#to").val())
		{
			before += new Date(epochFrom[2],(epochFrom[0]-1),epochFrom[1]).getTime();
			after += new Date(epochTo[2],(epochTo[0]-1),epochTo[1]).getTime();
			
			console.log("before: "+before+" after: " + after);

			for (var i = chips.length - 1; i >= 0; i--) {
				if(after >= chips[i].date.getTime() && before <= chips[i].date.getTime())
				{
					inView.push(chipsDiv[i]);
					console.log("YES: " + chips[i].date.toString());
					console.log(after + " => " + chips[i].date.getTime() + " => " + before);
				}
				else
				{
					notInView.push(chipsDiv[i]);
					console.log("NO: " + chips[i].date.toString());
					console.log(after + " => " + chips[i].date.getTime() + " => " + before);
				}
			}
			currentView[1] = 6;
			updateViewStatus();
		}
	});
}

function setDefaultView(){
	$('.incomplete').show();
	$('.completed').hide();
	$('.past').hide();
	$('.description-left').hide();
	$('.description-right').hide();
	inView = chipsDiv;
	notInView = [];
	$(this).siblings('#filter, #focus').prop('disabled', false);
	currentView = [-1,-1,0];
	checkFilter();
	checkFocus();
	updateViewStatus();
}

function setCurrentView(){
	$('.incomplete').show();
	$('.completed').hide();
	$('.past').hide();
	$('.description-left').hide();
	$('.description-right').hide();
	inView = chipsDiv;
	notInView = [];
	$(this).siblings('#filter, #focus').prop('disabled', false);
	currentView = [-1,-1,0];
	checkFilter();
	checkFocus();
	updateViewStatus();
}

function setInitData(){
	var temp_chips = [];
	var temp_completed = [];
	var dateStr = "";
	var currUser = $("#theuser").val();
	$.ajax({
		url:'get-chips.php',
		type: 'post',
		data: {'username': currUser}, //this will be the login id...
		cache: false,
		success: function(json){
			$.each(json, function(i, item){
				if(item.isComplete || item.isPast)
				{
					dateStr = item.date;
					item.date = new Date(dateStr);
					temp_completed.push(item);
				}
				else
				{
					dateStr = item.date;
					item.date = new Date(dateStr);
					temp_chips.push(item);
				}
			});

			//overwrite chips array with temp_chips array
			chips = [];
			for (var i = temp_chips.length - 1; i >= 0; i--) {
				chips.push(temp_chips[i]);
			};
			//overwrite completed array with temp_completed
			completed = [];
			for (var i = temp_completed.length - 1; i >= 0; i--) {
				completed.push(temp_completed[i]);
			};
			clearView();
			initData();
			setDefaultView();
		},
		error: function(xhr, desc, err){console.log(xhr + "\n" + err);}
	});
	//console.log("Data Update, user: " + currUser);
	$('#focus').prop('disabled', false);
	$('#filter').prop('disabled', false);
}

function updateData(){
	var temp_chips = [];
	var temp_completed = [];
	var dateStr = "";
	var currUser = $("#theuser").val();
	$.ajax({
		url:'get-chips.php',
		type: 'post',
		data: {'username': currUser}, //this will be the login id...
		cache: false,
		success: function(json){
			$.each(json, function(i, item){
				if(item.isComplete || item.isPast)
				{
					dateStr = item.date;
					item.date = new Date(dateStr);
					temp_completed.push(item);
				}
				else
				{
					dateStr = item.date;
					item.date = new Date(dateStr);
					temp_chips.push(item);
				}
			});

			//overwrite chips array with temp_chips array
			chips = [];
			for (var i = temp_chips.length - 1; i >= 0; i--) {
				chips.push(temp_chips[i]);
			};
			//overwrite completed array with temp_completed
			completed = [];
			for (var i = temp_completed.length - 1; i >= 0; i--) {
				completed.push(temp_completed[i]);
			};
			clearView();
			setData();
		},
		error: function(xhr, desc, err){console.log(xhr + "\n" + err);}
	});
	//console.log("UpdateData() called");
	//console.log("Data Update, user: " + currUser);
}

function clearView(){
	$('.chip').remove();
	chipsDiv = [];
}

function updateViewStatus(){
	$('.incomplete').children('.description-left').hide();
	$('.incomplete').children('.description-right').hide();

	if(inView[0])
	{
		$(inView).show();

		switch (currentView[2]){
			case 0:
			//view all
			$("#viewStatus").text(" view all");
			break;
			case 1:
			//view completed
			currentView[0] =-1;
			currentView[1] =-1;
			$("#viewStatus").text(" view completed");
			break;
		}

		switch (currentView[0]) {
			case 0: 
			//priority;
			$("#focusStatus").text(" priority");
			break;
			case 1: 
			//no priority
			$("#focusStatus").text(" no priority");
			break;
			case 2: 
			//upcoming
			$("#focusStatus").text(" upcoming");
			break;
			case 3: 
			//from todo app
			$("#focusStatus").text(" from todo app");
			break;
			case 4: 
			//from calendar app
			$("#focusStatus").text(" from calendar app");
			break;
			case 5: 
			//from email app
			$("#focusStatus").text(" from email app");
			break;
			default:
			$("#focusStatus").text(" ");
			break;
		}
		
		if(currentView[1] < 0){
			$("#filterStatus").text(" ");
		}
		else if(currentView[1] == 6)
		{
			$("#filterStatus").text(" filtered by date: from " + $("#from").val() + " to " + $("#to").val());
		}
		else{
			$("#filterStatus").text(" from " + $(inView[0]).children(".category").html() + " category");
		}
	}
	else
	{
		$("#viewStatus").text("");
		$("#focusStatus").text("no chips in this filter/focus");
		$("#filterStatus").text("");
	}

	$(notInView).hide();
}

function checkFocus(){
	switch(currentView[0]){
		case -1:
		//hide nothing
		break;
		case 0:
		//hide chips w/no priority
		for (var i = chipsDiv.length - 1; i >= 0; i--) {
			if($(chipsDiv[i]).children('.priority').length <= 0)
			{
				notInView.push(chipsDiv[i]);
			}
		}
		break;
		case 1:
		//hide chips w/priority
		for (var i = chipsDiv.length - 1; i >= 0; i--) {
			if($(chipsDiv[i]).children('.priority').length > 0)
			{
				notInView.push(chipsDiv[i]);
			}
		}
		break;
		case 2:
		//hide chips w/no upcoming
		for (var i = chipsDiv.length - 1; i >= 0; i--) {
			if(!($(chipsDiv[i]).hasClass('upcoming-blue')||
				$(chipsDiv[i]).hasClass('upcoming-red')||
				$(chipsDiv[i]).hasClass('upcoming-green')||
				$(chipsDiv[i]).hasClass('upcoming-yellow')||
				$(chipsDiv[i]).hasClass('upcoming-purple')||
				$(chipsDiv[i]).hasClass('upcoming-orange')))
			{
				notInView.push(chipsDiv[i]);
			}
		}
		break;
		case 3:
		//hide chips from cal and email
		for (var i = chipsDiv.length - 1; i >= 0; i--) {
			if($(chipsDiv[i]).children('.list').length <= 0)
			{
				notInView.push(chipsDiv[i]);
			}
		}
		break;
		case 4:
		//hide chips from todo and email
		for (var i = chipsDiv.length - 1; i >= 0; i--) {
			if($(chipsDiv[i]).children('.cal').length <= 0)
			{
				notInView.push(chipsDiv[i]);
			}
		}
		break;
		case 5:
		//hide chips from cal and todo
		for (var i = chipsDiv.length - 1; i >= 0; i--) {
			if($(chipsDiv[i]).children('.email').length <= 0)
			{
				notInView.push(chipsDiv[i]);
			}
		}
		break;
	}
}

function checkFilter (){
	var after = 86399000; //to go to 11:59:59pm on the after date instead of 12am
	var before = 0;
	before += new Date(epochFrom[2],(epochFrom[0]-1),epochFrom[1]).getTime();
	after += new Date(epochTo[2],(epochTo[0]-1),epochTo[1]).getTime();

	switch(currentView[1]){
		case -1:
		//hide nothing
		break;
		case 0:
		//hide chips not from category 0
		for (var i = chipsDiv.length - 1; i >= 0; i--) {
			if(!($(chipsDiv[i]).hasClass('blue')))
			{
				notInView.push(chipsDiv[i]);
			}
		}
		break;
		case 1:
		//hide chips not from category 1
		for (var i = chipsDiv.length - 1; i >= 0; i--) {
			if(!($(chipsDiv[i]).hasClass('red')))
			{
				notInView.push(chipsDiv[i]);
			}
		}
		break;
		case 2:
		//hide chips not from category 2
		for (var i = chipsDiv.length - 1; i >= 0; i--) {
			if(!($(chipsDiv[i]).hasClass('green')))
			{
				notInView.push(chipsDiv[i]);
			}
		}
		break;
		case 3:
		//hide chips not from category 3
		for (var i = chipsDiv.length - 1; i >= 0; i--) {
			if(!($(chipsDiv[i]).hasClass('yellow')))
			{
				notInView.push(chipsDiv[i]);
			}
		}
		break;
		case 4:
		//hide chips not from category 4
		for (var i = chipsDiv.length - 1; i >= 0; i--) {
			if(!($(chipsDiv[i]).hasClass('orange')))
			{
				notInView.push(chipsDiv[i]);
			}
		}
		break;
		case 5:
		//hide chips not from category 5
		for (var i = chipsDiv.length - 1; i >= 0; i--) {
			if(!($(chipsDiv[i]).hasClass('purple')))
			{
				notInView.push(chipsDiv[i]);
			}
		}
		break;
		case 6:
		//hide chips outside of date range
		for (var i = chips.length - 1; i >= 0; i--) {
				if(!(after >= chips[i].date.getTime() && before <= chips[i].date.getTime()))
				{
					notInView.push(chipsDiv[i]);
					console.log("YES: " + chips[i].date.toString());
					console.log(after + " => " + chips[i].date.getTime() + " => " + before);
				}
		}
		break;
	}
}

String.prototype.splicenstein = function( idx, rem, s ) {
    return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
};

/*
var TASKAMB = (function(){
	
	[PUT ALL THE CODE IN HERE]
	
	return{any fn's called by front end stuff: currently none};

})();
*/