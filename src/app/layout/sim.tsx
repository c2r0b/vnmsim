import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";

import { TextField, Text } from "@fluentui/react";
import { PanZoom } from "react-easy-panzoom";

import * as Styles from "./sim.styles";
import execute from "../utility/execute";

interface Props {
  status: number;
  editor: any;
};

const lastStep = 8;

const Sim = observer((props:Props) => {
  const [intervalId, setIntervalId] = useState({});
  const [styles, setStyles] = useState({ ...Styles });

  const sim = props.store.getSim();
  const status = props.store.getSimStatus();
  const editor = props.store.getEditor();
  const interval = props.store.getInterval();

  useEffect(() => {
    if (interval === 0) {
      return;
    }

    const path = sim.focus.el.split(".");
    let currentElementStyles = path.reduce((value, index) => {
      return value[index];
    }, Styles);
  
    if (sim.focus.el && currentElementStyles?.field) {
      currentElementStyles.field.backgroundColor = "#f9c55b";
    }
    setStyles({ ...Styles, currentElementStyles });
  }, [sim.focus.el]);

  const runSimulator = () => {
    let sim = { ...props.store.getSim() };
    sim.step++;
    if (sim.step > lastStep) {
      sim.step = 1;
      sim.codeLine++;

      if (status === 3) {
        clearInterval(intervalId);
        props.store.setSimStatus(0);
        return;
      }
    }
    
    const result = execute({
      sim,
      stats: {...props.store.getStats()},
      status,
      line: editor?.getLine(sim.codeLine),
      editor
    });

    props.store.updateSim(result.sim);
    props.store.updateStats(result.stats);
    props.store.setSimStatus(result.status);
  };

  useEffect(() => {
    if (!editor.getLine) {
      return;
    }

    switch (status) {
      case 0: // stop
      case 4: // pause
        clearInterval(intervalId);
        break;
      case 2: // single step
        runSimulator();
        props.store.setSimStatus(0);
        break;
      case 1: // play
      case 3: // single iteration
        if (interval === 0) {
          while (props.store.getSimStatus()) {
            runSimulator();
          }
        }
        else {
          setIntervalId(setInterval(runSimulator, interval));
          return () => clearInterval(intervalId);
        }
    }
  }, [status]);

  if (interval === 0 && [1,2,3].includes(status)) {
    return null;
  }
  
  return (
    <PanZoom
      zoomSpeed={ 0.5 }
      minZoom={ 0.5 }
      maxZoom={ 1.5 }
    >
      <div style={ styles.container }>
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
        <svg style={{ ...styles.addressBus, top: "13%", left: "220px" }}>
          <rect x="0" y="0" width="2" height="60"></rect>
          <rect x="0" y="60" width="377" height="2"></rect>
          <rect x="377" y="0" width="2" height="200"></rect>
        </svg>
        <div style={ styles.pc.container }>
          <svg style={ styles.addressBus }>
            <rect x="30" y="40" width="2" height="140"></rect>
            <rect x="102" y="40" width="2" height="140"></rect>
          </svg>
          <TextField
            type="number"
            styles={ styles.pc.increment }
            value={ sim.pc.step.toString() }
          />
          <TextField
            label="PC"
            styles={ styles.pc.input }
            value={ sim.pc.val.toString() }
          />
        </div>
        <div style={ styles.alu.container }>
          <svg style={ styles.alu.svg }>
            <polygon
              points="0 35, 120 35, 170 90, 220 35, 340 35, 240 180, 100 180"
            >
            </polygon>
          </svg>
          <Text styles={ styles.alu.label }>ALU</Text>
          <TextField
            styles={ styles.alu.p1 }
            value={ sim.alu.e1.toString() }
          />
          <TextField
            styles={ styles.alu.p2 }
            value={ sim.alu.e2.toString() }
          />
          <TextField
            styles={ styles.alu.op }
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
          <TextField label="ACC"  styles={ styles.acc.field } value={ sim.acc.toString() } />
        </div>
        <div style={ styles.ir.container }>
          <Text styles={ styles.ir.label }>IR</Text>
          <TextField
            styles={ styles.ir.input }
            value={ sim.ir.cmd + " " + sim.ir.loc }
          />
          <TextField
            styles={ styles.ir.decoder }
            defaultValue="DECODER"
            readOnly
          />
        </div>
        <Text styles={ styles.labels.bus }>data/instructions bus</Text>
        <Text styles={ styles.labels.addressesBus }>addresses bus</Text>
        
        <div style={ styles.ram.container }>
          <svg style={ styles.ram.svg }>
              <rect width="50" height="100" />
            </svg>
          <Text styles={ styles.ram.text }>RAM</Text>
        </div>
      </div>
    </PanZoom>
  );
});

export default Sim;
