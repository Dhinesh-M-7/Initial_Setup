import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";
import { startMenuGUI } from "../Game_GUI/startMenuGUI";
import {
  overallScoreBoardDisplay,
  currentRollScoreBoardDisplay,
} from "../Game_GUI/renderScoreBoard";
import { updateGameScores } from "../Game_GUI/scoreBoard";

export const pointerDown = (mesh, getPointerPosition) => {
  const startingPoint = getPointerPosition();
  return [mesh, startingPoint];
};

export const pointerUp = (
  startingPoint,
  aim,
  game,
  ballMovementObjects,
  bowlingPinResult,
  createBowlingPins,
  scene
) => {
  const bowlingBallPosition = ballMovementObjects.bowling_ball.absolutePosition;

  //Mapping ball Speed with respect to the dragiing of the ball
  const ballSpeed = (-bowlingBallPosition.z - 62) * 40;
  if (bowlingBallPosition.z < -63) {
    //Applying impulse to the ball
    ballMovementObjects.bowlingAggregate.body.applyImpulse(
      new BABYLON.Vector3(-aim.rotation.y * 120, 0, ballSpeed),
      ballMovementObjects.bowling_ball.getAbsolutePosition()
    );
    window.globalShootmusic.play();
    setTimeout(function () {
      window.globalShootmusic.stop();
    }, 1500);
    game.ballIsRolled = true;
  }

  if (game.ballIsRolled === true) {
    setTimeout(() => {
      //Getting back the pin to it's original position
      ballMovementObjects.setPins.forEach((pin) => {
        pin.dispose();
      });
      ballMovementObjects.setPins = createBowlingPins(bowlingPinResult);

      //Getting back the ball to it's initial position
      ballMovementObjects.bowlingAggregate.body.setLinearVelocity(
        new BABYLON.Vector3(0, 0, 0)
      );
      ballMovementObjects.bowlingAggregate.body.setAngularVelocity(
        new BABYLON.Vector3(0, 0, 0)
      );
      ballMovementObjects.bowling_ball.rotation = new BABYLON.Vector3(0, 0, 0);
      ballMovementObjects.bowling_ball.position = new BABYLON.Vector3(
        0,
        4,
        -62
      );
      //update the score board GUI -- current and overall scores
      updateGameScores(game);
      //if every player has rolled (5) all attempts, 
      //stop the game -- controls, GUI and then reset the game
      if (
        game.currentFrameIndex === game.totalAttempts - 1 &&
        game.currentPlayerIndex === game.players.length - 1
      ) {
        game.isGameStarted = false;
        setTimeout(() => {
          overallScoreBoardDisplay.isVisible = false;
          currentRollScoreBoardDisplay.isVisible = false;
          startMenuGUI(scene, game);
        }, 1500);
      }
      //switch to the next player -- marks the end of the roll
      game.switchPlayer();
      game.ballIsRolled = false;
      game.initializePins();
    }, 5000);
  }
  return [startingPoint, null];
};

export const pointerMove = (
  startingPoint,
  getPointerPosition,
  ballMovementObjects,
  aim,
  currentMesh
) => {
  const currentPosition = getPointerPosition();

  if (currentMesh != ballMovementObjects.bowling_ball) return;

  let aimAngle =
    (ballMovementObjects.bowling_ball.position.x + currentPosition.x) * 0.1;

  if (aimAngle > 0.15) aimAngle = 0.15;
  else if (aimAngle < -0.15) aimAngle = -0.15;

  aim.rotation.y = aimAngle;

  const differenceFromCurrentPoint = currentPosition.subtract(startingPoint);
  differenceFromCurrentPoint.x = 0;

  // Define the limits for z movement
  const minZ = -67; // Minimum z value
  const maxZ = -62; // Maximum z value

  const newZ = ballMovementObjects.bowling_ball.position.z + differenceFromCurrentPoint.z;

  // Check if the new position exceeds the limits
  if (newZ < minZ) {
    differenceFromCurrentPoint.z = minZ - ballMovementObjects.bowling_ball.position.z;
  } else if (newZ > maxZ) {
    differenceFromCurrentPoint.z = maxZ - ballMovementObjects.bowling_ball.position.z;
  }

  ballMovementObjects.bowling_ball.position.addInPlace(differenceFromCurrentPoint);

  startingPoint = currentPosition;
  return startingPoint;
};

export const ballMovement = (bowling_ball, pressedArrow) => {
  if (bowling_ball.position.x <= 8 && bowling_ball.position.x >= -8) {
    if (pressedArrow == "ArrowLeft" && bowling_ball.position.x != 8)
      bowling_ball.position.x += 1;
    if (pressedArrow == "ArrowRight" && bowling_ball.position.x != -8)
      bowling_ball.position.x -= 1;
  }
};
