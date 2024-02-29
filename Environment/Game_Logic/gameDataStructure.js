export class StartNewGame {
    constructor(generalPins) {
        this.frames = [];
        this.currentFrameIndex = 0;
        this.ballIsRolled = false;
        this.generalPins = generalPins;
        this.pinsArray = [];
        this.initializeFrames();
        this.initializePins();
    }
    initializeFrames() {
        for (let i = 0; i < 10; i++) {
        this.frames.push({ downPins: [], score: 0, bonus: null });
        }
    }
    initializePins(){
        this.pinsArray = this.generalPins.map((pin, pinId) => {
            console.log(pin.id);
            return {pinId: pin.id, pinPosition: pin.position, isHit: false}
        });
    }
  }