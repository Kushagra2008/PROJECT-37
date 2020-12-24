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

  bg1 = loadImage("images/Bed Room.png")
  bg2 = loadImage("images/Garden.png")
  bg3 = loadImage("images/Living Room.png")
  bg4 = loadImage("images/Wash Room.png");
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













  //   if (keyWentDown(UP_ARROW) && TIMES < 5)
  //   {
  //     writeStock(foodS)
  //     TIMES += 1;
  //     dogSprite.addImage(dogImg2)
  //     dogSprite.scale = 0.4;
  //   }

  // else if (keyWentDown(UP_ARROW) && TIMES >= 5)
  //     {
  //       textVal = "";
  //       barksound.play()
  //       text("translating", width/ 2, height / 2);
  //       sleep(2000);

  //       // TRANSLATING DOG LANGUAGE TO ENGLISH
  //         robotSound.play();
  //         sleep(2000);
  //       textVal = "HEY, I AM NOT HUNGRY NOW!"
  //     }
  

  // if (gamestate == 0)
  // {
  //   a = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  //   rect(10, height/2 - 40, width - 20, 40)
  //   for (var x = 0; x < 10; x++)
  //   {
  //     if (keyWentDown())
  //     {
        
  //     }
  //   }
  //   if (keyWentDown("enter"))
  //   {
  //     gamestate = 1;
  //   }
  // }

  // function writeStock(x)
  // {
  //   if (x <= 0)
  //   {
  //     x = 0
  //   }
  //   else
  //   {
  //     x -= 1
  //   }
  //   console.log(x)
  //   remainingFood = x;
  //   reference = database.ref('/')
  //   reference.update({
  //     Food:x
  //   })
  // }
  
  // 
    
