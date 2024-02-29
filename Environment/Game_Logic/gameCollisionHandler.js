export const rollCollisionHandler = (ev, game, scene, window) => {
    const pin = ev.collidedAgainst.transformNode;
    const pinVpin = ev.collider.transformNode;
    if((pinVpin.name==='bowlingBall') && pin.name.startsWith('pin-')){
        window.globalHitMusic.play();
    }

    if ((pinVpin.name === 'lane' || pinVpin.name === 'bowlingBall') && pin.name.startsWith('pin-')) {
        const pinIndex = game.pinsArray.findIndex((it) => it.pinId === pin.id);
        const pinVpinIndex = game.pinsArray.findIndex((it) => it.pinId === pinVpin.id);
        if (pinIndex !== -1) {
            game.pinsArray[pinIndex].isHit = true;
        }
        if (pinVpinIndex !== -1) {
            game.pinsArray[pinVpinIndex].isHit = true;
        }
    } else if (pinVpin.name.startsWith('pin-')) {
        const pinIndex = game.pinsArray.findIndex((it) => it.pinId === pin.id);
        const pinVpinIndex = game.pinsArray.findIndex((it) => it.pinId === pinVpin.id);
        if (pinIndex !== -1) {
            game.pinsArray[pinIndex].isHit = true;
        }
        if (pinVpinIndex !== -1) {
            game.pinsArray[pinVpinIndex].isHit = true;
        }
    } else {
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
    console.log(pin.name, 'hits', pinVpin.name);
    console.log(pin.position, ' hits ', pinVpin.position);

    // console.log(game.pinsArray[pinIndex]);
}
