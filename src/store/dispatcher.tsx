import { makeAutoObservable } from "mobx";

import sim from "./sim.store";
import stats from "./stats.store";

class Dispatcher {
  sim
  stats

  constructor() {
    this.sim = sim;
    this.stats = stats;
    makeAutoObservable(this);
  }
};

const observableStore = new Dispatcher();
export default observableStore;
