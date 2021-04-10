import './simulator.css';

import React, { useState, useEffect } from 'react';
import { TextField } from '@fluentui/react';

import * as InputStyles from "./sim.inputs.styles";
import execute from "./execute";

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
    <div className="sim">
      <svg className="dataBus">
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
      <svg className="addressBus" style={{ top: "13%", left: "220px" }}>
        <rect x="0" y="0" width="3" height="60"></rect>
        <rect x="0" y="60" width="100%" height="3"></rect>
      </svg>
      <div id="pc">
        <svg className="addressBus">
          <rect x="0" y="40" width="3" height="140"></rect>
          <rect x="100" y="40" width="3" height="140"></rect>
        </svg>
        <label className="tooltip">PC</label>
        <TextField styles={ InputStyles.incrementStyles } value={ sim.pc.step.toString() } type="number" />
        <TextField styles={ InputStyles.PCStyles } value={ sim.pc.val.toString() } />
      </div>
      <div id="alu">
        <svg>
          <polygon points="0 35, 120 35, 170 90, 220 35, 340 35, 240 180, 100 180"></polygon>
        </svg>
        <label className="tooltip">ALU</label>
      </div>
      <div id="acc">
        <svg className="dataBus">
          <rect x="120" y="0" width="170" height="3"></rect>
          <rect x="290" y="0" width="3" height="203"></rect>
          <rect x="120" y="200" width="174" height="3"></rect>
        </svg>
        <label className="tooltip">ACC</label>
        <TextField label="ACC" value={ sim.acc.toString() } />
      </div>
      <div id="ir">
        <label className="tooltip">IR</label>
        <TextField styles={ InputStyles.IRStyles } value={ sim.ir.cmd + " " + sim.ir.loc } />
        <TextField styles={ InputStyles.DecoderStyles } defaultValue="DECODER" readOnly />
      </div>
      <label id="busL">Data/instructions bus</label>
      <label id="addressesBusL">Addresses bus</label>
      <label className="tooltip" id="ramL">
        <p>RAM</p>
      </label>

      <div className="alu">
        <TextField styles={ InputStyles.ALUP1Styles } value={ sim.alu.e1.toString() } />
        <TextField styles={ InputStyles.ALUP2Styles } value={ sim.alu.e2.toString() } />
        <TextField styles={ InputStyles.ALUOPStyles } value={ sim.alu.op } readOnly />
      </div>
    </div>
  );
}

export default Sim;
