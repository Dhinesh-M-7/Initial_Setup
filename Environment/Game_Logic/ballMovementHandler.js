import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";
import { startMenuGUI } from "../startMenuGUI";
import { overallScoreBoardDisplay, currentRollScoreBoardDisplay } from "../renderScoreBoard"


export const pointerDown = (mesh, getLanePosition) => {
    //currentMesh = mesh;
    
    const startingPoint = getLanePosition();
    return [mesh, startingPoint];
  };

export const pointerUp = (startingPoint, aim, game, meshObject, updateGameScores, bowlingPinResult, createBowlingPins, scene) => {
    const bowlingBallPosition = meshObject.bowling_ball.absolutePosition;
    if (startingPoint) {
      const ballSpeed = (-bowlingBallPosition.z - 6) * 10;
      if (bowlingBallPosition.z < -63) {
        meshObject.bowlingAggregate.body.applyImpulse(
          new BABYLON.Vector3(-aim.rotation.y * 550, 0, ballSpeed),
          meshObject.bowling_ball.getAbsolutePosition()
        );
        window.globalShootmusic.play();
        setTimeout(function () {
          window.globalShootmusic.stop();
        }, 1500);
        game.ballIsRolled = true;
      }
    }
    //startingPoint = null;
    if (game.ballIsRolled === true) {
      setTimeout(() => {
        meshObject.setPins.forEach((pin) => {
          pin.dispose();
        });
        const currentRollScore = game.gameScoreCalculation();
        const overallScore = game.totalScoreCalculation();
        updateGameScores(game, currentRollScore, overallScore);
  
        meshObject.setPins = createBowlingPins(bowlingPinResult);
  
        meshObject.bowlingAggregate.body.setLinearVelocity(new BABYLON.Vector3(0, 0, 0));
        meshObject.bowlingAggregate.body.setAngularVelocity(new BABYLON.Vector3(0, 0, 0));
        meshObject.bowling_ball.rotation = new BABYLON.Vector3(0, 0, 0);
        meshObject.bowling_ball.position = new BABYLON.Vector3(0, 4, -62);
  
        game.ballIsRolled = false;
        game.initializePins();
  
        if (game.currentFrameIndex >= 5) {
          setTimeout(() => {
            overallScoreBoardDisplay.isVisible = false;
            currentRollScoreBoardDisplay.isVisible = false;
            startMenuGUI(scene, game);
          }, 500);
        }
      }, 5000);
    }
    return [startingPoint, null];
};

export const pointerMove = (startingPoint, getLanePosition, meshObject, aim, currentMesh) => {
    if (!startingPoint) {
      return;
    }
    const current = getLanePosition();

    if (!current) {
      return;
    }

    if(!currentMesh || currentMesh.name != "bowlingBall") return;
  
    let aimAngle = (meshObject.bowling_ball.position.x + current.x) * 0.1;
  
    if (aimAngle > 0.15) aimAngle = 0.15;
    else if (aimAngle < -0.15) aimAngle = -0.15;
  
    console.log(meshObject.bowling_ball.position.x);
  
    aim.rotation.y = aimAngle;
    console.log(aimAngle);
  
    const diff = current.subtract(startingPoint);
    diff.x = 0;
  
    // Define the limits for z movement
    const minZ = -67; // Minimum z value
    const maxZ = -62; // Maximum z value
  
    const newZ = meshObject.bowling_ball.position.z + diff.z;
  
    // Check if the new position exceeds the limits
    if (newZ < minZ) {
      diff.z = minZ - meshObject.bowling_ball.position.z;
    } else if (newZ > maxZ) {
      diff.z = maxZ - meshObject.bowling_ball.position.z;
    }
  
    meshObject.bowling_ball.position.addInPlace(diff);
  
    startingPoint = current;
    return startingPoint;
};