import { GUI3DManager } from "@babylonjs/gui/3D/gui3DManager";
import { TextBlock } from "@babylonjs/gui";
import { Button3D } from "@babylonjs/gui";
import * as BABYLON from "@babylonjs/core";

export function scoreBoardGUI(scene, positionCoordinates, visibility, value) {
  let anchor = new BABYLON.AbstractMesh("anchor", scene);
  let manager = new GUI3DManager(scene);
  let button = new Button3D("reset");

  manager.addControl(button);
  button.linkToTransformNode(anchor);
  button.position.x = positionCoordinates[0];
  button.position.y = positionCoordinates[1];
  button.position.z = positionCoordinates[2];
  button.scaling = new BABYLON.Vector3(32, 15, 30);
  button.isVisible = visibility;
  button.color = "navyblue";

  let textContent = new TextBlock();
  textContent.text = value;
  textContent.color = "#14f9fe";
  textContent.fontSize = 45;
  button.content = textContent;

  button.updateText = function (newValue) {
    textContent.text = newValue;
  };
  button.appendText = function(addValue) {
    textContent.text += addValue;
  }
  return button;
}
