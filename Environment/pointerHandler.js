
const pointerDown = (mesh) => {
    currentMesh = mesh;
    aim.isVisible = true;
    startingPoint = getLanePosition();
    if (startingPoint) {
      setTimeout(() => {
        camera.detachControl(canvas);
      }, 0);
    }
  };