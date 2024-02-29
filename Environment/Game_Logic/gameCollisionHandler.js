export const rollCollisionHandler = (ev, game) => {
    const pin1 = ev.collidedAgainst.transformNode;
    const pin2 = ev.collider.transformNode;
    const pin1Name = pin1.name;
    const pin2Name = pin2.name;
    
    if(pin1Name.slice(0,3) == "pin"){
        //console.log(pinName[4]);
        //booleanArray[pinName[4]] = true;
        return pin1Name[4];
    }

    if( pin2Name.slice(0,3) == "pin"){
        return pin2Name[4];
    }
    

    //console.log(trueCount);
    /*if(pin.name == 'lane' || pin.name == 'bowlingBall' || pin.name == 'cube'){
        return;
    }
    const pinVpin = ev.collider.transformNode;
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
    //console.log(pinIndex, ' hits ', pinVpinIndex);

    // console.log(game.pinsArray[pinIndex]);*/
}