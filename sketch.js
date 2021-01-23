//Create variables here
var  dog, dogImage, happyDog, database, foodS, foodStock;

function preload()
{
  //load images here
  dogImage = loadImage("images/dogImg.png")
  happyDog = loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(500, 500);
  
  dog = createSprite(250, 250, 10, 10);
  dog.addImage(dogImage);
  dog.scale = 0.25;

  database = firebase.database();
  foodStock = database.ref('food')
  foodStock.on("value", readStock);
}


function draw() {  
  background(46, 139, 87);
  if(foodS != undefined){
    if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    if(foodS >= 1){
      foodS = foodS - 1;
    }
    dog.addImage(happyDog);
  }
  drawSprites();
  //add styles here
  textSize(30);
  fill('white');
  stroke('white');
  text("Food Remaining :" + foodS, 100, 150);

  textSize(20);
  fill('white');
  stroke('white');
  text("Press Up Arrow Key To Feed Shawn", 100, 400)
}
}

function readStock(data){
  foodS = data.val(); 
}

function writeStock(x){
  database.ref('/').update({
    food : x
  })
}



