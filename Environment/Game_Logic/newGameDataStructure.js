/* export class StartNewGame {
    constructor(generalPins) {
        this.frames = [];
        this.currentFrameIndex = 0;
        this.ballIsRolled = false;
        this.generalPins = generalPins;
        this.pinsArray = [];
        this.totalScore = 0;
        this.isGameStarted = false;
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
    }
  } */

  export class StartNewGame {
    constructor(generalPins, players) {
        this.generalPins = generalPins;
        this.isGameStarted = false;
        this.ballIsRolled = false;

        this.entireFrames = [];
        this.pinsArray = [];
        this.currentFrameIndex = 0;
        this.totalAttempts = 5;

        this.players = players;
        this.totalScores = new Array(players.length).fill(0);
        this.currentPlayerIndex = 0;
        this.initializeFrames();
    }

    initializeFrames() {
        this.currentFrameIndex = 0;
        for(let player = 1; player <= this.players.length; player++){
            const frame = new Array(this.totalAttempts).fill().map(() => ({
                downPins: [],
                score: 0,
                bonus: null
            }));
            this.entireFrames.push(frame);
        }
        this.initializePins();
    }

    initializePins() {
        this.pinsArray = this.generalPins.map((pin) => ({
            pinId: pin.id,
            pinPosition: pin.position,
            isHit: false
        }));
    }

    updateToNewGame(newGame) {
        Object.assign(this, newGame);
    }

    switchPlayer() {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        if (this.currentPlayerIndex === 0) {
            this.currentFrameIndex++;
        }
    }

    gameScoreCalculation() {
        const fallenPins = this.pinsArray.filter((pin) => pin.isHit === true);
        this.entireFrames[this.currentPlayerIndex][this.currentFrameIndex].downPins = fallenPins;
        this.entireFrames[this.currentPlayerIndex][this.currentFrameIndex].score = fallenPins.length;
        if (fallenPins.length === 10) {
            this.entireFrames[this.currentPlayerIndex][this.currentFrameIndex].bonus = 'strike';
        }
        this.totalScores[this.currentPlayerIndex] += fallenPins.length;
        return fallenPins.length;
    }

    totalScoreCalculation() {
        return this.totalScores[this.currentPlayerIndex];
    }
}