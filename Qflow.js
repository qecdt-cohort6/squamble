////////////////////////////////////////////////////////////////////////////////
//Document Setup
var canvas = document.querySelector('canvas'); 																	//selects the canvas tag from the HTML file
var inter = false 																															// this variable toggles the user interaction loop.
var included = [] 																															// All these empty data structures are used in the user input process
var counter_included = []
var cycle_edges = {}
var counter_cycle_edges = {}
var selectedarr = [];
var current_x = 0
var current_y = 0

var advActive = false
var advcyc = {}
var counter_advcyc = {}
var advinter = false

var moveCounter = 0
var HighScore;

//Loading of the background image
var img = new Image();
img.src = "Background_v3.jpg";

let checker = arr => arr.every(Boolean);																				//useful function for checking if all elements of an array are true

var c = canvas.getContext('2d');
canvas.width = window.innerWidth; //sets the height and width of the canvas
canvas.height = window.innerHeight;


var Graph_STR = document.getElementsByClassName("div1")[0].getAttribute("data-graph"); // extract and process the graph data which is stored in a div by the initial python script.
var fixed = Graph_STR.replace(/[']/g,"\"");
var JSON_OBj = JSON.parse(fixed);
////////////////////////////////////////////////////////////////////////////////
function toggle(item){																														//Toggles the truth value of a variable
	item === true ? item = false : item = true
	return item
}

window.addEventListener('keydown',function(event){															//If the advanced options keys are pressed activate the advanced button
	var Pressedkey = event.keyCode || e.which;
	if(Pressedkey == "65" && event.shiftKey == true){
		advActive = toggle(advActive)
		}
	}
)
////////////////////////////////////////////////////////////////////////////////
//Click Events
var mouse = { 																																	//dictionary style variable called mouse that has an x and y component
		x: 0,
		y: 0,
		shift: false
	}

window.addEventListener('click', 																								//event listener waits for clicks and then stores the
		function(event){																														//x,y position of the cursor in the variable mouse.
		mouse.x = event.x
		mouse.y = event.y
		mouse.shift = event.shiftKey
		}
)

function clearm (){ 																														//when called this function clears the variable mouse.
	mouse.x = 0
	mouse.y = 0
	mouse.shift = false
}
////////////////////////////////////////////////////////////////////////////////
//Drag interaction
var x_new = 0; 																																	// control variables for dragging
var y_new = 0;
var isDragging = false;
var isDraggedId = null;

window.addEventListener('mousedown', 																						//listens for a mouse down event. when detected activated the handeling of dragging events.
		function(event){
			x_new = event.x;
		  y_new = event.y;
			isDragging = true;
		}
);

window.addEventListener('mousemove',
		function(event){
			if(isDragging === true && isDraggedId !== null){ 													// the code is exicuted the the mouse is held down on a node
				x_new = event.x;
				y_new = event.y;
				nodeArray[isDraggedId].updatePos(x_new, y_new) 													//this updates the position of the node to the current cursor position
				for (var i = 0; i < edgeArray.length; i++){															// sums over all the edges and decides weather to update them or not.
					if (edgeArray[i].from === isDraggedId){ 															// if the edge begins at the dragged node update its stating position
						edgeArray[i].updateEdgeStart(x_new,y_new)
					}if (edgeArray[i].to === isDraggedId){ 																// if the edge ends and the dragged node update the end position.
						edgeArray[i].updateEdgeEnd(x_new,y_new) 														// double if statement is used as this catchs the case of self loops
					}
				}
			}else{
				current_x = event.x
				current_y = event.y
			}
		}
);

window.addEventListener('mouseup',																							//When a mouse up event occurs the relevant variables are reset.
		function(event){
			x_new = 0;
			y_new = 0;
			isDragging = false;
			isDraggedId = null;
		}
);


////////////////////////////////////////////////////////////////////////////////
/*function getRndInteger(min, max) {																							//Random integer generator used in the scramble function
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function Scramble(){																														// This function performs random mixing operations on the graph.
for (var i =0; i<500; i++){																											//This function could be with some reworking as I feel like it in inefficent and buggy
	var scram_arr = []																														// It is not currently being implimented as we are manually scrambling the levels
	var k = getRndInteger(2,JSON_OBj["nodes"].length)
	for (var j = 0; j < (k); j++){
		var m = getRndInteger(0,(JSON_OBj["nodes"].length)-1)
		if (scram_arr.includes(m) == false){
			scram_arr.push(JSON_OBj["nodes"][m]["id"])
		}
  }
	check = Cyclecheck(scram_arr)
	if (check == true){
		var n = (Math.random()).toFixed(2)
		console.log(cycle_edges);
		console.log(n);
		for (var key in cycle_edges){
			id = cycle_edges[key];
			edgeArray[id].changeweight(n)
		}
		for (var key in counter_cycle_edges){
			id = counter_cycle_edges[key];
		  edgeArray[id].changeweight(-n)
			}
		}
	}
		included = []
		counter_included = []
		cycle_edges = {}
		counter_cycle_edges = {}
		scram_arr = []
	}
*/
////////////////////////////////////////////////////////////////////////////////
function edge_checker(edgecan){																									// checks if an edge is in the graph
	for (var j = 0; j < JSON_OBj["edges"].length; j++){
		var edge = [JSON_OBj["edges"][j]["from"], JSON_OBj["edges"][j]["to"]]
		if (edge[0] == edgecan[0] && edge[1] == edgecan[1]){
			bool_index = {
				bool: true,
				index:j
			};
			return bool_index
			}
		}
	}
//////////////////////////////////////////////////////////////////////////////// This function checks that a selected cycle is valid.
function Cyclecheck(arr) {																											// This means that it checks that every node in the proposed cycle has an edge between them.
	for (var i = 0; i < arr.length; i++){																					// It also checks that the reverse cycle exists in the graph
		included.push(false)
		counter_included.push(false)
	}
	for (var i =0; i< arr.length; i++){
		if (i == (arr.length-1)){
			var edgecan = [arr[i],arr[0]];
			if (arr.length == 2){																											//special case for 2 node cycyles
				var counter_edgecan = [arr[i],arr[i]];
			}else {
				var counter_edgecan = [arr[0],arr[i]];
			}
		}else {
			var edgecan = [arr[i],arr[i+1]];
			if (arr.length == 2){
				var counter_edgecan = [arr[i],arr[i]];
			}else {
				var counter_edgecan = [arr[i+1],arr[i]];
			}
		}
		edgecan_check = edge_checker(edgecan)
		counter_edgecan_check = edge_checker(counter_edgecan)

		included[i] = edgecan_check.bool;																						// sum over the edges and checks that the proposed edges are in the edge set
		cycle_edges[edgecan] = edgecan_check.index;

		counter_included[i] = counter_edgecan_check.bool;
		counter_cycle_edges[edgecan] = counter_edgecan_check.index;
	}
	 																																							//returns true if every element in an array is true.
	if (checker(included) == true && checker(counter_included) == true){					// if cycle and counter cycle are in the graph then return true.
		return true
	}else {
		return false
		}
	}
///////////////////////////////////////////////////////////////////////////////
function advchecher(){																													//this function handles the advanced probability shifts
	if (selectedarr.length !== 2){
		alert("Advanced Check only Accepts 2-Cycles")																// Only works for two cycles
	}else{
		n = parseInt(prompt("Please enter first index(n):"));													//parse user input for first integer
  if (n == null || n == "") {
    reset();
  } else {
    m =  parseInt(prompt("Please enter second index(m):"));												//parse user input for second integer
  if (m == null || m == "") {
    reset();
  } else {
		const N = JSON_OBj["nodes"].length
		edge_ij = [selectedarr[0],selectedarr[1]]																		//define the edges in the two cycle
		edge_ipnjpm = [(selectedarr[0]+n)%(N),(selectedarr[1]+m)%(N)]

		edge_ipnj = [(selectedarr[0]+n)%(N),selectedarr[1]]
		edge_ijpm = [selectedarr[0], (selectedarr[1]+m)%(N)]

		edge_ij_check = edge_checker(edge_ij) 																																	//define the edges in the two cycle
		edge_ipnjpm_check = edge_checker(edge_ipnjpm)

		edge_ipnj_check = edge_checker(edge_ipnj)
		edge_ijpm_check = edge_checker(edge_ijpm)


		truth = [false,false,false,false]
		truth = [edge_ij_check.bool,edge_ipnjpm_check.bool,edge_ipnj_check.bool,edge_ijpm_check.bool] //check that the edges exist

		advcyc[edge_ij] = edge_ij_check.index																				//determine edge index
		advcyc[edge_ipnjpm] = edge_ipnjpm_check.index
		counter_advcyc[edge_ipnj] = edge_ipnj_check.index
		counter_advcyc[edge_ijpm] = edge_ijpm_check.index

																																								//if all the edges are in the graph continue
		if (checker(truth) === true){
			for (var i = 0; i < selectedarr.length; i++){
				nodeArray[selectedarr[i]].changecol("green");														//turn active nodes and edges green
			}
			for (var key in advcyc){
				id = advcyc[key];
				edgeArray[id].changecol("green")
			}
			for (var key in counter_advcyc){
				id = counter_advcyc[key];
				edgeArray[id].changecol("green")
			}
			advinter = true																														//activate interactivity
		}else if (checker(truth) == false){
			alert("Invalid Cycle")
			for (var i = 0; i < selectedarr.length; i++){
				nodeArray[selectedarr[i]].changecol("black");
					}
					advcyc = {}
					counter_advcyc = {}
					advinter = false
					selectedarr = [];
				}
			}
  	}
	}
}
window.addEventListener('wheel', function(event) { cycleUpdater(advinter, advcyc, counter_advcyc, 0)});															//deals with mouse wheel events
window.addEventListener('keydown',function(event){																																									//deals with key presses
	var keyPressed = event.keyCode || event.which;
	cycleUpdater(advinter, advcyc, counter_advcyc, keyPressed)
	}
)

///////////////////////////////////////////////////////////////////////////////
																																								//If the selected cycle is valid turn then this function
function interaction (){																												//turns the nodes green and activate interactive mode.
	check = Cyclecheck(selectedarr)
	if (check == true){
		inter = true
		for (var i = 0; i < selectedarr.length; i++){
			nodeArray[selectedarr[i]].changecol("green");
		}
		for (var key in cycle_edges){
			id = cycle_edges[key];
			edgeArray[id].changecol("green")
		}
		for (var key in counter_cycle_edges){
			id = counter_cycle_edges[key];
			edgeArray[id].changecol("green")
		}
	}else if (check == false){
		alert("Invalid Cycle")
		endinteraction()
	}
}
///////////////////////////////////////////////////////////////////////////////
window.addEventListener('wheel', function(event) {cycleUpdater(inter, cycle_edges, counter_cycle_edges, 0)});
window.addEventListener('keydown',function(event){
	var keyPressed = event.keyCode || event.which;
	cycleUpdater(inter, cycle_edges, counter_cycle_edges, keyPressed)
	}
)																																								//deals with mouse wheel events

function cycleUpdater(bool, arr1, arr2, keyPressed){
	if (bool == true){																														//if interactivity is enabled change the weights of the edges dependent on the direction of the scroll
		for (var key in arr1){
			id = arr1[key];
			if (event.deltaY < 0 || keyPressed == "38"){
				edgeArray[id].changeweight(0.01)
			}else if (event.deltaY > 0 || keyPressed == "40"){
				edgeArray[id].changeweight(-0.01)
			}

		}
		for (var key in arr2){
			id = arr2[key];
			if (event.deltaY < 0 || keyPressed == "38"){
				edgeArray[id].changeweight(-0.01)
			}else if (event.deltaY > 0 || keyPressed == "40"){
				edgeArray[id].changeweight(0.01)
			}
		}
	}
}
///////////////////////////////////////////////////////////////////////////////
function endinteraction() {
	if (isSquambled === true){																										//when called this function checks the win condition and ends the interactivity.
	moveCounter++;
	for (var i = 0; i < selectedarr.length; i++){
		nodeArray[selectedarr[i]].changecol("black");
	}
	for (var key in cycle_edges){
		id = cycle_edges[key];
		edgeArray[id].changecol("black")
	}
	for (var key in counter_cycle_edges){
		id = counter_cycle_edges[key];
		edgeArray[id].changecol("black")
	}

	for (var key in advcyc){
		id = advcyc[key];
		edgeArray[id].changecol("black")
	}
	for (var key in counter_advcyc){
		id = counter_advcyc[key];
		edgeArray[id].changecol("black")
	}
	var winarry = [];
	for (var i = 0; i < edgeArray.length; i++){																		//check that all weights are positive.
		w = edgeArray[i].weight
		if (w >= 0){
			winarry.push(true);
		}else if (w < 0){
			winarry.push(false)
		}
	}

		if (checker(winarry) == true){
			HighScore = localStorage.getItem("Highscore"+ levelId);
			if (moveCounter < HighScore || HighScore === null){
				localStorage.setItem("Highscore"+ levelId, moveCounter);
			}
			BackgroundMusic.stop()
			MusicPlaying = false
			VictoryMusic.play()
			setTimeout(function(){
				alert("Congrats on Completing the Level in "+ moveCounter +" moves. Refresh the page to play again or return to the home page for another Level.")
			}, 200);
		}
	inter = false;																																//reset all appropriate variables
	selectedarr = [];
	included = []
	counter_included = []
	cycle_edges = {}
	counter_cycle_edges = {}
	advcyc = {}
	counter_advcyc = {}
	advinter = false
} else{
	alert("Press Squamble to initialise the level.")
}
}
///////////////////////////////////////////////////////////////////////////////
function reset(){																																//This function resents everything if you want to start from scratch.
	endinteraction();
	isSquambled = false
	setTimeout(function(){
		for (var i = 0; i < edgeArray.length; i++){
			edgeArray[i].resetweight()
		}
	}, 100)
}
///////////////////////////////////////////////////////////////////////////////
function HighScoreDisplay(x,y){
	this.x = x;
	this.y = y;
  this.scr = localStorage.getItem("Highscore"+ levelId);
	this.draw = function(){
		c.fillStyle = "black";
		c.textAlign = "start";
		c.textBaseline = "alphabetic";
		c.fillText("HighScore = ",this.x, this.y);
		c.stroke();
		if (this.scr !== null){
			c.fillText(this.scr,this.x + 175, this.y);
			c.stroke();
		}
	}

	this.update = function(){
		this.scr = localStorage.getItem("Highscore"+ levelId);
		this.draw();
	}
}
///////////////////////////////////////////////////////////////////////////////
function sound(src, loopValue,volume) {																					//This sound object is used to load and handle audio events
  this.sound = document.createElement("audio");
  this.sound.src = src;
	this.sound.volume = volume
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
	if(loopValue === true){
		this.sound.setAttribute("loop","true")
	}
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}
///////////////////////////////////////////////////////////////////////////////
function button(x,y,w,h,buttontext,func) {																			//Generic object that can be used as a button
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
  this.text = buttontext;
	this.fillcolour = "white"

	this.draw = function(){																												//This function determines how the button is drawn.
		c.beginPath();
		c.strokeStyle = "black";
		c.lineWidth = 2;
		c.fillStyle = this.fillcolour;
		c.fillRect(this.x,this.y,this.width,this.height);
		c.rect(this.x,this.y,this.width,this.height);
		c.fillStyle = "black";
		c.textAlign = "start";
		c.textBaseline = "alphabetic";
		c.fillText(this.text, 1.01*this.x, (this.y+ 0.75*(this.height)));
		c.stroke();
	}
	this.update = function(){																											//If the mouse clicks within the boundarys of the button its associatied function is called
		if (mouse.x < (this.x + this.width) && mouse.x > this.x && mouse.y < (this.y + this.height) && mouse.y > this.y){
			func();
			clearm();
		}
		if (current_x < (this.x + this.width) && current_x > this.x && current_y < (this.y + this.height) && current_y > this.y){
			this.fillcolour = "grey"
		}else{
			this.fillcolour = "white"
		}
		this.draw();
	}
}
///////////////////////////////////////////////////////////////////////////////
function arrayRemove(arr, value) {																							//useful function that removes a given element from a given array
	return arr.filter(function(ele){ return ele != value; });
}

function Node(x,y,id) {																													//Node object class.
	this.id = id;																																	//Node has a bunch of defining parameters
	this.x = x;
	this.y = y;
	this.radius = 20; //radius of the nodes
	this.colour = 'black'


	this.draw = function() {																											//This function determines how the nodes are drawn
		c.beginPath();
	  c.arc(this.x,this.y,this.radius,0,Math.PI * 2, false);
	  c.strokeStyle = this.colour;
		c.lineWidth = 10;
	  c.stroke();
	  c.fillStyle = "white";
	  c.fill();
		c.font = "30px Arial";
		c.fillStyle = "black";
		c.textAlign = "center";
		c.textBaseline = "middle";
		c.fillText(this.id,this.x,this.y);
	}

	this.update = function(){																											//This function handels the updating of the nodes.
	var dist = Math.sqrt((this.x - mouse.x)**2+(this.y - mouse.y)**2)

	if (dist < this.radius && this.colour == 'black' && mouse.shift === true){ 		//If the mouse clicks on a node while the shift key is held the node is selected.
		this.colour = 'red'																													//Change the colour to red
		SelectMusic.play()
		clearm()
		selectedarr.push(this.id)																										//add the node the the selected array
	} else if (dist < this.radius && this.colour == 'red' && mouse.shift === true){ // If the mouse clicks on the node + shift key then deselect the node
		this.colour = 'black'
		DeselectMusic.play()
		clearm()
		selectedarr = arrayRemove(selectedarr,this.id)															//Remove the id from the selected array
	}

	var dist2 = Math.sqrt((this.x - x_new)**2+(this.y - y_new)**2)

	if (dist2 < this.radius){																											//If the mouse is being held done on the node set the isDraggedId to the node ID
		isDraggedId = this.id
	}
		this.draw()
	}
	this.changecol = function(colour){																						// method that updates node colour
		this.colour = colour
	}
	this.updatePos = function(new_x,new_y){ 																			// method that updates node position
		this.x = new_x;
		this.y = new_y;
	}
}
///////////////////////////////////////////////////////////////////////////////
function _getQBezierValue(t, p1, p2, p3) {																			//Funcions that find the points on the curves used to draw the edges.
    var iT = 1 - t;																															// Used to draw arrowheads and edge label ticks
    return iT * iT * p1 + 2 * iT * t * p2 + t * t * p3;
}

function getQuadraticCurvePoint(startX, startY, cpX, cpY, endX, endY, position) {
    return {
        x:  _getQBezierValue(position, startX, cpX, endX),
        y:  _getQBezierValue(position, startY, cpY, endY)
    };
}
function getQuadraticAngle(t, sx, sy, cp1x, cp1y, ex, ey) {
  var dx = 2*(1-t)*(cp1x-sx) + 2*t*(ex-cp1x);
  var dy = 2*(1-t)*(cp1y-sy) + 2*t*(ey-cp1y);
  return -Math.atan2(dx, dy) + 0.5*Math.PI;
}

function RadialPath(scl, grad){
	return coords = {
		x: (scl)/(Math.sqrt(1+(grad)**2)),
		y: (scl*grad)/(Math.sqrt(1+(grad)**2))
	}
}
///////////////////////////////////////////////////////////////////////////////
function Edge(x_1, y_1, x_2, y_2,weight,from,to){																// Edge object Class
	this.from = from;																															//Defines a bunch of edge properties
	this.to= to;

	this.x_1 = x_1;
	this.y_1 = y_1;
	this.x_2 = x_2;
	this.y_2 = y_2;

	this.weight = weight
	this.init_weigth = weight

	this.edge_colour = 'black'

	this.draw = function(){																												//This Function Determines how to draw the edges
		this.x_m = (this.x_1 + this.x_2) /2																					//Thes scaled coordinates and control points are used to draw the quadratic curves
		this.y_m = (this.y_1 + this.y_2) /2
		this.scl = 0.1 																															//controls the curviness of the edges
		this.c_x = this.x_m + this.scl*(this.y_2-this.y_1)
		this.c_y = this.y_m - this.scl*(this.x_2-this.x_1)

		this.half = getQuadraticCurvePoint(this.x_1,this.y_1,this.c_x,this.c_y,this.x_2,this.y_2,0.5)
		this.arrowpos = getQuadraticCurvePoint(this.x_1,this.y_1,this.c_x,this.c_y,this.x_2,this.y_2,0.5)
		this.angle = getQuadraticAngle(0.5,this.x_1,this.y_1,this.c_x,this.c_y,this.x_2,this.y_2)


		this.k = 80 																																//controls the positioning of the self loops text
		this.r = 35 																																//radius of the self loops
		c.font = "25px Arial";
		c.fillStyle = "black";
		c.textAlign = "center";
		c.textBaseline = "middle";

		if (this.x_1 == this.x_2 && this.y_1 == this.y_2){													//Handels the self loops
			this.m = (this.y_1 - (canvas.height/2))/(this.x_1 - (canvas.width/2))
			this.d = 30

			c.beginPath();
			if ((this.x_1 - (canvas.width/2)) > 0 ){																	//This section makes sure the self loops are always aligned correctly

				this.x_s = this.x_1 + RadialPath(this.d,this.m).x
				this.y_s = this.y_1 + RadialPath(this.d,this.m).y
				c.arc(this.x_s,this.y_s,this.r,0,Math.PI * 2, false);										// Positions self loops radially out from the center
		   	c.strokeStyle = this.edge_colour;
				c.lineWidth = 2;
		   	c.stroke();

				this.x_text = this.x_1 + RadialPath(this.k,this.m).x						//Positions self loop labels
				this.y_text = this.y_1 + RadialPath(this.k,this.m).y
				if (this.weight != 0){
					if (this.weight < 0){
						c.fillStyle = "red";																								// If the weights are negative make them red
					}else{
						c.fillStyle = "black";
					}
					c.textAlign = "left";
					c.fillText(this.weight,this.x_text,this.y_text);
					c.moveTo(this.x_text,this.y_text)
					c.lineTo(this.x_1 + RadialPath(65,this.m).x, this.y_1 + RadialPath(65,this.m).y) //draw a line from the loop to the label
					c.stroke();
				}

			}else if ((this.x_1 - (canvas.width/2)) < 0 ){														//same code as above but with rotated geometry

				this.x_s = this.x_1 - RadialPath(this.d,this.m).x
				this.y_s = this.y_1 - RadialPath(this.d,this.m).y
				c.strokeStyle = this.edge_colour;
				c.arc(this.x_s,this.y_s,this.r,0,Math.PI * 2, false);
				c.lineWidth = 2;
		   	c.stroke();
				this.x_text = this.x_1 - RadialPath(this.k,this.m).x
				this.y_text = this.y_1 - RadialPath(this.k,this.m).y
				if (this.weight != 0){
					if (this.weight < 0){
						c.fillStyle = "red";
					}else{
						c.fillStyle = "black";
					}
					c.textAlign = "right";
					c.fillText(this.weight,this.x_text,this.y_text);
					c.moveTo(this.x_text,this.y_text)
					c.lineTo(this.x_1 - RadialPath(65,this.m).x, this.y_1 - RadialPath(65,this.m).y)
					c.stroke();
				}
			}
		}else{																																			//If not a self loop do this
			c.beginPath();
	   	c.moveTo(this.x_1,this.y_1);
	   	c.quadraticCurveTo(this.c_x,this.c_y,this.x_2,this.y_2)										//draw a quadratic curve
	   	c.strokeStyle = this.edge_colour;
			c.lineWidth = 2;
	   	c.stroke();

	   	c.beginPath();
	   	c.strokeStyle = this.edge_colour;
	   	c.stroke();
	   	c.font = "25px Arial";
			if (this.weight < 0){																											//if weight is negative make it red
				c.fillStyle = "red";
			}else{
				c.fillStyle = "black";
			}

			c.textBaseline = "middle";
																																								//Changes how the text is aligned depending on its position on the page
			if (this.weight != 0){
				if (this.c_x > this.x_2 && this.c_y < this.y_2 || this.c_x < this.x_2 && this.c_y < this.y_2){
					c.textAlign = "left";
				} else if (this.c_x < this.x_2 && this.c_y > this.y_2 || this.c_x > this.x_2 && this.c_y > this.y_2){
					c.textAlign = "right";
				}

		   	c.fillText(this.weight, this.c_x,this.c_y);
				c.strokeStyle = "black"
				c.moveTo(this.c_x,this.c_y)
				c.lineTo(this.half.x, this.half.y)																			//draws a line from te curve to the label
				c.stroke();
			}
			c.save();																																	//saves the canvas state so local transformation can be made while drawing the arrowhead.
			c.beginPath();
			c.translate(this.arrowpos.x, this.arrowpos.y);
			c.rotate(this.angle);
			c.moveTo(-10, -10);
			c.lineTo(10, 0);
			c.lineTo(-10, 10);
			c.lineTo(-10, -10);
			c.fillStyle = "black";
			c.fill();
			c.restore();

		}
	}

	this.update = function(){
		this.draw()
	}
	this.changeweight = function(we){																							//This method changes the value of the weight
		this.weight = (parseFloat(this.weight) + parseFloat(we)).toFixed(2)
	}
	this.resetweight = function(){																								//Returns the weight to the initial state
		this.weight = this.init_weigth
	}

	this.updateEdgeStart = function(new_x_1,new_y_1){															//This method updates the start point of the edge
		this.x_1 = new_x_1;
		this.y_1 = new_y_1;
	}
	this.updateEdgeEnd = function(new_x_2,new_y_2){																//This method updates the end point of the edge
		this.x_2 = new_x_2;
		this.y_2 = new_y_2;
	}
	this.changecol = function(colour){																						// method that updates edge colour
		this.edge_colour = colour
	}
}
///////////////////////////////////////////////////////////////////////////////
function MessageBox (){																													//This class handles the drawing of tutorial messages
	this.messages = LevelMessages()																								//The text for the messages is stored in each levels data file and is loaded in when the webpage is loaded.
	this.MessageIndex = 0

	this.draw = function(){
		c.font = "25px Arial";
		c.fillStyle = "black";
		c.textBaseline = "middle";
		c.fillText(this.messages[this.MessageIndex], 100,37.5);
		c.beginPath();
		c.strokeStyle = "black";
		c.lineWidth = 2;
		c.rect(50,0,(canvas.width-100),75);
		c.stroke();
	}
	this.update = function(){
		this.draw()
	}
  this.Next = function(){																												// when called advance to the next message
		if (this.MessageIndex === this.messages.length-1){
			this.MessageIndex = this.messages.length-1
		}else {
			this.MessageIndex = this.MessageIndex + 1
		}
	}

	this.Back = function(){																												// when called go back to the previous message
		if (this.MessageIndex === 0){
			this.MessageIndex === 0
		}else {
			this.MessageIndex = this.MessageIndex - 1
		}
	}
}


var tutorial = istutorial()																											// If the level is classed as a tutorial create an instance of the message boc class
if (tutorial === true){
	messgbox = new MessageBox()
	function next(){
		messgbox.Next()
	}
	function back(){
		messgbox.Back()
	}
	var NextButton = new button(canvas.width - 140,100,90, 40,"NEXT",next)				// created buttons that call the message box methods
	var BackButton = new button((50),100,80, 40,"BACK",back)
}
///////////////////////////////////////////////////////////////////////////////
var nodeArray = [];																															//Initiallised an array of node objects
for (var i = 0; i < JSON_OBj["nodes"].length; i++){
	var id = JSON_OBj["nodes"][i]["id"]
	var x = (JSON_OBj["nodes"][i]["x_pos"] + (canvas.width)/2)
	var y = (JSON_OBj["nodes"][i]["y_pos"] + (canvas.height)/2)
	nodeArray.push(new Node(x,y,id))
}
///////////////////////////////////////////////////////////////////////////////
var edgeArray = [];																															//Initiallised an array of edge objects
for (var i = 0; i <JSON_OBj["edges"].length; i++){
	var index_1 = JSON_OBj["edges"][i]["from"]
	var index_2 = JSON_OBj["edges"][i]["to"]
	var weight  = (JSON_OBj["edges"][i]["weight"]).toFixed(2)
	var x_1 = ((JSON_OBj["nodes"][index_1]["x_pos"]) + (canvas.width)/2)
	var y_1 = ((JSON_OBj["nodes"][index_1]["y_pos"]) +  (canvas.height)/2)
	var x_2 = ((JSON_OBj["nodes"][index_2]["x_pos"]) +  (canvas.width)/2)
	var y_2 = ((JSON_OBj["nodes"][index_2]["y_pos"]) +  (canvas.height)/2)


	edgeArray.push(new Edge(x_1,y_1,x_2,y_2,weight,index_1,index_2))
}
///////////////////////////////////////////////////////////////////////////////
BackgroundMusic = new sound("Background_Music_V2.wav",true,0.2)
																																								///Initialises game sounds
var MusicPlaying = false
function PlayMusic(){
	if(MusicPlaying === false){
		BackgroundMusic.play()
		MusicPlaying = true
	} else if(MusicPlaying === true){
		BackgroundMusic.stop()
		MusicPlaying = false
	}
}
SelectMusic = new sound("Select.wav",false,1)
DeselectMusic = new sound("Deselect.wav",false,1)
VictoryMusic = new sound("Win_v1.wav",false,1)
/////////////////////////////////////////////////////////////////////////////// Initialises instances of buttons
var selectbutton = new button((canvas.width)/8, 0.75*(canvas.height), 125, 40, "CHECK", interaction)
var endbutton = new button((canvas.width)/8, (0.75*(canvas.height)+45), 125, 40, "SUBMIT", endinteraction)
var resetbutton = new button((canvas.width)/8, (0.75*(canvas.height)+90), 125, 40, "RESET", reset)
var scramblebutton = new button(6*(canvas.width)/8, (0.75*(canvas.height)+45), 180, 40, "SQUAMBLE", mix)
var musicbutton = new button(6*(canvas.width)/8, (0.75*(canvas.height)), 125, 40, "MUSIC", PlayMusic)
var advbutton = new button (6*(canvas.width)/8, (0.75*(canvas.height)+90), 150, 40, "Advanced", advchecher)
var newHighScoreDisplay = new HighScoreDisplay((canvas.width)/8, 0.75*(canvas.height) - 30)
///////////////////////////////////////////////////////////////////////////////
function refresh() {																														//This refresh function controls the animation loop.
	requestAnimationFrame(refresh);
	c.clearRect(0,0,innerWidth, innerHeight);																			//Clear the page each frame
	c.drawImage(img, 0, 0,canvas.width,canvas.height);
	for (var i = 0; i < edgeArray.length; i++){
		edgeArray[i].update()																												//redraw the edges each frame
	}

	for (var i = 0; i < nodeArray.length; i++){
		nodeArray[i].update()																												//redraw the nodes each frame
	}
	selectbutton.update()																													//redraw the buttons each frame
	endbutton.update()
	resetbutton.update()
	scramblebutton.update()
	musicbutton.update()
	newHighScoreDisplay.update()
	if (advActive === true){																											// If user has activated advamced moves draw this button
		advbutton.update()
	}
	if (tutorial === true){																												// If it is a tutorial level draw the message box.
		messgbox.update()
		NextButton.update()
		BackButton.update()
	}
}

refresh();
