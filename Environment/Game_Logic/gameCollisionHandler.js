export const rollCollisionHandler = (ev, scene, window, game) => {
    const collidedAgainstMesh = ev.collidedAgainst.transformNode;
    const colliderMesh = ev.collider.transformNode;
    const collidedAgainstMeshName = collidedAgainstMesh.name;
    const colliderMeshName = colliderMesh.name;

    if(colliderMeshName === 'bowlingBall' && collidedAgainstMeshName.slice(0,3) === 'pin'){
        // console.log('hit');
        window.globalHitMusic.play();
    }
    
    if(collidedAgainstMeshName.slice(0,3) == "pin"){
        game.pinsArray[collidedAgainstMeshName[4]].isHit = true;
    }

    if( colliderMeshName.slice(0,3) == "pin"){
        game.pinsArray[colliderMeshName[4]].isHit = true;
    }
}