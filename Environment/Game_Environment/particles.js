import * as BABYLON  from "@babylonjs/core"

export const particles = (position) => {
  const particleSystem = new BABYLON.ParticleSystem("particles", 2000);

  particleSystem.particleTexture = new BABYLON.Texture("Images/flare.png");

  particleSystem.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
  particleSystem.color2 = new BABYLON.Color4(0.9, 0.1, .1, 1.0);
  particleSystem.colorDead = new BABYLON.Color4(0.412, 0.529, 0, 1);
  particleSystem.minSize = 0.05;
  particleSystem.maxSize = 0.8;
  particleSystem.minLifeTime = 0.3;
  particleSystem.maxLifeTime = 1.5;
  particleSystem.emitRate = 5000;
  particleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);
  particleSystem.direction1 = new BABYLON.Vector3(-10, 8, 30);
  particleSystem.direction2 = new BABYLON.Vector3(10, -8, -3);
  particleSystem.minAngularSpeed = 0;
  particleSystem.maxAngularSpeed = Math.PI;
  particleSystem.minEmitPower = 1;
  particleSystem.maxEmitPower = 3;
  particleSystem.updateSpeed = 0.005;
  particleSystem.emitter = position;

  particleSystem.start();

  particleSystem.targetStopDuration = 0.6;

  return particleSystem;
}