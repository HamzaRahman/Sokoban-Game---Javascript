//Function To Move Any Element
function place(id,x_pos, y_pos) {
  var element = document.getElementById(id);
  element.style.position = "absolute";
  element.style.left = x_pos+'px';
  element.style.top = y_pos+'px';
}
//Adding Event Listener To Function KeyPress//
function update(){
   document.addEventListener('keydown', keyPress);
}
  
function keyPress(e) {
	//Get Pressed Key
  	var x = e.keyCode;
	//Prevent the page from scrolling with keys
  	e.preventDefault();
	//Getting collide-able entitites 
  	var move = document.getElementById("character").getBoundingClientRect();
	var walls = document.getElementsByClassName("tile-wall");
	var blocks = document.getElementsByClassName("entity-block");
	var Goals = document.getElementsByClassName("tile-goal");
	//List for checking if all blocks have been placed on goals
	var brun=[false,false,false,false,false,false];
	//Further check variable to confirm if  all blocks have been placed on goals
	var check = false;
	//Running a loop to check if blocks have been placed at goals
	//Comparing Each Block with Each Goal
	for(var i=0;i<blocks.length;i++)
		{
			for(var j=0;j<Goals.length;j++)
				  {
					  
					var block = blocks.item(i);
					var bs = block.getBoundingClientRect();
					
					var Goal = Goals.item(j);
					var gs = Goal.getBoundingClientRect();
					if(bs.left<=gs.left&&bs.top==Math.ceil(gs.top)&&bs.right>=gs.right&&bs.bottom==Math.ceil(gs.bottom))
					{
						//if a block is found placed on goal, set an element of array to true
							brun[i]=true;
					 }
				  }	
			}
	//Check if all elements of array are true, meaning if all blocks are on goals
	for(var i=0;i<brun.length;i++)
		{
			if(brun[i]==true)
				{
					check=true;
				}
			else{
				check=false;
				break;
			}
		}
	//If yes then say Over and Do nothing
	if(check==true)
		{
			alert("Over");
			return;
		}
	
 //Else get current coordinates of the Character
  	var left = parseInt(move.left,10);
  	var top = parseInt(move.top,10)
  	
  switch (x) {
		  //If left key is pressed
    case 37:
		  //Check if there is wall next the left of player by comparing each walls coordinates with characters
		  for(var i=0;i<walls.length;i++)
			  {
				  	var wall1 = walls.item(i);
					var w1s = wall1.getBoundingClientRect();
					if (move.left <= w1s.left + w1s.width  && move.left + move.width  > w1s.left &&
					move.top < w1s.top + w1s.height && move.top-1 + move.height > w1s.top) 
					{
						//if there is wall left to the player, do nothing
					return;
					}
					
			  }
		  //Else check if there is a block next to player
		  for(var i=0;i<blocks.length;i++)
			  {
				  	var block = blocks.item(i);
					var bs = block.getBoundingClientRect();
					if (move.left <= bs.left + bs.width  && move.left + move.width  > bs.left &&
					move.top < bs.top + bs.height && move.top-1 + move.height > bs.top) 
					{
						//if there is a block on the left of character Check if theres a wall left to that block
						for(var j=0;j<walls.length;j++)
			  			{
						var wall1 = walls.item(j);
						var w1s = wall1.getBoundingClientRect();
						if (bs.left <= w1s.left + w1s.width  && bs.left + bs.width  > w1s.left &&
						bs.top < w1s.top + w1s.height && bs.top-1 + bs.height > w1s.top) 
						{
							//if there is a wall, do nothing
						return;
						}	
			  			}
						//else check if there is a block at the left of that block
						for(var k=0;k<blocks.length;k++)
						{
							var otherblock = blocks.item(k);
							var obs = otherblock.getBoundingClientRect();
							if (i!=k&&
								bs.left <= obs.left + obs.width  && bs.left + bs.width  > obs.left &&
							bs.top < obs.top + obs.height && bs.top-1 + bs.height > obs.top) 
							{
								//if there is block at the left of that block, do nothing
								return;
							}
						}
						//else finally move that player and block to the left
						var btop = parseInt(bs.top,10);
						btop = parseInt(bs.top,10);
						var bleft = parseInt(bs.left,10);
						place(block.id, bleft -50,  btop);
						place('character', left -50,  top);
					return;
			  }
			  }
			//if there is no wall or block on the left of player, simply move the player to left
     	place('character', left -50,  top);
      break;
//Same procedure for every directions
    case 39:
		  for(var i=0;i<walls.length;i++)
			  {
				  	var wall1 = walls.item(i);
					var w1s = wall1.getBoundingClientRect();
					if (move.left < w1s.left + w1s.width  && move.left + move.width  >= w1s.left &&
					move.top < w1s.top + w1s.height && move.top-1 + move.height > w1s.top) 
					{
					return;
					}
					else{
					}
			  }
		  for(var i=0;i<blocks.length;i++)
			  {
				  	var block = blocks.item(i);
					var bs = block.getBoundingClientRect();
					if (move.left < bs.left + bs.width  && move.left + move.width  >= bs.left &&
					move.top < bs.top + bs.height && move.top-1 + move.height > bs.top) 
					{
						for(var j=0;j<walls.length;j++)
			  			{
						var wall1 = walls.item(j);
						var w1s = wall1.getBoundingClientRect();
						if (bs.left < w1s.left + w1s.width  && bs.left + bs.width  >= w1s.left &&
						bs.top < w1s.top + w1s.height && bs.top-1 + bs.height > w1s.top) 
						{
						return;
						}
						else{
						}
			  			}
						for(var k=0;k<blocks.length;k++)
						{
							var otherblock = blocks.item(k);
							var obs = otherblock.getBoundingClientRect();
							if (i!=k&&
								bs.left < obs.left + obs.width  && bs.left + bs.width  >= obs.left &&
							bs.top < obs.top + obs.height && bs.top-1 + bs.height > obs.top) 
							{
								return;
							}
						}
						var btop = parseInt(bs.top,10);
						btop = parseInt(bs.top,10);
						var bleft = parseInt(bs.left,10);
						place(block.id, bleft +50,  btop);
						place('character', left +50,  top);
					return;
					}
					else{
					}
			  }
   place('character', left+50,  top);
      break;

    case 38:
		  for(var i=0;i<walls.length;i++)
			  {
				  var wall1 = walls.item(i);
					var w1s = wall1.getBoundingClientRect();
					if (move.left < w1s.left + w1s.width  && move.left + move.width  > w1s.left &&
					move.top-1 <= w1s.top + w1s.height && move.top-1 + move.height >= w1s.top) 
					{
					return;
					}
					else{
					}
			  }
		  for(var i=0;i<blocks.length;i++)
			  {
				  	var block = blocks.item(i);
					var bs = block.getBoundingClientRect();
					if (move.left < bs.left + bs.width  && move.left + move.width  > bs.left &&
					move.top <= bs.top + bs.height && move.top-1 + move.height >= bs.top) 
					{
						for(var j=0;j<walls.length;j++)
			  			{
						var wall1 = walls.item(j);
						var w1s = wall1.getBoundingClientRect();
						if (bs.left < w1s.left + w1s.width  && bs.left + bs.width  > w1s.left &&
						bs.top-1 <= w1s.top + w1s.height && bs.top-1 + bs.height >= w1s.top) 
						{
						return;
						}
						else{
						}
			  			}
						for(var k=0;k<blocks.length;k++)
						{
							var otherblock = blocks.item(k);
							var obs = otherblock.getBoundingClientRect();
							if (i!=k&&
								bs.left < obs.left + obs.width  && bs.left + bs.width  > obs.left &&
							bs.top <= obs.top + obs.height && bs.top-1 + bs.height > obs.top) 
							{
								return;
							}
						}
						var btop = parseInt(bs.top,10);
						btop = parseInt(bs.top,10);
						var bleft = parseInt(bs.left,10);
						place(block.id, bleft ,  btop-50);
						place('character', left ,  top-50);
					return;
					}
					else{
					}
			  }
    place('character', left,  top-50);
      break;

    case 40:
		  for(var i=0;i<walls.length;i++)
			  {
				  var wall1 = walls.item(i);
					var w1s = wall1.getBoundingClientRect();
					if (move.left < w1s.left + w1s.width  && move.left + move.width  > w1s.left &&
					move.top < w1s.top + w1s.height && move.top + move.height >= w1s.top) 
					{
						return;
					}
					else{
					}
			  }
		  for(var i=0;i<blocks.length;i++)
			  {
				  	var block = blocks.item(i);
					var bs = block.getBoundingClientRect();
					if (move.left < bs.left + bs.width  && move.left + move.width  > bs.left &&
					move.top < bs.top + bs.height && move.top + move.height >= bs.top) 
					{
						for(var j=0;j<walls.length;j++)
			  			{
						var wall1 = walls.item(j);
						var w1s = wall1.getBoundingClientRect();
						if (bs.left < w1s.left + w1s.width  && bs.left + bs.width  > w1s.left &&
						bs.top < w1s.top + w1s.height && bs.top + bs.height >= w1s.top) 
						{
						return;
						}
						else{
						}
			  			}
						for(var k=0;k<blocks.length;k++)
						{
							var otherblock = blocks.item(k);
							var obs = otherblock.getBoundingClientRect();
							if (i!=k&&
								bs.left < obs.left + obs.width  && bs.left + bs.width  > obs.left &&
							bs.top < obs.top + obs.height && bs.top + bs.height >= obs.top) 
							{
								return;
							}
						}
						var btop = parseInt(bs.top,10);
						var bleft = parseInt(bs.left,10);
						place(block.id, bleft,  btop+50);
						place('character', left,  top+50);
					return;
					}
					else{
					}
			  }
     place('character', left,  top+50);
      break;
  }
				
 // console.log(x);
}
update();

/*   Enum of CSS Classes for the static elements   */
var Tiles = {
  Wall: "tile-wall",
  Space: "tile-space",
  Goal: "tile-goal",
};

/*   Enum of CSS Classes for the moving elements   */
var Entities = {
  Character: "entity-player",
  Block: "entity-block",
  BlockDone: "entity-block-goal",
};

/*
    W = Wall
    B = Movable block
    P = Player starting position
    G = Goal area for the blocks
*/
var tileMap01 = {
  width: 19,
  height: 16,
  mapGrid: [
    [[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],],
    [[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],],
    [[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],],
    [[" "],[" "],[" "],[" "],["W"],["W"],["W"],["W"],["W"],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],],
    [[" "],[" "],[" "],[" "],["W"],[" "],[" "],[" "],["W"],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],],
    [[" "],[" "],[" "],[" "],["W"],["B"],[" "],[" "],["W"],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],],
    [[" "],[" "],["W"],["W"],["W"],[" "],[" "],["B"],["W"],["W"],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],],
    [[" "],[" "],["W"],[" "],[" "],["B"],[" "],["B"],[" "],["W"],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],],
    [["W"],
      ["W"],
      ["W"],
      [" "],
      ["W"],
      [" "],
      ["W"],
      ["W"],
      [" "],
      ["W"],
      [" "],
      [" "],
      [" "],
      ["W"],
      ["W"],
      ["W"],
      ["W"],
      ["W"],
      ["W"],
    ],
    [
      ["W"],
      [" "],
      [" "],
      [" "],
      ["W"],
      [" "],
      ["W"],
      ["W"],
      [" "],
      ["W"],
      ["W"],
      ["W"],
      ["W"],
      ["W"],
      [" "],
      [" "],
      ["G"],
      ["G"],
      ["W"],
    ],
    [
      ["W"],
      [" "],
      ["B"],
      [" "],
      [" "],
      ["B"],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      ["G"],
      ["G"],
      ["W"],
    ],
    [
      ["W"],
      ["W"],
      ["W"],
      ["W"],
      ["W"],
      [" "],
      ["W"],
      ["W"],
      ["W"],
      [" "],
      ["W"],
      ["P"],
      ["W"],
      ["W"],
      [" "],
      [" "],
      ["G"],
      ["G"],
      ["W"],
    ],
    [
      [" "],
      [" "],
      [" "],
      [" "],
      ["W"],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      ["W"],
      ["W"],
      ["W"],
      ["W"],
      ["W"],
      ["W"],
      ["W"],
      ["W"],
      ["W"],
    ],
    [
      [" "],
      [" "],
      [" "],
      [" "],
      ["W"],
      ["W"],
      ["W"],
      ["W"],
      ["W"],
      ["W"],
      ["W"],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
    ],
    [
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
    ],
    [
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
    ],
  ],
};
