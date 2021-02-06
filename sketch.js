let bw = 30;
let mapArr = [];
let riverArr = [];
let dx =0;
let dy =0;
function preload(){
  grass = loadImage("assets/Tiles/mapTiles/grass.png")
  grassDark = loadImage("assets/Tiles/mapTiles/grassD.png")
  sand = loadImage("assets/Tiles/mapTiles/sand1.png")
}
function setup(){
  grass.resize(bw,bw)
  grassDark.resize(bw,bw)
  sand.resize(bw,bw)



  createCanvas(800-bw,400-bw,WEBGL)
  mapObj = createGraphics(800-bw,400-bw);
  createHeightMap();
  drawMap();
}
let trigClock = 0;
function draw(){
  // orbitControl()
  background(0)
  trigClock+=0.1
  mapMovement()
  texture(mapObj)
  noStroke()
  plane(800,400)









  //rotateY(trigClock)
  //sphere(width,height)
  //image(mapObj,0,0)
}
let fs = 0
function mousePressed() {

    if(fs==0){
      let fs = fullscreen();
      fullscreen(!fs);
      fs = 1;
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
  mapObj.noStroke();
  for(let i = 0;i<width/bw;i++){
    for(let j = 0;j<height/bw;j++){
      let h = mapArr[i+dx][j+dy];
      if(h<.2){
        mapObj.image(sand,i*bw,j*bw)
        //mapObj.rect(i*bw,j*bw,bw,bw)
        //mapObj.fill(194,178+10*sin(h*(dx+i)),128)
      }
      else if(h<.45){
        mapObj.image(sand,i*bw,j*bw)
        //mapObj.rect(i*bw,j*bw,bw,bw)
        //mapObj.fill(0,50+10*sin(h*(i+dx)),100)
      }
      // else if(h<.49){
      //   mapObj.fill(135,124+10*sin(h*(i+dx)),89)
      //   mapObj.rect(i*bw,j*bw,bw,bw)
      // }
      // // else if(h<.47){
      // //   mapObj.fill(100+20*sin(h*(i+dx)),124,89)
      // // }
      else if(h<.55){
        mapObj.image(grassDark,i*bw,j*bw)
        mapObj.fill(0,0,60*sin(h*(i+dx)),0)
        mapObj.rect(i*bw,j*bw,bw,bw)
      }
      else if(h<.8){
        mapObj.image(grass,i*bw,j*bw)
        //mapObj.fill(0,0,60*sin(h*(i+dx)),70)
        //mapObj.rect(i*bw,j*bw,bw,bw)
      }
      else if(h<.82){
        mapObj.fill(128,128,128)
        mapObj.rect(i*bw,j*bw,bw,bw)
      }

      else if(h<1){
        mapObj.fill(107,126,135)
        mapObj.rect(i*bw,j*bw,bw,bw)
      }

    }
  }
}
function mapMovement(){
  waterInc += 0.03;

  push()
  for(let i = 0;i<width/bw;i++){
    for(let j = 0;j<height/bw;j++){
        let h = mapArr[i+dx][j+dy];
        if(h>.2&&h<.4){
          mapObj.fill(0,0,150-20*sin(h*(dx+i+waterInc)),255,200)
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


// if(h < .5&& h>.4)mapObj.fill(0,0,255)
// else mapObj.fill(255*h)
// // //if(i == width/bw/2&& j == height/bw/2)mapObj.fill(255,0,0)
// mapObj.rect(i*bw,j*bw,bw,bw)
