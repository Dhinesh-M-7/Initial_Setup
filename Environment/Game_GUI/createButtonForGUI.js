import { Button } from "@babylonjs/gui";
import * as BABYLON from "@babylonjs/core";

export function createOwnPlane(scene, height, width, positionCoordinates) {
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

export function createButton(buttonName, color) {
  let button = Button.CreateSimpleButton("but1", buttonName);
  button.width = 5;
  button.height = 2;
  button.fontSize = 80;
  button.color = "white";
  button.background = color;
  return button;
}
