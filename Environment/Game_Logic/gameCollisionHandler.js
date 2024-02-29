export const rollCollisionHandler = (ev, window, scene, game) => {
    const pin1 = ev.collidedAgainst.transformNode;
    const pin2 = ev.collider.transformNode;
    const pin1Name = pin1.name;
    const pin2Name = pin2.name;

    if(pin1Name === 'bowlingBall' && pin2Name.slice(0,3) === 'pin'){
        window.globalHitMusic.play();
    }
    
    if(pin1Name.slice(0,3) == "pin"){
        game.pinsArray[pin1Name[4]].isHit = true;
    }

    if( pin2Name.slice(0,3) == "pin"){
        game.pinsArray[pin2Name[4]].isHit = true;
    }
}