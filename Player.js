class Player{
  constructor(){
    this.x = 780/2/bw
    this.y = 360/2/bw
    this.lightOut = true;

  }
  drawPlayer(){
    let frame = pr1;
    if(moffX > 0)frame = pr1;
    else if(moffX < 0)frame = pl1;

    else if(moffY < 0)frame = pu1;
    else if(moffY > 0 || moffY == 0)frame = pf1;
    //else if(frame = pl1;)
    interfaceLayer.image(frame,this.x*bw,this.y*bw)
  }
}
