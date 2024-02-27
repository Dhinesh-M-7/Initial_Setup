import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";

const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas);

async function createScene() {
  const scene = new BABYLON.Scene(engine);

  const havokInstance = await HavokPhysics();
  const havokPlugin = new BABYLON.HavokPlugin(true, havokInstance);

  const camera = new BABYLON.UniversalCamera(
    "camera",
    new BABYLON.Vector3(0, 10, -90)
  );
  camera.setTarget(new BABYLON.Vector3(0, 0, 60));
  camera.attachControl(canvas, true);

  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 10, -10)
  );
  light.intensity = 0.7;
  light.lightmapMode = BABYLON.Light.FALLOFF_PHYSICAL;

  const bowlingBall = new BABYLON.MeshBuilder.CreateSphere("sphere", {
    diameter: 4,
  })
  bowlingBall.position.y = 3,
  bowlingBall.position.z = -68

  createEnvironment();
  createBowlingLane();
  //const groundAggregate = new BABYLON.PhysicsAggregate(ground, BABYLON.PhysicsShapeType.BOX, {mass: 0});

  const result = await BABYLON.SceneLoader.ImportMeshAsync(
    "",
    "Models/",
    "bowling_pin.glb"
  );
  const bowlingPin = result.meshes[1];
  bowlingPin.scaling = new BABYLON.Vector3(1.5, 1.5, 1.5)
  bowlingPin.isVisible = false

  const pinPositions = [
    new BABYLON.Vector3(-7, 0.5, 98),
    new BABYLON.Vector3(-2.5, 0.5, 98),
    new BABYLON.Vector3(2.5, 0.5, 98),
    new BABYLON.Vector3(7, 0.5, 98),

    new BABYLON.Vector3(0, 0.5, 94),
    new BABYLON.Vector3(-4, 0.5, 94),
    new BABYLON.Vector3(4, 0.5, 94),

    new BABYLON.Vector3(-2, 0.5, 90),
    new BABYLON.Vector3(2, 0.5, 90),

    new BABYLON.Vector3(0, 0.5, 86),
  ];

  const setPins = pinPositions.map(function (position, idx) {
    const pin = new BABYLON.InstancedMesh("pin-" + idx, bowlingPin);
    pin.position = position;
    return pin;
  });

  // Create a new instance of StartGame with generalPins -- need gui to be added
  const game = new StartGame(setPins, scene);
  return scene;
}

const createBowlingLane = () => {
  const lane = BABYLON.MeshBuilder.CreateBox("cube", {
    width: 30,
    height: 0.5,
    depth: 170,
  });
  lane.position.y = 0.25;
  lane.position.z = 15;

  const laneMat = new BABYLON.StandardMaterial("lane-material");
  laneMat.diffuseTexture = new BABYLON.Texture("Images/bowling_floor.jpg");
  lane.material = laneMat;

  const laneLeft = BABYLON.MeshBuilder.CreateBox("cube", {
    width: 1,
    height: 5,
    depth: 170,
  });
  laneLeft.position.x = -15.5;
  laneLeft.position.y = 0.25;
  laneLeft.position.z = 15;

  const laneRight = BABYLON.MeshBuilder.CreateBox("cube", {
    width: 1,
    height: 5,
    depth: 170,
  });
  laneRight.position.x = 15.5;
  laneRight.position.y = 0.25;
  laneRight.position.z = 15;
};

const createEnvironment = () => {
  const ground = BABYLON.MeshBuilder.CreateGround("ground", {
    width: 100,
    height: 200,
  });
  const groundMat = new BABYLON.StandardMaterial("ground-mat");
  groundMat.diffuseTexture = new BABYLON.Texture("Images/floor.jpg");
  ground.material = groundMat;

  const leftWall = new BABYLON.MeshBuilder.CreatePlane("plane", {
    height: 50,
    width: 200,
  });
  leftWall.position.x = -50;
  leftWall.position.y = 25;
  leftWall.rotation.y = -Math.PI / 2;
  const leftWallMat = new BABYLON.StandardMaterial("back-wall-material");
  leftWallMat.diffuseTexture = new BABYLON.Texture("Images/floor.jpg");
  leftWall.material = leftWallMat;

  const rightWall = new BABYLON.MeshBuilder.CreatePlane("plane", {
    height: 50,
    width: 200,
  });
  rightWall.position.x = 50;
  rightWall.position.y = 25;
  rightWall.rotation.y = Math.PI / 2;
  const rightWallMat = new BABYLON.StandardMaterial("back-wall-material");
  rightWallMat.diffuseTexture = new BABYLON.Texture("Images/floor.jpg");
  rightWall.material = rightWallMat;

  //Wall right behind the pins(left as a black screen)
  const backWall1 = new BABYLON.MeshBuilder.CreatePlane("plane", {
    height: 10,
    width: 30,
  });
  backWall1.position.y = 5;
  backWall1.position.z = 100;

  //Wall where the texture has to be applied
  const backWall2 = new BABYLON.MeshBuilder.CreatePlane("plane", {
    height: 40,
    width: 100,
  });
  backWall2.position.y = 30;
  backWall2.position.z = 100;

  //Walls on sides of backWall1(No texture needed only color)
  const backWall3 = new BABYLON.MeshBuilder.CreatePlane("plane", {
    height: 10,
    width: 40,
  });
  backWall3.position.x = -30;
  backWall3.position.y = 5;
  backWall3.position.z = 100;

  const backWall4 = new BABYLON.MeshBuilder.CreatePlane("plane", {
    height: 10,
    width: 40,
  });
  backWall4.position.x = 30;
  backWall4.position.y = 5;
  backWall4.position.z = 100;
};


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


class StartGame {
  constructor(generalPins, scene) {
    this.frames = [];
    this.currentFrameIndex = 0;
    this.currentRoll = 1;
    this.ballIsRolled = false;
    this.generalPins = generalPins;
    this.pinsArray = [];
    this.initializeFrames();
    this.initializePinsArray();
    this.setupEventListeners(scene);
  }

  // Function to initialize frames
  initializeFrames() {
    for (let i = 0; i < 10; i++) {
      this.frames.push({ rolls: [], score: 0, bonus: null });
    }
  }

  rollBall() {
    if (this.ballIsRolled) return;
    const pinsHit = Math.floor(Math.random() * 11); 
    for (let i = 0; i < pinsHit; i++) {
      const randomPinIndex = Math.floor(Math.random() * this.pinsArray.length);
      this.pinsArray[randomPinIndex].isHit = true;
    }

    // Update frame values based on pins hit
    this.updateFrameValues(pinsHit);
    this.ballIsRolled = true; // Set ballIsRolled flag to true
  }

  // Function to update frame values after each roll
  updateFrameValues(pinsHit) {
    const currentFrame = this.frames[this.currentFrameIndex]; // Get the current frame
    currentFrame.rolls.push(pinsHit); // Push the number of pins hit in this roll to the rolls array of the current frame

    // Update score
    currentFrame.score += pinsHit;

    // Check for spare or strike
    if (currentFrame.rolls.length === 1 && pinsHit === 10) {
      currentFrame.bonus = "strike";
    } else if (currentFrame.rolls.length === 2 && currentFrame.score === 10) {
      currentFrame.bonus = "spare";
    }

    // Move to the next frame if required
    if (currentFrame.rolls.length === 2 || currentFrame.bonus === "strike") {
      this.currentFrameIndex++;
      this.currentRoll = 1;

      // Reinitialize pinsArray after the end of every frame
      this.initializePinsArray();
    } else {
      this.currentRoll++;
    }
  }

  // Function to initialize pinsArray after the end of every frame
  initializePinsArray() {
    this.pinsArray = this.generalPins.map((pin, pinId) => {
      return {pinId: pinId, pinPosition: pin.position, isHit: false}
    });
  }

  // Function to setup event listeners
  setupEventListeners(scene) {
    // Simulate BabylonJS pointer listener for mouseup event (rolling the ball)
    scene.onPointerObservable.add((eventData) => {
      if (eventData.type === BABYLON.PointerEventTypes.POINTERDOWN){
        this.rollBall();
      };
    });
    console.log(this.frames, this.pinsArray);
  }
}