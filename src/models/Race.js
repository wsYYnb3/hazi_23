export default class Race {
    constructor(snails, laps, bet) {
      this.snails = snails;
      this.laps = laps;
      this.bet = bet;
      this.events = []; 
    }
  
    start() {
      for (let i = 0; i < this.laps; i++) {
        const boosterIndex =
          Math.random() < 0.2
            ? Math.floor(Math.random() * this.snails.length)
            : -1;
  
        this.snails.forEach((s, idx) => s.move(idx === boosterIndex));
  
        this.events.push({
          lap: i + 1,
          boosters: boosterIndex >= 0 ? this.snails[boosterIndex].color : null,
          positions: [...this.snails].sort((a, b) => b.distance - a.distance),
        });
      }
  
      const winner = this.snails.reduce((a, b) =>
        b.distance > a.distance ? b : a
      );
  
      return {
        message:
          winner.color === this.bet
            ? `A nyertes a(z) ${winner.color} csiga. Nyertél!`
            : `A nyertes a(z) ${winner.color} csiga. Vesztettél!`,
        events: this.events,
        standings: [...this.snails].sort((a, b) => b.distance - a.distance),
      };
    }
  }
  