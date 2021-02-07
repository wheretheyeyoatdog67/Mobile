let bw = 30;
let mapArr = [];
let riverArr = [];
let dx =0;
let dy =0;
let moffX = 0;
let moffY = 0;
function preload(){
  grass = loadImage("assets/Tiles/mapTiles/grass.png")
  grassDark = loadImage("assets/Tiles/mapTiles/grassD.png")
  sand = loadImage("assets/Tiles/mapTiles/sand1.png")

  pf1 = loadImage("assets/player/pf1.png")
  pf2 = loadImage("assets/player/pf2.png")

  pl1 = loadImage("assets/player/pl1.png")
  pl2 = loadImage("assets/player/pl2.png")

  pr1 = loadImage("assets/player/pr1.png")
  pr2 = loadImage("assets/player/pr2.png")

  pu1 = loadImage("assets/player/pu1.png")
  pu2 = loadImage("assets/player/pu2.png")

  grassMid = loadImage("assets/Tiles/midGround/grassMid.png")

}
function setup(){
  grass.resize(bw,bw)
  grassDark.resize(bw,bw)
  sand.resize(bw,bw)
  pf1.resize(bw,bw)
  pf2.resize(bw,bw)

  pl1.resize(bw,bw)
  pl2.resize(bw,bw)

  pr1.resize(bw,bw)
  pr2.resize(bw,bw)

  pu1.resize(bw,bw)
  pu2.resize(bw,bw)
  grassMid.resize(bw,bw)





  createCanvas(780,360,WEBGL)
  mapObj = createGraphics(780,360);
  interfaceLayer = createGraphics(780,360);
  createHeightMap();
  drawMap();
  player = new Player();
}
let trigClock = 0;
let clock = 0;
function draw(){

  trigClock+=0.1
  clock++;
  pressedDownMouse()

  if(clock%1 == 0&&!mouseIsPressed){
    if(moffX > 0) moffX -= .1;
    else if(moffX < 0) moffX += .1;
    if(moffY > 0) moffY -= .1;
    else if(moffY < 0) moffY += .1;

    if(moffX*moffX < .1)moffX = 0;
    if(moffY*moffY<.1)moffY = 0;
  }


  //orbitControl()
  background(96.1, 96.1, 86.3)
  let lightLevel = 255*sin(trigClock/20);
  //if(lightLevel<0)lightLevel*=-1;
  ambientLight(lightLevel,lightLevel,lightLevel)
  //ellipseMode(CENTER)
  if(player.lightOut)
  pointLight(255,255,255, 0,0, 50);

  mapMovement()

  texture(mapObj)
  noStroke()
  plane(780,360)
  //interfaceLayer.strokeWeight(1)









  drawinterfaceLayer()
  player.drawPlayer()
  texture(interfaceLayer)

  noStroke()
  plane(780,360)
  //rotateY(trigClock)
  //sphere(width,height)
  //image(mapObj,0,0)
}
let fg =0;
function mousePressed() {
    if(fg == 0 && mouseX > 750&& mouseY < 30){
      let fs = fullscreen();
      fullscreen(!fs);

    }


}
function pressedDownMouse() {
  if(mouseIsPressed && clock%8==0){
  if(dist(mouseX,mouseY,100,275)<100){
    let l = mouseX - 100;
    let g = mouseY - 275;

    if(l<0) moffX = -1;
    else if(l>0) moffX = 1
    if(g<0) moffY = -1;
    else if(g>0) moffY = 1;
    console.log(l*l)
    console.log(g*g)
    if(l*l > g*g){
      dx+= moffX;
      moffY = 0;
    }
    else {
      //console.log("hi")
      dy+= moffY;
      moffX = 0;
    }
    drawMap()
  }
}

}
let waterInc = 0;
function  createHeightMap(){
  let noiseInc = .05;
  let riverInc = 0.04;

  for(let i = 0;i<1000;i++){
    mapArr.push([]);
    riverArr.push([]);
    for(let j = 0;j<1000;j++){
      let h = noise(i*noiseInc,j*noiseInc)
      let l = noise(i*riverInc+waterInc,j*riverInc+waterInc)
      riverArr[i][j] = l;
      mapArr[i][j] = h;
    }
  }
}

function drawMap(){
  //mapObj.noStroke();
  for(let i = 0;i<width/bw;i++){
    for(let j = 0;j<height/bw;j++){
      let h = mapArr[i+dx][j+dy];
      mapObj.strokeWeight(3)
      mapObj.stroke(96.1, 96.1, 86.3)
      if(h<.2){
        mapObj.image(sand,i*bw,j*bw)
        mapObj.noFill()

        mapObj.rect(i*bw,j*bw,bw,bw)
      }
      else if(h<.45){
        mapObj.image(sand,i*bw,j*bw)
        mapObj.noFill()
        mapObj.rect(i*bw,j*bw,bw,bw)
      }

      else if(h<.55){
        mapObj.image(grassDark,i*bw,j*bw)
        mapObj.fill(0,0,60*sin(h*(i+dx)),0)
        mapObj.rect(i*bw,j*bw,bw,bw)
        if(h>.5+sin((i+dx)*(j+dy)))
        mapObj.image(grassMid,i*bw,j*bw)
      }
      else if(h<.8){
        mapObj.image(grass,i*bw,j*bw)
        if(h>.7+sin((i+dx)*(j+dy)))
        mapObj.image(grassMid,i*bw,j*bw)
        mapObj.noFill()

        mapObj.rect(i*bw,j*bw,bw,bw)
      }
      else if(h<1){
        mapObj.fill(107,126,135)
        mapObj.rect(i*bw,j*bw,bw,bw)
        mapObj.noFill()

        mapObj.rect(i*bw,j*bw,bw,bw)
      }

    }
  }
}
function mapMovement(){
  waterInc += 0.3;

  push()
  for(let i = 0;i<width/bw;i++){
    for(let j = 0;j<height/bw;j++){
        let h = mapArr[i+dx][j+dy];
        if(h>.2&&h<.4){
          mapObj.image(sand,i*bw,j*bw)
          mapObj.fill(0,0,150-40*sin(h*h*(dx+i+waterInc)),h*450)
          mapObj.rect(i*bw,j*bw,bw,bw)
        }
        //clouds

    }
  }
  pop()
}

function keyPressed() {
  let speed = 2;
  console.log(keyCode)
  if (keyCode == 68) {
    dx += speed;
  } else if (keyCode == 65) {
    dx -= speed;
  }
  else if (keyCode == 87) {
    dy -= speed;
  }
  else if (keyCode == 83) {
    dy += speed;
  }
  drawMap()
}
function drawinterfaceLayer(){

  interfaceLayer.clear()
  interfaceLayer.strokeWeight(30)
  interfaceLayer.stroke(245,200,100)
  interfaceLayer.noFill()
  interfaceLayer.rect(0,0,width,height)
  interfaceLayer.noStroke()
  interfaceLayer.fill(70,70,70,200)
  interfaceLayer.ellipse(100,275,100,100)
  interfaceLayer.fill(70,0,0,150)
  interfaceLayer.ellipse(100,275,20,20)
  interfaceLayer.fill(200,200,200,200)
  interfaceLayer.ellipse(100+10*moffX,275+10*moffY,50,50)
  interfaceLayer.stroke(255,0,0)
  interfaceLayer.strokeWeight(3)
  interfaceLayer.rect(750,0,bw,bw)
  interfaceLayer.line(750,0,780,bw)
  interfaceLayer.line(780,0,750,bw)
}

class effects{
  //animations
  //wood cutting
  //etc
}
