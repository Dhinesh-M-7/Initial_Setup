import { GUI3DManager } from "@babylonjs/gui/3D/gui3DManager";
import { TextBlock } from "@babylonjs/gui";
import { Button3D } from "@babylonjs/gui";
import * as BABYLON from "@babylonjs/core";

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
  return display;
}
