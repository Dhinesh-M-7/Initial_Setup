export const rollCollisionHandler = (ev, scene, window, game) => {
    const pin1 = ev.collidedAgainst.transformNode;
    const pin2 = ev.collider.transformNode;
    const pin1Name = pin1.name;
    const pin2Name = pin2.name;

    if(pin2Name === 'bowlingBall' && pin1Name.slice(0,3) === 'pin'){
        console.log('hit');
        window.globalHitMusic.play();
    }
    
    if(pin1Name.slice(0,3) == "pin"){
        game.pinsArray[pin1Name[4]].isHit = true;
    }

    if( pin2Name.slice(0,3) == "pin"){
        game.pinsArray[pin2Name[4]].isHit = true;
    }
}