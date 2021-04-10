import { makeAutoObservable } from "mobx";

import status from "./status.store";
import sim from "./sim.store";
import stats from "./stats.store";

class Dispatcher {
  status
  sim
  stats

  constructor() {
    this.status = status;
    this.sim = sim;
    this.stats = stats;
    makeAutoObservable(this);
  }

  getDarkMode() {
    return this.status.darkMode;
  }

  toggleDarkMode() {
    this.status.darkMode = !this.status.darkMode;
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

  hasErrors() {
    return this.status.hasErrors;
  }

  fireError(count) {
    this.status.hasErrors = count;
  }

  clearErrors() {
    this.status.hasErrors = 0;
  }
};

const observableStore = new Dispatcher();
export default observableStore;
