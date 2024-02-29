export const rollCollisionHandler = (ev, game) => {
    const pin = ev.collidedAgainst.transformNode;
    const pinVpin = ev.collider.transformNode;

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
}

/* function isPinFell(value){
    // console.log(value.x, value.z);
    if((value.x > 0.3 || value.x < -0.3) || (value.z > 0.3 || value.z < -0.3)){
        return true;
    }
    return false;
} */