import React, { useState, useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";

import { SimulatorContext } from "src/store/dispatcher";
import { LocaleContext } from "src/locale/dispatcher";

import { Input, SpinButton, Text } from "@fluentui/react-components";
import { Alert } from "@fluentui/react-components/unstable";

import { PanZoom } from "react-easy-panzoom";

import { execute, lastStep } from "../../utility/execute";
import { strToObj, mergeDeep } from "../../utility/objects";

import * as Styles from "./sim.styles";

const Sim = observer(() => {
  const Sim = useContext(SimulatorContext);
  const Locale = useContext(LocaleContext);

  const [msg, setMsg] = useState("");
  const [intervalId, setIntervalId] = useState(undefined);
  const [styles, setStyles] = useState({ ...Styles });

  const sim = Sim.getSim();
  const status = Sim.getSimStatus();
  const editor = Sim.getEditor();
  const interval = Sim.getInterval();

  // highlight requested element by creating a new focus style object
  // with the requested property cascade and merging it into the default
  // Styles object
  const updateStyles = () => {
    const newStyles = strToObj(sim.focus.el, Styles.focus);
    setStyles(mergeDeep({}, Styles, newStyles));
  };

  useEffect(() => {
    if (interval === 0) return;
    updateStyles();
  }, [sim.focus.el]);

  const runSimulator = () => {
    let sim = { ...Sim.getSim() };
    
    sim.step++;
    if (sim.step > lastStep) {
      sim.step = 1;
      sim.codeLine++;

      if (status === 3) {
        Sim.updateSim(sim);
        Sim.loseFocus();
        Sim.setSimStatus(0);
        return;
      }
    }
    
    if (!sim.codeLine || sim.codeLine < 0) {
      sim.codeLine = 0;
    }

    // stop if RAM out of bounds
    if (editor.state.doc.lines < sim.codeLine + 1) {
      Sim.setSimStatus(0);
      return;
    }
    
    const result = execute({
      sim,
      stats: {...Sim.getStats()},
      status,
      line: editor.state.doc.text[sim.codeLine],
      editor: editor.state
    });

    Sim.updateSim(result.sim);
    Sim.updateStats(result.stats);
    Sim.setSimStatus(result.status);
  };

  useEffect(() => {
    if (!editor?.state) {
      return;
    }

    switch (status) {
      case 0: { // stop
        Sim.loseFocus();
        clearInterval(intervalId);
        break;
      }
      case 4: { // pause
        clearInterval(intervalId);
        break;
      }
      case 2: { // single step
        runSimulator();
        Sim.setSimStatus(4);
        break;
      }
      case 1: // play
      case 3: { // single iteration
        if (interval === 0) {
          while (Sim.getSimStatus()) {
            runSimulator();
          }
        }
        else {
          setIntervalId(setInterval(runSimulator, interval));
          return () => clearInterval(intervalId);
        }
      }
    }
  }, [status]);

  if (interval === 0 && [1,2,3].includes(status)) {
    return null;
  }
  
  return (
    <>
      { msg ? (
        <Alert style={ styles.infoMsg }>
          { msg }
        </Alert>
      ) : null }
      <PanZoom
        id="simulator"
        zoomSpeed={ 0.5 }
        minZoom={ 0.5 }
        maxZoom={ 1.5 }
        style={ styles.container }
      >
        <svg style={ styles.dataBus }>
          <rect x="0" y="0" width="2" height="480"></rect>
          <rect x="0" y="0" width="580" height="2"></rect>
          <rect x="580" y="0" width="2" height="20"></rect>
          <rect x="0" y="480" width="256" height="2"></rect>
          <rect x="256" y="352" width="2" height="130"></rect>
          <rect x="160" y="0" width="2" height="11%"></rect>
          <rect x="350" y="0" width="2" height="48%"></rect>
          <rect x="0" y="170" width="150" height="2"></rect>
          <rect x="150" y="170" width="2" height="40"></rect>
          <rect x="65" y="70" width="2" height="240"></rect>
          <rect x="65" y="310" width="150" height="2"></rect>
        </svg>
        <svg style={{ ...styles.addressBus, top: 90, left: 220 }}>
          <rect x="0" y="0" width="2" height="60"></rect>
          <rect x="0" y="60" width="377" height="2"></rect>
          <rect x="377" y="0" width="2" height="150"></rect>
        </svg>
        <div style={ styles.pc.container }>
          <svg style={ styles.addressBus }>
            <rect x="30" y="40" width="2" height="115"></rect>
            <rect x="102" y="40" width="2" height="115"></rect>
          </svg>
          <SpinButton
            id="pcIncrement"
            min={ 1 }
            style={ styles.pc.increment }
            value={ sim.pc.step.toString() }
            onChange={ (ev, val) => Sim.setPcIncrement(+val) }
          />
          <Text
            style={ styles.pc.label }
            onMouseEnter={ () => setMsg(Locale.get("PC")) }
            onMouseLeave={ () => setMsg("") }
          >
            PC
          </Text>
          <SpinButton
            id="pc"
            min={ 0 }
            step={ sim.pc.step }
            style={ styles.pc.input }
            value={ sim.pc.val.toString() }
            onChange={ (ev, val) => { Sim.setProgramCounter(+val) } }
          />
        </div>
        <div style={ styles.alu.container }>
          <svg style={ styles.alu.svg }>
            <polygon
              points="0 35, 120 35, 170 90, 220 35, 340 35, 240 180, 100 180"
            >
            </polygon>
          </svg>
          <Text
            style={ styles.alu.label }
            onMouseEnter={ () => setMsg(Locale.get("ALU")) }
            onMouseLeave={ () => setMsg("") }
          >
            ALU
          </Text>
          <Input
            id="aluE1"
            style={ styles.alu.p1 }
            value={ sim.alu.e1.toString() }
            readOnly
          />
          <Input
            id="aluE2"
            style={ styles.alu.p2 }
            value={ sim.alu.e2.toString() }
            readOnly
          />
          <Input
            id="aluOp"
            style={ styles.alu.op }
            value={ sim.alu.op }
            readOnly
          />
        </div>
        <div style={ styles.acc.container }>
          <svg style={ styles.dataBus }>
            <rect x="120" y="0" width="160" height="2"></rect>
            <rect x="280" y="0" width="2" height="160"></rect>
            <rect x="120" y="160" width="162" height="2"></rect>
          </svg>
          <Text
            id="accLabel"
            style={ styles.acc.label }
            onMouseEnter={ () => setMsg(Locale.get("ACC")) }
            onMouseLeave={ () => setMsg("") }
          >
            ACC
          </Text>
          <Input
            id="acc"
            style={ styles.acc.field }
            value={ sim.acc.toString() }
            readOnly
          />
        </div>
        <div style={ styles.ir.container }>
          <Text
            id="irLabel"
            style={ styles.ir.label }
            onMouseEnter={ () => setMsg(Locale.get("IR")) }
            onMouseLeave={ () => setMsg("") }
          >
            IR
          </Text>
          <Input
            id="ir"
            style={ styles.ir.input }
            value={ sim.ir.cmd + " " + sim.ir.loc }
            readOnly
          />
          <Input
            id="irDecoder"
            style={ styles.ir.decoder }
            defaultValue={ Locale.get("DECODER") }
            readOnly
          />
        </div>
        <Text
          style={ styles.labels.bus }
          onMouseEnter={ () => setMsg(Locale.get("DATA_BUS")) }
          onMouseLeave={ () => setMsg("") }
        >
          Data bus
        </Text>
        <Text
          style={ styles.labels.addressesBus }
          onMouseEnter={ () => setMsg(Locale.get("ADDRESSES_BUS")) }
          onMouseLeave={ () => setMsg("") }
        >
          Add. bus
        </Text>
        
        <div
          style={ styles.ram.container }
          onMouseEnter={ () => setMsg(Locale.get("RAM")) }
          onMouseLeave={ () => setMsg("") }
        >
          <svg style={ styles.ram.svg }>
            <rect width="50" height="100" />
          </svg>
          <Text style={ styles.ram.text }>
            RAM
          </Text>
        </div>
      </PanZoom>
    </>
  );
});

export default Sim;
