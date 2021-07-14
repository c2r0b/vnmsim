import React, { useState, useEffect } from 'react';
import { TextField } from '@fluentui/react';

import * as Styles from "./sim.styles";
import execute from "../utility/execute";

interface Props {
  status: number;
  setStatus: Function;
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
      status: props.status,
      line: "LOD #2"
    });
    props.store.updateSim(result.sim);
    props.store.updateStats(result.stats);
  }, [props.status]);

  return (
    <div style={ Styles.container }>
      <svg style={ Styles.dataBus }>
        <rect x="0" y="0" width="3" height="95%"></rect>
        <rect x="0" y="0" width="100%" height="3"></rect>
        <rect x="0" y="95%" width="306" height="3"></rect>
        <rect x="306" y="54%" width="3" height="41.6%"></rect>
        <rect x="160" y="0" width="3" height="11%"></rect>
        <rect x="400" y="0" width="3" height="48%"></rect>
        <rect x="0" y="34%" width="210" height="3"></rect>
        <rect x="210" y="34%" width="3" height="12%"></rect>
        <rect x="100" y="11%" width="3" height="43%"></rect>
        <rect x="100" y="53.5%" width="200" height="3"></rect>
      </svg>
      <svg style={{ ...Styles.addressBus, top: "13%", left: "220px" }}>
        <rect x="0" y="0" width="3" height="60"></rect>
        <rect x="0" y="60" width="100%" height="3"></rect>
      </svg>
      <div style={ Styles.pc.container }>
        <svg style={ Styles.addressBus }>
          <rect x="0" y="40" width="3" height="140"></rect>
          <rect x="100" y="40" width="3" height="140"></rect>
        </svg>
        <label style={ Styles.pc.label }>PC</label>
        <TextField
          type="number"
          styles={ Styles.pc.increment }
          value={ sim.pc.step.toString() }
        />
        <TextField
          styles={ Styles.pc.input }
          value={ sim.pc.val.toString() }
        />
      </div>
      <div style={ Styles.alu.container }>
        <svg styles={ Styles.alu.svg }>
          <polygon
            points="0 35, 120 35, 170 90, 220 35, 340 35, 240 180, 100 180"
          >
          </polygon>
        </svg>
        <label style={ Styles.alu.label }>ALU</label>
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
          <rect x="120" y="0" width="170" height="3"></rect>
          <rect x="290" y="0" width="3" height="203"></rect>
          <rect x="120" y="200" width="174" height="3"></rect>
        </svg>
        <label style={ Styles.acc.label }>ACC</label>
        <TextField label="ACC" value={ sim.acc.toString() } />
      </div>
      <div style={ Styles.ir.container }>
        <label style={ Styles.ir.label }>IR</label>
        <TextField
          style={ Styles.ir.input }
          value={ sim.ir.cmd + " " + sim.ir.loc }
        />
        <TextField
          style={ Styles.ir.decoder }
          defaultValue="DECODER"
          readOnly
        />
      </div>
      <label style={ Styles.labels.bus }>Data/instructions bus</label>
      <label style={ Styles.labels.addressesBus }>Addresses bus</label>
      <label style={ Styles.labels.ram.main }>
        <p style={ Styles.labels.ram.p }>RAM</p>
      </label>
    </div>
  );
};

export default Sim;
