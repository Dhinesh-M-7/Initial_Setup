import * as BABYLON from "@babylonjs/core";

export const createEnvironment = () => {


  const ground = BABYLON.MeshBuilder.CreateGround("ground", {
    width: 100,
    height: 200,
  });
  const groundMat = new BABYLON.StandardMaterial("ground-mat");
  groundMat.diffuseTexture = new BABYLON.Texture("Images/Neon-floor.jpg");
  ground.material = groundMat;


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

  //Wall right behind the pins(left as a black screen)
  const backWall1 = new BABYLON.MeshBuilder.CreatePlane("plane", {
    height: 15,
    width: 30,
  });
  backWall1.position.y = 7.5;
  backWall1.position.z = 100;
  const backWall1Mat = new BABYLON.StandardMaterial();
  backWall1Mat.diffuseColor = new BABYLON.Color4(0, 0, 0, 0);
  backWall1.material = backWall1Mat;

  //Wall where the texture has to be applied
  const backWall2 = new BABYLON.MeshBuilder.CreatePlane("plane", {
    height: 35,
    width: 100,
  });
  backWall2.position.y = 32.5;
  backWall2.position.z = 100;
  const backWall2Mat = new BABYLON.StandardMaterial();
  backWall2Mat.diffuseTexture = new BABYLON.Texture("Images/Backwall.jpg");
  backWall2.material = backWall2Mat;
  const backWall2Aggregate = new BABYLON.PhysicsAggregate(
    backWall2,
    BABYLON.PhysicsShapeType.BOX,
    {
      mass: 0,
      restitution: 0.25,
    }
  );

  //Walls on sides of backWall1(No texture needed only color)
  const backWall3 = new BABYLON.MeshBuilder.CreatePlane("plane", {
    height: 15,
    width: 35,
  });
  backWall3.position.x = -32.5;
  backWall3.position.y = 7.5;
  backWall3.position.z = 100;
  const backWall3Mat = new BABYLON.StandardMaterial();
  backWall3Mat.diffuseColor = new BABYLON.Color4(0, 0, 0, 0);
  backWall3.material = backWall3Mat;

  const backWall4 = new BABYLON.MeshBuilder.CreatePlane("plane", {
    height: 15,
    width: 35,
  });
  backWall4.position.x = 32.5;
  backWall4.position.y = 7.5;
  backWall4.position.z = 100;
  const backWall4Mat = new BABYLON.StandardMaterial();
  backWall4Mat.diffuseColor = new BABYLON.Color4(0, 0, 0, 0);
  backWall4.material = backWall4Mat;

  //Wall at the back of the camera
  const backWall5 = new BABYLON.MeshBuilder.CreatePlane("plane", {
    height: 50,
    width: 100,
  });
  backWall5.rotation.y = Math.PI;
  backWall5.position.y = 25;
  backWall5.position.z = -100;
  const backWall5Mat = new BABYLON.StandardMaterial();
  backWall5Mat.diffuseTexture = new BABYLON.Texture(
    "Images/Neon-backsidewall.jpg"
  );
  backWall5.material = backWall5Mat;


  //Adding invisible planes at the sides of bowling lane to prevent pins from leaving the lane.
  
  const laneProtector1 = new BABYLON.MeshBuilder.CreatePlane("laneProtector", {
    height: 50,
    width: 200
  });
  laneProtector1.position.x = -15;
  laneProtector1.position.y = 28;
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
    width: 200
  });
  laneProtector2.position.x = 15;
  laneProtector2.position.y = 28;
  laneProtector2.rotation.y = Math.PI / 2;
  laneProtector2.isVisible = false;

  const laneProtector22Agg = new BABYLON.PhysicsAggregate(
    laneProtector2,
    BABYLON.PhysicsShapeType.BOX,
    {
      mass: 0,
      restitution: 0.25,
    }
  );
};
