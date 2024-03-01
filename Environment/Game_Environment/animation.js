import * as BABYLON from "@babylonjs/core";
import { startMenuGUI } from "../startMenuGUI";

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

  movement_keys.push({
    frame: 0,
    value: new BABYLON.Vector3(0, 20, -120),
  });

  movement_keys.push({
    frame: 1 * frameRate,
    value: new BABYLON.Vector3(0, 10, -100),
  });

  movement_keys.push({
    frame: 5 * frameRate,
    value: new BABYLON.Vector3(0, 10, 60),
  });

  movement_keys.push({
    frame: 6 * frameRate,
    value: new BABYLON.Vector3(0, 30, 50),
  });

  movement_keys.push({
    frame: 13 * frameRate,
    value: new BABYLON.Vector3(0, 30, -100),
  });

  movement_keys.push({
    frame: 14 * frameRate,
    value: new BABYLON.Vector3(0, 25, -100),
  });

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

  rotate_keys.push({
    frame: 0,
    value: 0,
  });
  rotate_keys.push({
    frame: 5 * frameRate,
    value: 0,
  });
  rotate_keys.push({
    frame: 9 * frameRate,
    value: Math.PI,
  });
  rotate_keys.push({
    frame: 13 * frameRate,
    value: 2 * Math.PI,
  });
  rotation.setKeys(rotate_keys);
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
