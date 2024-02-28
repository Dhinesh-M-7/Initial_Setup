export const rollCollisionHandler = (ev, game) => {
    const pin = ev.collidedAgainst.transformNode;
    // console.log('hello', game);
    if(pin.name == 'lane' || pin.name == 'bowlingBall' || pin.name == 'cube'){
        return;
    }
    const pinVpin = ev.collider.transformNode;
    if(pinVpin.name =='lane' || pinVpin.name == 'bowlingBall' || pinVpin == 'cube'){
        return;
    }
    // console.log(pin.name, pinVpin.name);
    // Find the index of the collided pins in pinsArray
    // console.log(pin, pin.id);
    const pinIndex = game.pinsArray.findIndex((it) => it.pinId === pin.id);
    const pinVpinIndex = game.pinsArray.findIndex((it) => it.pinId === pinVpin.id);
  
    // Update the isHit property directly without iterating over pinsArray
    if (pinIndex !== -1) {
        game.pinsArray[pinIndex].isHit = true;
    }
    if (pinVpinIndex !== -1) {
        game.pinsArray[pinVpinIndex].isHit = true;
    }
    console.log(game);
    // console.log(pin.id, pinVpin.id, 'is hit and stored in ', pinIndex, pinVpinIndex);
    // console.log(pin.id===pinIndex, pinVpin===pinVpinIndex);
}
  