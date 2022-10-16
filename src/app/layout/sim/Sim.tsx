import React, { useState, useEffect, useContext, useRef } from "react";
import { observer } from "mobx-react-lite";

import { SimulatorContext } from "src/store/dispatcher";
import { LocaleContext } from "src/locale/dispatcher";

import { Input, SpinButton, Text, Tooltip } from "@fluentui/react-components";

import { PanZoom } from "react-easy-panzoom";

import { execute, lastStep } from "../../utility/execute";
import { strToObj, mergeDeep } from "../../utility/objects";

import { preventPan } from "./preventPan";
import * as DataBus from "./DataBus";
import * as AddressesBus from "./AddressesBus";

import * as Styles from "./sim.styles";

export default observer(() => {
  const Sim = useContext(SimulatorContext);
  const Locale = useContext(LocaleContext);

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

  const decoderInputRef = useRef(null);
  const pcInputRef = useRef(null);
  const pcIncrementInputRef = useRef(null);
  const refsWithoutPan = [decoderInputRef, pcInputRef, pcIncrementInputRef];

  if (interval === 0 && [1,2,3].includes(status)) {
    return null;
  }  

  return (
    <>
      <PanZoom
        zoomSpeed={ 0.5 }
        minZoom={ 0.5 }
        maxZoom={ 1.5 }
        preventPan={ (e, x, y) => preventPan(e, x, y, refsWithoutPan) }
        style={ styles.container }
      >
        <DataBus.main />
        <AddressesBus.main />
        <div style={ styles.pc.container }>
          <AddressesBus.pc />
          <SpinButton
            ref={ pcIncrementInputRef }
            min={ 1 }
            style={ styles.pc.increment }
            value={ sim.pc.step.toString() }
            onChange={ (ev, val) => Sim.setPcIncrement(+val.value) }
          />
          <Tooltip
            content={ Locale.get("PC") }
            relationship="label"
            withArrow
          >
            <Text style={ styles.pc.label }>
              PC
            </Text>
          </Tooltip>
          <SpinButton
            ref={ pcInputRef }
            min={ 0 }
            step={ sim.pc.step }
            style={ styles.pc.input }
            value={ sim.pc.val.toString() }
            onChange={ (ev, val) => { Sim.setProgramCounter(+val.value) } }
          />
        </div>
        <div style={ styles.alu.container }>
          <svg style={ styles.alu.svg }>
            <polygon
              points="0 35, 120 35, 170 90, 220 35, 340 35, 240 180, 100 180"
            >
            </polygon>
          </svg>
          <Tooltip
            content={ Locale.get("ALU") }
            relationship="label"
            withArrow
          >
            <Text style={ styles.alu.label }>
              ALU
            </Text>
          </Tooltip>
          <Input
            style={ styles.alu.p1 }
            value={ sim.alu.e1.toString() }
            readOnly
          />
          <Input
            style={ styles.alu.p2 }
            value={ sim.alu.e2.toString() }
            readOnly
          />
          <Input
            style={ styles.alu.op }
            value={ sim.alu.op }
            readOnly
          />
        </div>
        <div style={ styles.acc.container }>
          <DataBus.acc />
          <Tooltip
            content={ Locale.get("ACC") }
            relationship="label"
            withArrow
          >
            <Text style={ styles.acc.label }>
              ACC
            </Text>
          </Tooltip>
          <Input
            style={ styles.acc.field }
            value={ sim.acc.toString() }
            readOnly
          />
        </div>
        <div style={ styles.ir.container }>
          <Tooltip
            content={ Locale.get("IR") }
            relationship="label"
            withArrow
          >
            <Text style={ styles.ir.label }>
              IR
            </Text>
          </Tooltip>
          <Input
            style={ styles.ir.input }
            value={ sim.ir.cmd + " " + sim.ir.loc }
            readOnly
          />
          <Input
            ref={ decoderInputRef }
            style={ styles.ir.decoder }
            defaultValue={ Locale.get("DECODER") }
            readOnly
          />
        </div>
        <Tooltip
          content={ Locale.get("DATA_BUS") }
          relationship="label"
          withArrow
        >
          <Text style={ styles.labels.bus }>
            Data bus
          </Text>
        </Tooltip>
        <Tooltip
          content={ Locale.get("ADDRESSES_BUS") }
          relationship="label"
          withArrow
        >
          <Text style={ styles.labels.addressesBus }>
            Add. bus
          </Text>
        </Tooltip>
        
        <Tooltip
          content={ Locale.get("RAM") }
          relationship="label"
          positioning="before"
          withArrow
        >
          <div style={ styles.ram.container }>
            <svg style={ styles.ram.svg }>
              <rect width="50" height="100" />
            </svg>
            <Text style={ styles.ram.text }>
              RAM
            </Text>
          </div>
        </Tooltip>
      </PanZoom>
    </>
  );
});