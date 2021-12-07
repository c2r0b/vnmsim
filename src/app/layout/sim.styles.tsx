export const container = {
  position: "absolute",
  top: 60,
  left: 0,
  right: 250,
  bottom: 10,
  width: 800,
  height: 800,
  maxHeight: 700,
  marginLeft: 90
};

export const dataBus = {
  position: "absolute",
  top: 15,
  right: 0,
  bottom: 0,
  left: 15,
  float: "center",
  margin: "0 auto",
  width: "100%",
  height: "100% !important",
  fill: "#ddd",
  overflowY: "hidden"
};

export const addressBus = {
  ...dataBus,
  fill: "#999"
};

const label = {
  position: "absolute",
  fontFamily: "'Share Tech Mono', monospace",
  fontSize: 18,
  color: "#aaa"
};

const fieldStyles = {
  fontSize: "18px",
  textAlign: "center"
};

/* program counter */
export const pc = {
  container: {
    position: "absolute",
    top: "14%",
    left: "65%",
    width: 125,
    height: 200
  },
  label: {
    ...label,
    bottom: 45,
    left: 50
  },
  input: {
    root: {
      width: 130,
      margin: "0px 0px",
    },
    field: {
      ...fieldStyles
    }
  },
  increment: {
    root: {
      width: 50,
      margin: "80px 90px",
    },
    field: {
      ...fieldStyles,
      fontSize: "15px"
    }
  }
};

/* arithmetic logic unit */
export const alu = {
  container: {
    position: "absolute",
    top: "33%",
    left: 150,
    width: 350,
    height: 400
  },
  svg: {
    fill: "white",
    stroke: "#ccc",
    strokeWidth: 1,
    width: 400,
    height: 400
  },
  label: {
    ...label,
    top: 35,
    left: 150
  },
  p1: {
    root: {
      width: 70,
      margin: "50px 205px",
    },
    field: {
      ...fieldStyles,
    }
  },
  p2: {
    root: {
      width: 70,
      margin: "-85px 370px",
    },
    field: {
      ...fieldStyles,
    }
  },
  op: {
    root: {
      width: 50,
      margin: "120px 295px",
    },
    field: {
      ...fieldStyles,
    }
  }
};


/* instructions register */
export const ir = {
  container: {
    position: "absolute",
    top: "3%",
    bottom: 30
  },
  label: {
    ...label,
    top: 12,
    left: 40
  },
  input: {
    root: {
      width: 250,
      margin: 40
    },
    field: {
      ...fieldStyles,
    }
  },
  decoder: {
    root: {
      width: 100,
      margin: "0 60px",
    },
    field: {
      ...fieldStyles,
      fontSize: "15px"
    }
  }
};

/* accumulator */
export const acc = {
  container: {
    position: "absolute",
    top: "35%",
    left: 205
  },
  label: {
    ...label,
    top: 205,
    left: 10
  }
};


/* other sim labels */
export const labels = {
  bus: {
    ...label,
    top: 20,
    left: 430,
    fontSize: 18
  },
  addressesBus: {
    ...label,
    top: "15%",
    left: 430,
    paddingTop: 20,
    fontSize: 18
  },
  ram: {
    main: {
      ...label,
      top: "8%",
      right: 0
    },
    p: {
      transform: "rotate(-90deg)"
    }
  }
};
