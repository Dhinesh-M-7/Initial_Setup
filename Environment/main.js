import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";

import { rollCollisionHandler } from "./Game_Logic/gameCollisionHandler";
import {
  pointerDown,
  pointerUp,
  pointerMove,
} from "./Game_Logic/ballMovementHandler";
import { createEnvironment } from "./Game_Environment/environment";
import { createLights, createGameMusic, createRollSound } from "./Game_Environment/lightsAndMusic";
import { createAnimations } from "./Game_Environment/animation";
import { createBowlingLane } from "./Game_Environment/bowlingLane";
import { createAim } from "./aim";
import { createBowlingBall, createBowlingPins } from "./bowlingBallAndPins";
import { particles } from "./Game_Environment/particles";
import {
  renderScoreBoard,
  currentRollScoreBoardDisplay,
  overallScoreBoardDisplay,
} from "./renderScoreBoard";
import { StartNewGame } from "./Game_Logic/newGameDataStructure";



const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas);

async function createScene() {
  const scene = new BABYLON.Scene(engine);

  const havokInstance = await HavokPhysics();
  const havokPlugin = new BABYLON.HavokPlugin(true, havokInstance);
  scene.enablePhysics(new BABYLON.Vector3(0, -9.8, 0), havokPlugin);

  const camera = new BABYLON.UniversalCamera(
    "camera",
    new BABYLON.Vector3(0, 25, -100)
  );
  camera.setTarget(new BABYLON.Vector3(0, 0, 0));
  camera.inputs.clear();
  camera.attachControl();

  const bowlingPinResult = await BABYLON.SceneLoader.ImportMeshAsync(
    "",
    "Models/",
    "bowling_pin.glb"
  );

  const bowlingBallResult = await BABYLON.SceneLoader.ImportMeshAsync(
    "",
    "Models/",
    "bowling_ball.glb"
  );

  const aim = createAim();
  aim.isVisible = false;
  let [bowling_ball, bowlingAggregate] = createBowlingBall(bowlingBallResult);
  aim.parent = bowling_ball;

  createEnvironment();
  createLights();
  createGameMusic(scene);
  const lane = createBowlingLane();

  let setPins = createBowlingPins(bowlingPinResult);

  let meshObject = { bowling_ball, bowlingAggregate, setPins };
  let startingPoint;
  let currentMesh;

  const updateGameScores = (game) => {
    const currentRollScore = game.gameScoreCalculation();
    const overallScore = game.totalScoreCalculation();
    currentRollScoreBoardDisplay.updateText("Attempt - " + (game.currentFrameIndex+1).toString());
    if (game.entireFrames[game.currentPlayerIndex][game.currentFrameIndex].bonus === "strike") {
      particles(new BABYLON.Vector3(13, 18, -30));
      particles(new BABYLON.Vector3(-13, 18, -30));
      currentRollScoreBoardDisplay.appendText("\n!!!Strike!!!");
    } 
    currentRollScoreBoardDisplay.appendText("\nCurrent: "+ currentRollScore.toString());
    overallScoreBoardDisplay.updateText(
      game.players[game.currentPlayerIndex] + "\nOverall: " + overallScore.toString()
    );
  };

  const getLanePosition = () => {
    const pickinfo = scene.pick(scene.pointerX, scene.pointerY, (mesh) => {
      return mesh == lane;
    });
    if (pickinfo.hit) {
      return pickinfo.pickedPoint;
    }
    return null;
  };

  const ballMovement = (pressedArrow) => {
    if (bowling_ball.position.x <= 8 && bowling_ball.position.x >= -8) {
      if (pressedArrow == "ArrowLeft" && bowling_ball.position.x != 8)
        bowling_ball.position.x += 1;
      if (pressedArrow == "ArrowRight" && bowling_ball.position.x != -8)
        bowling_ball.position.x -= 1;
    }
  };

  scene.onPointerObservable.add((pointerInfo) => {
    if (game.isGameStarted === true) {
      switch (pointerInfo.type) {
        case BABYLON.PointerEventTypes.POINTERDOWN:
          if (
            pointerInfo.pickInfo.hit &&
            pointerInfo.pickInfo.pickedMesh == bowling_ball
          ) {
            aim.isVisible = true;
            [currentMesh, startingPoint] = pointerDown(
              pointerInfo.pickInfo.pickedMesh,
              getLanePosition
            );
          }
          break;
        case BABYLON.PointerEventTypes.POINTERUP:
          aim.isVisible = false;
          [startingPoint, currentMesh] = pointerUp(
            startingPoint,
            aim,
            game,
            meshObject,
            updateGameScores,
            bowlingPinResult,
            createBowlingPins,
            scene
          );
          break;
        case BABYLON.PointerEventTypes.POINTERMOVE:
          startingPoint = pointerMove(
            startingPoint,
            getLanePosition,
            meshObject,
            aim,
            currentMesh
          );
          break;
      }
    }
  });

  // Create a new instance of StartGame with generalPins
  let game = new StartNewGame(setPins, ['Player 1', 'Player 2']);
  createAnimations(camera, scene, game);
  createRollSound();
  renderScoreBoard(scene);
  havokPlugin.onCollisionEndedObservable.add((ev) =>
    rollCollisionHandler(ev, scene, window, game)
  );

  scene.onKeyboardObservable.add((kbInfo) => {
    switch (kbInfo.type) {
      case BABYLON.KeyboardEventTypes.KEYDOWN:
        ballMovement(kbInfo.event.key);
    }
  });

  return scene;
}

createScene().then((scene) => {
  engine.runRenderLoop(function () {
    if (scene) {
      scene.render();
    }
  });
});
window.addEventListener("resize", function () {
  engine.resize();
});
