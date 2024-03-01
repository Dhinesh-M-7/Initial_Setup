export class StartNewGame {
    constructor(generalPins) {
        this.frames = [];
        this.currentFrameIndex = 0;
        this.ballIsRolled = false;
        this.generalPins = generalPins;
        this.pinsArray = [];
        this.totalScore = 0;
        this.initializeFrames();
    }
    initializeFrames() {
        this.totalScore = 0;
        this.currentFrameIndex = 0;
        for (let frameIndex = 0; frameIndex < 5; frameIndex++) {
            this.frames[frameIndex] = { downPins: [], score: 0, bonus: null };
        }
        this.initializePins();
    }
    initializePins(){
        this.pinsArray = this.generalPins.map((pin) => {
            return {pinId: pin.id, pinPosition: pin.position, isHit: false}
        });
    }
    updateToNewGame(newGame){
        Object.assign(this, newGame);
    }
    gameScoreCalculation(){
        const fallenPins = this.pinsArray.filter((pin) => pin.isHit === true);
        this.frames[this.currentFrameIndex].downPins = fallenPins;
        this.frames[this.currentFrameIndex].score = fallenPins.length;
        if(fallenPins.length === 10){
            this.frames[this.currentFrameIndex].bonus = 'strike';
        }
        this.currentFrameIndex++;
        return fallenPins.length;
    }
    totalScoreCalculation(){
        this.totalScore += this.frames[this.currentFrameIndex-1].score;
        return this.totalScore;
        // console.log(this.frames);
    }
  }