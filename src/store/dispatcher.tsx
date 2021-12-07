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

  getTitle() {
    return this.status.title;
  }

  setTitle(newTitle) {
    this.status.title = newTitle;
  }

  getError() {
    return this.status.error;
  }

  setError(newErrorMessage) {
    this.status.error = newErrorMessage;
  }

  dismissError() {
    this.status.error = undefined;
  }

  getOpenDate() {
    return this.status.openDate;
  }

  setOpenDate(newDate) {
    this.status.openDate = newDate;
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

  getCode() {
    return this.status.code;
  }

  setCode(code) {
    this.status.code = code;
  }
};

const observableStore = new Dispatcher();
export default observableStore;
