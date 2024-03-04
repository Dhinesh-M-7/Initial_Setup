import * as BABYLON from "@babylonjs/core"

export const createBowlingBall = (bowlingBallResult, scene) => {
    const bowling_ball = bowlingBallResult.meshes[1];
    bowling_ball.scaling = new BABYLON.Vector3(1, 1, 1);
    bowling_ball.position.y = 4;
    bowling_ball.position.z = -62;
  
    const bowling_aggregator = new BABYLON.PhysicsAggregate(
      bowling_ball,
      BABYLON.PhysicsShapeType.SPHERE,
      { mass: 1, restitution: 0.45, friction: 0.75}, scene
    )
    bowling_aggregator.body.disablePreStep = false;
    bowling_aggregator.body.setCollisionCallbackEnabled(true);
    return [bowling_ball, bowling_aggregator];
  };

export const createBowlingPins = (bowlingPinResult, scene) => {
    const bowlingPin = bowlingPinResult.meshes[1];
    bowlingPin.scaling = new BABYLON.Vector3(1.5, 1.5, 1.5);
    bowlingPin.isVisible = false;

    const pinPositions = [
        new BABYLON.Vector3(-10, 0.5, 98),
        new BABYLON.Vector3(-4, 0.5, 98),
        new BABYLON.Vector3(4, 0.5, 98),
        new BABYLON.Vector3(10, 0.5, 98),

        new BABYLON.Vector3(0, 0.5, 94),
        new BABYLON.Vector3(-7, 0.5, 94),
        new BABYLON.Vector3(7, 0.5, 94),

        new BABYLON.Vector3(-3.5, 0.5, 90),
        new BABYLON.Vector3(3.5, 0.5, 90),

        new BABYLON.Vector3(0, 0.5, 86),
    ];

    const setPins = pinPositions.map(function (position, idx) {
        const pin = new BABYLON.InstancedMesh("pin-" + idx, bowlingPin);
        pin.position = position;
        const pinAggregate = new BABYLON.PhysicsAggregate(pin, BABYLON.PhysicsShapeType.CONVEX_HULL, { mass: 0.25, restitution: 0.1,friction:1.6 }, scene);
        pinAggregate.body.setCollisionCallbackEnabled(true);
        return pin;
    });
    return setPins;
}
