
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";

import { startMenuGUI } from "./startMenuGUI";
import { rollCollisionHandler } from "./Game_Logic/gameCollisionHandler";
import { StartNewGame } from "./Game_Logic/newGameDataStructure";
import { circleOfConfusionPixelShader } from "@babylonjs/core/Shaders/circleOfConfusion.fragment";

import { createEnvironment } from "./Environment";
import { createAnimations } from "./Animation";
import { createBowlingLane } from "./BowlingLane";
import { createAim } from "./Aim";
import { createBowlingBall, createBowlingPins } from "./BowlingBallAndPins";

const canvas = document.getElementById("renderCanvas");
export let engine = new BABYLON.Engine(canvas);
export let scene;

async function createScene() {

  const music = new BABYLON.Sound("Music", "./Audio/stranger_things.mp3", scene, null, {
    loop: true,
    autoplay: true,
  });


  const havokInstance = await HavokPhysics();
  const havokPlugin = new BABYLON.HavokPlugin(true, havokInstance);

  const camera = new BABYLON.UniversalCamera(
    "camera",
    new BABYLON.Vector3(0, 25, -100)
  );
  camera.setTarget(new BABYLON.Vector3(0, 0, 0));
  camera.attachControl(true);
  camera.inputs.clear();

  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 10, 0)
  );
  light.intensity = 1.2;
  light.lightmapMode = BABYLON.Light.FALLOFF_PHYSICAL;

  scene.enablePhysics(new BABYLON.Vector3(0, -9.8, 0), havokPlugin);

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

  const lane = createBowlingLane();

  let setPins = createBowlingPins(bowlingPinResult);

  let startingPoint;
  let currentMesh;

  const getLanePosition = () => {
    const pickinfo = scene.pick(scene.pointerX, scene.pointerY, (mesh) => { return mesh == lane; });
    if (pickinfo.hit) {
      return pickinfo.pickedPoint;
    }
    return null;
  }

  const pointerDown = (mesh) => {
    currentMesh = mesh;
    aim.isVisible = true;
    startingPoint = getLanePosition();
    if (startingPoint) { // we need to disconnect camera from canvas
      setTimeout(() => {
        camera.detachControl(canvas);
      }, 0);
    }
  }

  const pointerUp = () => {
    aim.isVisible = false;
    const bowlingBallPosition = bowling_ball.absolutePosition;
    if (startingPoint) {
      const ballSpeed = (-(bowlingBallPosition.z) - 6) * 10;
      if (bowlingBallPosition.z < -63)
        bowlingAggregate.body.applyImpulse(new BABYLON.Vector3(-(aim.rotation.y) * 550, 0, ballSpeed), bowling_ball.getAbsolutePosition());
        window.globalShootmusic.play();
      camera.attachControl(canvas, true);

      startingPoint = null;
      setTimeout(() => {
        setPins.forEach((pin, pinIndex) => {
          pin.dispose();
        });
        setPins = createBowlingPins(bowlingPinResult);
        bowlingAggregate.body.setLinearVelocity(new BABYLON.Vector3(0, 0, 0));
        bowlingAggregate.body.setAngularVelocity(new BABYLON.Vector3(0, 0, 0));
        bowling_ball.rotation = new BABYLON.Vector3(0, 0, 0);
        bowling_ball.position = new BABYLON.Vector3(0, 4, -62);
        // viewPositionSetPins(setPins);
      }, 3000);
      return;
    }
  }
  const viewPositionSetPins = (setPins) => {
    setPins.forEach((pin) => {
      console.log(pin.id, pin.position);
    })
  }
  const pointerMove = () => {
    if (!startingPoint) {
      return;
    }
    const current = getLanePosition();
    if (!current) {
      return;
    }

    let aimAngle = (current.x) * 0.1;

    if (aimAngle > 0.15)
      aimAngle = 0.15;
    else if (aimAngle < -0.15)
      aimAngle = -0.15;

    aim.rotation.y = aimAngle;

    const diff = current.subtract(startingPoint);
    diff.x = 0;

    // Define the limits for z movement
    const minZ = -67;  // Minimum z value
    const maxZ = -62;  // Maximum z value

    const newZ = currentMesh.position.z + diff.z;

    // Check if the new position exceeds the limits
    if (newZ < minZ) {
      diff.z = minZ - currentMesh.position.z;
    } else if (newZ > maxZ) {
      diff.z = maxZ - currentMesh.position.z;
    }

    currentMesh.position.addInPlace(diff);

    startingPoint = current;

  }

  scene.onPointerObservable.add((pointerInfo) => {
    switch (pointerInfo.type) {
      case BABYLON.PointerEventTypes.POINTERDOWN:
        if (pointerInfo.pickInfo.hit && pointerInfo.pickInfo.pickedMesh == bowling_ball) {
          pointerDown(pointerInfo.pickInfo.pickedMesh)
        }
        break;
      case BABYLON.PointerEventTypes.POINTERUP:
        pointerUp();
        break;
      case BABYLON.PointerEventTypes.POINTERMOVE:
        pointerMove();
        break;
    }
  });

  // // Create a new instance of StartGame with generalPins -- need gui to be added
  let game = new StartNewGame(setPins, scene);


  createAnimations(camera, scene, game);

  createMusic();


  return scene;
}

const createMusic = () => {
    window.globalShootmusic = new BABYLON.Sound("rollMusic", "./Audio/rollingball.mp3", null, {
    loop: false,
    autoplay: false,
    volume:100,
  });
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
