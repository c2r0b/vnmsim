export const infoMsg = {
  root: {
    position: "fixed",
    bottom: 20,
    left: 105,
    width: "auto",
    background: "white"
  },
  text: {
    paddingTop: 3
  }
};

export const container = {
  position: "absolute",
  top: 100,
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
  width: 800,
  height: 550,
  fill: "#bbb",
  overflowY: "hidden"
};

export const addressBus = {
  ...dataBus,
  fill: "#000"
};

const label = {
  position: "absolute",
  fontSize: 17,
  zIndex: 100,
  cursor: "help"
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
    left: 480,
    width: 125,
    height: 200
  },
  label: {
    root: {
      ...label,
      top: 140,
      left: 10
    }
  },
  input: {
    root: {
      position: "absolute",
      top: 170,
      left: 10,
      width: 130
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
    top: 187,
    left: 100,
    width: 350,
    height: 400,
    zIndex: 1
  },
  svg: {
    fill: "white",
    stroke: "#ccc",
    strokeWidth: 1,
    width: 400,
    height: 400
  },
  label: {
    root: {
      ...label,
      top: 37,
      left: 155
    }
  },
  p1: {
    root: {
      position: "absolute",
      top: 65,
      left: 60,
      width: 70,
    },
    fieldGroup: {
      border: "none"
    },
    field: {
      ...fieldStyles,
      border: "none"
    }
  },
  p2: {
    root: {
      position: "absolute",
      top: 65,
      left: 210,
      width: 70,
    },
    fieldGroup: {
      border: "none"
    },
    field: {
      ...fieldStyles,
      border: "none"
    }
  },
  op: {
    root: {
      position: "absolute",
      top: 120,
      left: 143,
      width: 50,
    },
    fieldGroup: {
      border: "none"
    },
    field: {
      ...fieldStyles
    }
  }
};


/* instructions register */
export const ir = {
  container: {
    position: "absolute",
    top: 20,
    bottom: 30
  },
  label: {
    root: {
      ...label,
      top: 12,
      left: 40
    }
  },
  input: {
    root: {
      width: 250,
      margin: 40
    },
    field: {
      ...fieldStyles
    }
  },
  decoder: {
    root: {
      position: "absolute",
      top: 100,
      left: -20,
      width: 100,
      margin: "0 60px",
      cursor: "pointer"
    },
    fieldGroup: {
      borderColor: "#ccc"
    },
    field: {
      ...fieldStyles,
      fontSize: 14,
      fontWeight: 600,
      cursor: "pointer"
    }
  }
};

/* accumulator */
export const acc = {
  container: {
    position: "absolute",
    top: 247,
    left: 155
  },
  field: {
    root: {
      top: 160,
      left: 34
    }
  },
  label: {
    root: {
      ...label,
      top: 133,
      left: 34
    }
  }
};


/* other sim labels */
export const labels = {
  bus: {
    root: {
      ...label,
      top: 25,
      left: 380,
      fontSize: 14
    }
  },
  addressesBus: {
    root: {
      ...label,
      top: 100,
      left: 380,
      paddingTop: 20,
      fontSize: 14
    }
  }
};

export const ram = {
  container: {
    position: "absolute",
    top: 30,
    left: 570,
    zIndex: 1
  },
  svg: {
    fill: "white",
    stroke: "#ccc",
    strokeWidth: 1,
    width: 50,
    height: 100
  },
  text: {
    root: {
      ...label,
      top: 38,
      left: 8,
      transform: "rotate(90deg)"
    }
  }
};