import * as BABYLON from "@babylonjs/core";
import { startMenuGUI } from "../Game_GUI/startMenuGUI";

//Defining frame number and values for camera movement and rotation
const movementFrames = [0, 1, 5, 6, 13, 14];
const movementValues = [
  new BABYLON.Vector3(0, 20, -120),
  new BABYLON.Vector3(0, 10, -100),
  new BABYLON.Vector3(0, 10, 60),
  new BABYLON.Vector3(0, 30, 50),
  new BABYLON.Vector3(0, 30, -100),
  new BABYLON.Vector3(0, 25, -100),
];

const rotationFrames = [0, 5, 9, 13];
const rotationValues = [0, 0, Math.PI, 2 * Math.PI];

//creating a camera animation with the data above
export const createAnimations = (camera, scene, game) => {
  const frameRate = 30;

  const movement = new BABYLON.Animation(
    "movement",
    "position",
    frameRate,
    BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT,
    true
  );
  const movement_keys = [];

  for (let frameId = 0; frameId < movementFrames.length; frameId++) {
    movement_keys.push({
      frame: movementFrames[frameId] * frameRate, // Multiply frame by frameRate
      value: movementValues[frameId],
    });
  }

  movement.setKeys(movement_keys);

  const rotation = new BABYLON.Animation(
    "rotate",
    "rotation.y",
    frameRate,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT,
    true
  );
  const rotate_keys = [];

  for (let frameId = 0; frameId < rotationFrames.length; frameId++) {
    rotate_keys.push({
      frame: rotationFrames[frameId] * frameRate, // Multiply frame by frameRate
      value: rotationValues[frameId],
    });
  }

  rotation.setKeys(rotate_keys);

  //Starting the animation on the scene
  scene.beginDirectAnimation(
    camera,
    [movement, rotation],
    0,
    14 * frameRate,
    false,
    1,
    () => {
      startMenuGUI(scene, game);
    }
  );
};
