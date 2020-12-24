//Create variables here
// var gamestate = 0;
var database = firebase.database();
var TIMES = 0;
var textVal  = "";
var dogImg1, dogImg2, database;
var dogSprite, foodS, foodStock;
var remainingFood = 20;
var barksound, robotSound;
var ellapsedTime = 0;
var feed, addFood;
var fedTime, lastFed;
var foodObj, currentTime;
var sadDog;

//project 37 variables
var gamestateRead, gamestateChange
var bg1, bg2, bg3, bg4;


function preload()
{
  dogImg1 = loadImage('dogImg.png');
  dogImg2 = loadImage('dogImg1.png');

  bg1 = loadImage("Bed Room.png")
  bg2 = loadImage("Garden.png")
  bg3 = loadImage("Living Room.png")
  bg4 = loadImage("Wash Room.png");
}

function setup() {
  var name = "Drago"
  createCanvas(1150, 680);

  foodObj = new Food();

  dogSprite = createSprite(width/2, height/2);
  dogSprite.addImage(dogImg1)
  dogSprite.scale = 0.5;

  database.ref('Food').on('value', readStock)

  gamestateRead = database.ref("/")
  gamestateRead.on("value", function(data)
  {
    gamestateChange = data.val();
  })
  feed = createButton("Feed " + name)
  feed.position(700, 95)
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food")
  addFood.position(800, 95)
  addFood.mousePressed(addfood);
}


function draw() 
{
  background(46, 139, 87);

    database.ref("lastFed").on("value", function(data)
    {
      lastFed = data.val();
    }
    )

    currentTime = hour();
    if (currentTime == lastFed)
    {
      update("LivingRoom")
      foodObj.livingRoom();
    }
    if (currentTime == lastFed+1)
    {
      update("Playing")
      foodObj.garden()
    }

    else if (currentTime == lastFed + 2)
    {
      update("Sleeping")
      foodObj.bedroom();
    }

    else if(currentTime > lastFed + 2 && currentTime <= lastFed + 4)
    {
      update("Bathing")
      foodObj.washroom();
    }

    else
    {
      update("Hungry")
      gamestateChange = "Hungry";
    }

    if (gamestateChange == "Hungry")
    {
      background(46, 139, 87);
      foodObj.display()
      feed.show()
      addFood.show()
      // To show thw dog
      show()
    }
    else
    {
      feed.hide()
      addFood.hide()
      // To remove the dog
      remove()
    }

    if (lastFed >= 12)
    {
      text("LAST FEED: " + lastFed%12, 350, 30)
    }
    else if (lastFed == 0)
    {
      text("Last Fed: 12 AM", 350, 30);
    }
    else 
    {
      text("Last Feed: " +  lastFed + " PM", 350, 30);
    }

    drawSprites();
    fill("purple");
    textSize(20);
    text('FOOD REMAINING: ' + foodS, 130, 60);
  }

  function readStock(data)
  {
    foodS = data.val();
    foodObj.updateFoodStock(foodS)
  }

  function addfood(){
    console.log("addFood is working")
    if (foodS < 20)
    {
      foodS += 1
    }

      database.ref('/').update(
        {
          'Food': foodS
        }
      )
  }

  function feedDog()
  {
    if (foodS >= 0)
    {
      gamestateChange = "LivingRoom"
      foodObj.buttonPressed = true;
      dogSprite.addImage(dogImg2)
      console.log("FeedDog is working")
      foodS -= 1;
      if (foodS <= 0)
      {
        foodS = 0;
      } 
      lastFed = hour()
      database.ref("/").update(
        {
          'Food': foodObj.getFoodStock(),
          'lastFed': lastFed
        }
      )
      console.log("hjafkjah")
    }
}

function update(state)
{
  database.ref("/").update(
    {
      GameState: state
    }
  );
}

function show()
{
  dogSprite.x = width/2
}

function remove()
{
  dogSprite.x = 2000;
}

    
