export const rollCollisionHandler = (ev, game) => {
    const pin = ev.collidedAgainst.transformNode;
    const pinVpin = ev.collider.transformNode;
    if(pin.name == 'lane' || pin.name == 'bowlingBall' || pin.name == 'cube'){
        return;
    }
    if(pinVpin.name =='lane' || pinVpin.name == 'bowlingBall' || pinVpin == 'cube'){
        return;
    }
    const pinIndex = game.pinsArray.findIndex((it) => {
        return it.pinId === pin.id
    });
    const pinVpinIndex = game.pinsArray.findIndex((it) => 
    {
        return it.pinId === pinVpin.id
    });
  
    if (pinIndex !== -1) {
        game.pinsArray[pinIndex].isHit = true;
    }
    if (pinVpinIndex !== -1) {
        game.pinsArray[pinVpinIndex].isHit = true;
    }
    console.log(pinVpin.id, ' hits ', pin.id)
    console.log(game.pinsArray)
}

/* function isPinFell(value){
    // console.log(value.x, value.z);
    if((value.x > 0.3 || value.x < -0.3) || (value.z > 0.3 || value.z < -0.3)){
        return true;
    }
    return false;
} */