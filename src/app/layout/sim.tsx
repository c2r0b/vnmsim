import React, { useState, useEffect } from 'react';

import { TextField, Text } from '@fluentui/react';
import { PanZoom } from "react-easy-panzoom";

import * as Styles from "./sim.styles";
import execute from "../utility/execute";

interface Props {
  status: number;
  code?: Array<string>;
};

const commands = {
  LOD: '=',
  STO: '=',
  ADD: '+',
  SUB: '-',
  MUL: '*',
  DIV: '/'
};

const Sim = (props:Props) => {
  const sim = props.store.getSim();

  useEffect(() => {
    const result = execute({
      sim: props.store.getSim(),
      stats: props.store.getStats(),
      status: props.store.getSimStatus(),
      line: "LOD #2"
    });
    props.store.updateSim(result.sim);
    props.store.updateStats(result.stats);
  }, [props.store.getSimStatus()]);

  return (
    <PanZoom
      zoomSpeed={ 0.5 }
      minZoom={ 0.5 }
      maxZoom={ 1.5 }
    >
      <div style={ Styles.container }>
        <svg style={ Styles.dataBus }>
          <rect x="0" y="0" width="2" height="520"></rect>
          <rect x="0" y="0" width="100%" height="2"></rect>
          <rect x="0" y="520" width="306" height="2"></rect>
          <rect x="306" y="352" width="2" height="170"></rect>
          <rect x="160" y="0" width="2" height="11%"></rect>
          <rect x="400" y="0" width="2" height="48%"></rect>
          <rect x="0" y="190" width="207" height="2"></rect>
          <rect x="207" y="190" width="2" height="20"></rect>
          <rect x="102" y="70" width="2" height="240"></rect>
          <rect x="102" y="310" width="150" height="2"></rect>
        </svg>
        <svg style={{ ...Styles.addressBus, top: "13%", left: "220px" }}>
          <rect x="0" y="0" width="2" height="60"></rect>
          <rect x="0" y="60" width="100%" height="2"></rect>
        </svg>
        <div style={ Styles.pc.container }>
          <svg style={ Styles.addressBus }>
            <rect x="30" y="40" width="2" height="140"></rect>
            <rect x="102" y="40" width="2" height="140"></rect>
          </svg>
          <TextField
            type="number"
            styles={ Styles.pc.increment }
            value={ sim.pc.step.toString() }
          />
          <TextField
            label="PC"
            styles={ Styles.pc.input }
            value={ sim.pc.val.toString() }
          />
        </div>
        <div style={ Styles.alu.container }>
          <svg style={ Styles.alu.svg }>
            <polygon
              points="0 35, 120 35, 170 90, 220 35, 340 35, 240 180, 100 180"
            >
            </polygon>
          </svg>
          <Text styles={ Styles.alu.label }>ALU</Text>
          <TextField
            styles={ Styles.alu.p1 }
            value={ sim.alu.e1.toString() }
          />
          <TextField
            styles={ Styles.alu.p2 }
            value={ sim.alu.e2.toString() }
          />
          <TextField
            styles={ Styles.alu.op }
            value={ sim.alu.op }
            readOnly
          />
        </div>
        <div style={ Styles.acc.container }>
          <svg style={ Styles.dataBus }>
            <rect x="120" y="0" width="160" height="2"></rect>
            <rect x="280" y="0" width="2" height="202"></rect>
            <rect x="120" y="200" width="162" height="2"></rect>
          </svg>
          <TextField label="ACC"  styles={ Styles.acc.field } value={ sim.acc.toString() } />
        </div>
        <div style={ Styles.ir.container }>
          <Text styles={ Styles.ir.label }>IR</Text>
          <TextField
            styles={ Styles.ir.input }
            value={ sim.ir.cmd + " " + sim.ir.loc }
          />
          <TextField
            styles={ Styles.ir.decoder }
            defaultValue="DECODER"
            readOnly
          />
        </div>
        <Text styles={ Styles.labels.bus }>Data/instructions bus</Text>
        <Text styles={ Styles.labels.addressesBus }>Addresses bus</Text>
        <Text styles={ Styles.labels.ram.main }>
          <p style={ Styles.labels.ram.p }>RAM</p>
        </Text>
      </div>
    </PanZoom>
  );
};

export default Sim;
