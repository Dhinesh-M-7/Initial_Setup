import * as BABYLON from "@babylonjs/core";

export const createEnvironment = () => {

  //creation of ground
  const ground = BABYLON.MeshBuilder.CreateGround("ground", {
    width: 100,
    height: 200,
  });
  const groundMat = new BABYLON.StandardMaterial("ground-mat");
  groundMat.diffuseTexture = new BABYLON.Texture("Images/Neon-floor.jpg");
  ground.material = groundMat;

  //creating the left side wall of the game room
  const leftWall = new BABYLON.MeshBuilder.CreatePlane("plane", {
    height: 50,
    width: 200,
  });
  leftWall.position.x = -50;
  leftWall.position.y = 25;
  leftWall.rotation.y = -Math.PI / 2;
  const leftWallMat = new BABYLON.StandardMaterial("back-wall-material");
  leftWallMat.diffuseTexture = new BABYLON.Texture("Images/Neon-sidewall.jpg");
  leftWall.material = leftWallMat;

  //creating the right side wall of the game room
  const rightWall = new BABYLON.MeshBuilder.CreatePlane("plane", {
    height: 50,
    width: 200,
  });
  rightWall.position.x = 50;
  rightWall.position.y = 25;
  rightWall.rotation.y = Math.PI / 2;
  const rightWallMat = new BABYLON.StandardMaterial("back-wall-material");
  rightWallMat.diffuseTexture = new BABYLON.Texture("Images/Neon-sidewall.jpg");
  rightWall.material = rightWallMat;

  //Place where the pins fall after getting hit by the bowling ball
  const pinDeck = new BABYLON.MeshBuilder.CreatePlane("pinDeck", {
    height: 15,
    width: 100,
  });
  pinDeck.position.y = 7.5;
  pinDeck.position.z = 100;
  const pinDeckMat = new BABYLON.StandardMaterial();
  pinDeckMat.diffuseColor = new BABYLON.Color4(0, 0, 0, 0);
  pinDeck.material = pinDeckMat;

  //Background wall where the game image is displayed
  const backgroundWall = new BABYLON.MeshBuilder.CreatePlane("plane", {
    height: 35,
    width: 100,
  });
  backgroundWall.position.y = 32.5;
  backgroundWall.position.z = 100;
  const backgroundWallMat = new BABYLON.StandardMaterial();
  backgroundWallMat.diffuseTexture = new BABYLON.Texture("Images/Backwall.jpg");
  backgroundWall.material = backgroundWallMat;
  const backgroundWallAggregate = new BABYLON.PhysicsAggregate(
    backgroundWall,
    BABYLON.PhysicsShapeType.BOX,
    {
      mass: 0,
      restitution: 0.25,
    }
  );


  //Wall behind the camera
  const cameraWall = new BABYLON.MeshBuilder.CreatePlane("plane", {
    height: 50,
    width: 100,
  });
  cameraWall.rotation.y = Math.PI;
  cameraWall.position.y = 25;
  cameraWall.position.z = -100;
  const cameraWallMat = new BABYLON.StandardMaterial();
  cameraWallMat.diffuseTexture = new BABYLON.Texture(
    "Images/Neon-backsidewall.jpg"
  );
  cameraWall.material = cameraWallMat;

  //adding a roof
  const roof = BABYLON.MeshBuilder.CreatePlane("roof", {
    width: 100,
    height: 200,
  });
  const roofMat = new BABYLON.StandardMaterial("roof-mat");
  roofMat.diffuseTexture = new BABYLON.Texture("Images/Neon-floor.jpg");
  roof.material = roofMat;
  roof.rotation.x = - Math.PI / 2;
  roof.position.y = 50

  //Adding invisible planes at the sides of bowling lane to prevent pins from leaving the lane.
  const laneProtector1 = new BABYLON.MeshBuilder.CreatePlane("laneProtector", {
    height: 50,
    width: 300
  });
  laneProtector1.position.x = -15;
  laneProtector1.position.y = 25;
  laneProtector1.rotation.y = -Math.PI / 2;
  laneProtector1.isVisible = false;

  const laneProtector1Agg = new BABYLON.PhysicsAggregate(
    laneProtector1,
    BABYLON.PhysicsShapeType.BOX,
    {
      mass: 0,
      restitution: 0.25,
    }
  );


  const laneProtector2
   = new BABYLON.MeshBuilder.CreatePlane("laneProtector", {
    height: 50,
    width: 300
  });
  laneProtector2.position.x = 15;
  laneProtector2.position.y = 25;
  laneProtector2.rotation.y = Math.PI / 2;
  laneProtector2.isVisible = false;

  const laneProtector2Agg = new BABYLON.PhysicsAggregate(
    laneProtector2,
    BABYLON.PhysicsShapeType.BOX,
    {
      mass: 0,
      restitution: 0.25,
    }
  );
};
