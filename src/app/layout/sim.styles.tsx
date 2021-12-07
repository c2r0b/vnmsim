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
  fontSize: 17
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
    root: {
      ...label,
      bottom: 45,
      left: 50
    }
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
    top: 190,
    left: 150,
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
      ...fieldStyles,
    }
  },
  decoder: {
    root: {
      position: "absolute",
      top: 100,
      left: 0,
      width: 100,
      margin: "0 60px",
      cursor: "pointer"
    },
    fieldGroup: {
      borderColor: "#ccc"
    },
    field: {
      ...fieldStyles,
      fontSize: "15px",
      fontWeight: 600,
      cursor: "pointer"
    }
  }
};

/* accumulator */
export const acc = {
  container: {
    position: "absolute",
    top: 250,
    left: 205
  },
  field: {
    root: {
      top: 175,
      left: 35
    }
  }
};


/* other sim labels */
export const labels = {
  bus: {
    root: {
      ...label,
      top: 25,
      left: 430,
      fontSize: 16
    }
  },
  addressesBus: {
    root: {
      ...label,
      top: 100,
      left: 430,
      paddingTop: 20,
      fontSize: 16
    }
  },
  ram: {
    main: {
      root: {
        ...label,
        top: "8%",
        right: 0
      }
    },
    p: {
      transform: "rotate(-90deg)"
    }
  }
};
