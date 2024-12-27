import Race from "../models/Race";
import Snail from "../models/Snail";

export function runRace(bet) {
  let snails = [new Snail("piros"), new Snail("zöld"), new Snail("kék")];
  let race = new Race(snails, 5, bet);
  return race.start();
}
