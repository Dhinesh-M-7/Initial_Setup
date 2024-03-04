import * as BABYLON from "@babylonjs/core"

export const createLights = () => {
    const light = new BABYLON.HemisphericLight(
        "light",
        new BABYLON.Vector3(0, 10, 0)
      );
      light.intensity = 1.2;
    
      const roofLight = new BABYLON.PointLight(
        "roofLight",
        new BABYLON.Vector3(0, 25, 80)
      );
      roofLight.intensity = 0.4;
}
//Adding scene music
export const createGameMusic = (scene) => {
    const music = new BABYLON.Sound(
        "Music",
        "./Audio/stranger_things.mp3",
        scene,
        null,
        {
          loop: true,
          autoplay: true,
        }
      );
}
//Adding roll and hit music
export const createRollSound = () => {
    window.globalShootmusic = new BABYLON.Sound(
      "rollMusic",
      "./Audio/rollingball.mp3",
      null,
      {
        loop: false,
        autoplay: false,
      }
    );
    window.globalHitMusic = new BABYLON.Sound(
      "hitMusic",
      "./Audio/hit.mp3",
      null,
      {
        loop: false,
        autoplay: false,
      }
    );
  };
