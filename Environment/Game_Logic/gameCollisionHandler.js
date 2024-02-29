export const rollCollisionHandler = (ev, game) => {
    const pin = ev.collidedAgainst.transformNode;
    if(pin.name == 'lane' || pin.name == 'bowlingBall' || pin.name == 'cube'){
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
    console.log(pinIndex, ' hits ', pinVpinIndex);

    // console.log(game.pinsArray[pinIndex]);
}