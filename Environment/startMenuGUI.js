import { AdvancedDynamicTexture, Button } from "@babylonjs/gui";
import * as BABYLON from "@babylonjs/core";
import {
  overallScoreBoardDisplay,
  currentRollScoreBoardDisplay,
} from "./renderScoreBoard";
import { infoGUI } from "./infoGUI";
import { StartNewGame } from "./Game_Logic/newGameDataStructure";

function createOwnPlane(scene, height, width, positionCoordinates) {
  let plane = BABYLON.MeshBuilder.CreatePlane(
    "plane",
    { height: height, width: width },
    scene
  );
  plane.position.x = positionCoordinates[0];
  plane.position.y = positionCoordinates[1];
  plane.position.z = positionCoordinates[2];
  return plane;
}

function createButton(buttonName) {
  let button = Button.CreateSimpleButton("but1", buttonName);
  button.width = 5;
  button.height = 2;
  button.color = "white";
  button.fontSize = 80;
  button.background = "#6f6f6f";
  return button;
}

function createStartButton(scene) {
  let startButtonPositionCoordinates = [0, 25, -92];
  let startPlane = createOwnPlane(scene, 1, 5, startButtonPositionCoordinates);
  startPlane.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
  let startButton = createButton("NEW GAME");
  let advancedTexture = AdvancedDynamicTexture.CreateForMesh(startPlane);
  advancedTexture.addControl(startButton);
  return [startButton, startPlane];
}

function createInfoButton(scene) {
  let infoButtonPositionCoordinates = [0, 23.5, -92];
  let infoPlane = createOwnPlane(scene, 1, 5, infoButtonPositionCoordinates);
  infoPlane.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
  let infoButton = createButton("INFO");
  let advancedTexture = AdvancedDynamicTexture.CreateForMesh(infoPlane);
  advancedTexture.addControl(infoButton);
  return [infoButton, infoPlane];
}

function createExitButton(scene) {
  let exitButtonPositionCoordinates = [0, 22, -92];
  let exitPlane = createOwnPlane(scene, 1, 5, exitButtonPositionCoordinates);
  exitPlane.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
  let exitButton = createButton("EXIT");
  let advancedTexture = AdvancedDynamicTexture.CreateForMesh(exitPlane);
  advancedTexture.addControl(exitButton);
  return [exitButton, exitPlane];
}

const handleStartGame = (startPlane, infoPlane, exitPlane, game) => {
  startPlane.dispose();
  infoPlane.dispose();
  exitPlane.dispose();

  overallScoreBoardDisplay.updateText("Overall\nScore: 0");
  currentRollScoreBoardDisplay.updateText("Current\nScore: 0");
  overallScoreBoardDisplay.isVisible = true;
  currentRollScoreBoardDisplay.isVisible = true;
  const newGame = new StartNewGame(game.generalPins, game.players)
  // const newGame = new StartNewGame(game.generalPins, ['dhinesh', 'michael', 'monisha', 'arjun', 'karthik']);
  newGame.isGameStarted = true;
  game.updateToNewGame(newGame);
};

const handleExitGame = () => {
  var customWindow = window.open("", "_self", "");
  customWindow.close();
};

const handleInfo = (startPlane, infoPlane, exitPlane, scene, game) => {
  startPlane.dispose();
  infoPlane.dispose();
  exitPlane.dispose();
  infoGUI(scene, game);
};

export function startMenuGUI(scene, game) {
  let [startGameButton, startPlane] = createStartButton(scene);
  let [infoButton, infoPlane] = createInfoButton(scene);
  let [exitGameButton, exitPlane] = createExitButton(scene);

  startGameButton.onPointerUpObservable.add(function () {
    handleStartGame(startPlane, infoPlane, exitPlane, game);
  });

  exitGameButton.onPointerUpObservable.add(function () {
    handleExitGame();
  });

  infoButton.onPointerUpObservable.add(function () {
    handleInfo(startPlane, infoPlane, exitPlane, scene, game);
  });
  return { startGameButton, infoButton, exitGameButton };
}
