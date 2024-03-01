import * as BABYLON from "@babylonjs/core"

export const createAim = (scene) => {
    const projection = BABYLON.MeshBuilder.CreateBox("projection", {height: 0.1, width: 1, depth: 40});
    projection.position.z = 22;
    const pbrMaterial = new BABYLON.PBRMaterial("pbrMaterial", scene);
    pbrMaterial.albedoColor = new BABYLON.Color3(1, 1, 1); 
    // Set other PBR properties
    pbrMaterial.metallic = 0.5; // Low metallicness
    pbrMaterial.roughness = 0.3; // Low roughness
    pbrMaterial.alpha = 0.1;
  
    const arrow = BABYLON.MeshBuilder.CreateCylinder("sphere", {height: 0.1, diameter: 7, tessellation: 3}); //{height: 0.01, diameter: 0, diameterTop: 1, diameterBottom: 1, tessellation: 3}
    arrow.rotation.y = -Math.PI / 2;
    arrow.position.z = 44;
  
    arrow.material = pbrMaterial;
  
    const Aim = BABYLON.Mesh.MergeMeshes([arrow, projection]);
  
    Aim.position.y = 0.4;
    Aim.position = new BABYLON.Vector3(0,0,0);
    return Aim;
  }
