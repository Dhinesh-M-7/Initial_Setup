import { GUI3DManager } from "@babylonjs/gui/3D/gui3DManager";
import { TextBlock } from "@babylonjs/gui";
import { Button3D } from "@babylonjs/gui";
import * as BABYLON from "@babylonjs/core";
import { particles } from "../Game_Environment/particles";
import {
  currentRollScoreBoardDisplay,
  overallScoreBoardDisplay,
} from "./renderScoreBoard";
//updates the current roll and overall score after every roll for each player
export const updateGameScores = (game) => {
  const currentRollScore = game.gameScoreCalculation();
  const overallScore = game.totalScoreCalculation();
  currentRollScoreBoardDisplay.updateText(
    "Attempt - " + (game.currentFrameIndex + 1).toString()
  );
  //checks whether the player has hit all the pins -- if so '!!!Strike!!!' is displayed
  if (
    game.entireFrames[game.currentPlayerIndex][game.currentFrameIndex].bonus ===
    "strike"
  ) {
    particles(new BABYLON.Vector3(13, 18, -30));
    particles(new BABYLON.Vector3(-13, 18, -30));
    currentRollScoreBoardDisplay.appendText("\n!!!Strike!!!");
  }
  currentRollScoreBoardDisplay.appendText(
    "\nCurrent: " + currentRollScore.toString()
  );
  overallScoreBoardDisplay.updateText(
    game.players[game.currentPlayerIndex] +
      "\nOverall: " +
      overallScore.toString()
  );
};

export function scoreBoardGUI(scene, positionCoordinates, visibility, value) {
  let anchor = new BABYLON.AbstractMesh("anchor", scene);
  let manager = new GUI3DManager(scene);
  let display = new Button3D("reset");

  manager.addControl(display);
  display.linkToTransformNode(anchor);
  display.position.x = positionCoordinates[0];
  display.position.y = positionCoordinates[1];
  display.position.z = positionCoordinates[2];
  display.scaling = new BABYLON.Vector3(32, 15, 30);
  display.isVisible = visibility;
  display.color = "navyblue";

  let textContent = new TextBlock();
  textContent.text = value;
  textContent.color = "#14f9fe";
  textContent.fontSize = 45;
  display.content = textContent;

  //Helps to update the value of Display Dynamically
  display.updateText = function (newValue) {
    textContent.text = newValue;
  };
  //Helps to append the value with the existing Display value
  display.appendText = function (addValue) {
    textContent.text += addValue;
  };
  return display;
}
