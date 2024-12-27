export default class Snail {
  constructor(color) {
    this.color = color;
    this.distance = 0;
    this.boosterCount = 0;
  }
  move(booster) {
    let step = Math.floor(Math.random() * 4);
    if (booster) {
      step *= 2;
      this.boosterCount++;
    }
    this.distance += step;
  }
}
