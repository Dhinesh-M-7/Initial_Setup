import { GUI3DManager } from "@babylonjs/gui/3D/gui3DManager";
import { TextBlock } from "@babylonjs/gui";
import { Button3D } from "@babylonjs/gui";

import * as BABYLON from "@babylonjs/core";

export function scoreBoardGUI(scene, x, y, z, visibility) {
  let anchor = new BABYLON.AbstractMesh("anchor", scene);
  let manager = new GUI3DManager(scene);
  let button = new Button3D("reset");

  manager.addControl(button);
  button.linkToTransformNode(anchor);
  button.position.x = x;
  button.position.y = y;
  button.position.z = z;
  button.scaling = new BABYLON.Vector3(30, 30, 30);
  let text1 = new TextBlock();
  text1.text = "reset";
  text1.color = "red";
  text1.fontSize = 24;
  button.content = text1;
  button.isVisible = visibility;
  return button;
}
