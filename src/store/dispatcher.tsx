import { createContext } from "react";
import { configure, makeAutoObservable } from "mobx";

import status from "./status.store";
import sim from "./sim.store";
import stats from "./stats.store";

configure({
  enforceActions: "never",
});

export class SimulatorStore {
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
    return this.sim.title;
  }

  setTitle(newTitle: string) {
    this.sim.title = newTitle;
  }

  getSimStatus() {
    return this.status.simStatus;
  }

  setSimStatus(newStatus: number) {
    this.status.simStatus = newStatus;
  }

  loseFocus() {
    this.sim.focus = {
      el: "",
      cell: -1,
      var: -1
    };
  }

  getEditor() {
    return this.status.editor;
  }

  setEditor(newEditor: any) {
    this.status.editor = newEditor;
  }

  getError() {
    return this.status.error;
  }

  setError(newErrorMessage: string) {
    this.status.error = newErrorMessage;
  }

  dismissError() {
    this.status.error = undefined;
  }

  getOpenDate() {
    return this.sim.created;
  }

  setOpenDate(newDate: string) {
    this.sim.created = newDate;
  }

  getSim() {
    return this.sim;
  }

  getVariables() {
    return this.sim.variables;
  }

  getVariable(key: string) {
    return this.sim.variables[key];
  }

  setVariable(key: string, value: number) {
    this.sim.variables[key] = value;
  }

  getStats() {
    return this.stats;
  }

  clearStats() {
    Object.keys(this.stats).forEach(key => {
      this.stats[key] = 0;
    });
  }

  getInterval() {
    return this.status.interval;
  }

  setInterval(newInterval: number) {
    this.status.interval = newInterval;
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

  fireError(count: number) {
    this.status.hasErrors = count;
  }

  clearErrors() {
    this.status.hasErrors = 0;
  }

  getCode() {
    return this.status.code;
  }

  setCode(code: string) {
    this.status.code = code;
  }

  setProgramCounter(pc: string|number) {
    this.sim.pc.val = +pc;
  }

  setPcIncrement(step: string|number) {
    this.sim.pc.step = +step;
  }
};

export const SimulatorContext = createContext<SimulatorStore>(null);
