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

  getSim() {
    return this.sim;
  }

  getStats() {
    return this.stats;
  }

  updateSim(sim) {
    this.sim = sim;
  }

  updateStats(stats) {
    this.stats = stats;
  }
};

const observableStore = new Dispatcher();
export default observableStore;
