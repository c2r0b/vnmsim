import { ICSSRule } from "@fluentui/merge-styles";
import { IMessageBarStyles, ISpinButtonStyles, ITextFieldStyles, ITextStyles } from "@fluentui/react";

export const infoMsg:IMessageBarStyles = {
  root: {
    position: "fixed" as ICSSRule,
    bottom: 70,
    left: 105,
    width: "auto",
    background: "var(--white)",
    zIndex: 9999
  },
  text: {
    paddingTop: 3
  }
};

export const container:React.CSSProperties = {
  width: 800,
  height: 800,
  maxHeight: 700,
  marginTop: 100,
  marginLeft: 90
};

export const dataBus:React.CSSProperties = {
  position: "absolute",
  top: 15,
  right: 0,
  bottom: 0,
  left: 15,
  margin: "0 auto",
  width: 800,
  height: 550,
  fill: "var(--neutralTertiaryAlt)",
  overflowY: "hidden"
};

export const addressBus:React.CSSProperties = {
  ...dataBus,
  fill: "var(--neutralTertiary)"
};

const label:React.CSSProperties = {
  position: "absolute",
  fontSize: 17,
  zIndex: 100,
  cursor: "help"
};

const fieldStyles:React.CSSProperties = {
  fontSize: "18px",
  textAlign: "center"
};

/* program counter */
export const pc = {
  container:<React.CSSProperties> {
    position: "absolute",
    top: 95,
    left: 480,
    width: 125,
    height: 200
  },
  label:<ITextStyles> {
    root: {
      ...label,
      top: 140,
      left: 10
    }
  },
  input:<ISpinButtonStyles> {
    root: {
      position: "absolute",
      top: 170,
      left: 10,
      width: 130,
      zIndex: 10
    },
    input: {
      ...fieldStyles
    }
  },
  increment:<ISpinButtonStyles> {
    root: {
      width: 30,
      margin: "80px 70px",
    },
    input: {
      ...fieldStyles,
      width: 30
    }
  }
};

/* arithmetic logic unit */
export const alu = {
  container:<React.CSSProperties> {
    position: "absolute",
    top: 187,
    left: 100,
    width: 350,
    height: 400,
    zIndex: 1
  },
  svg: {
    fill: "var(--white)",
    stroke: "var(--neutralTertiary)",
    strokeWidth: 1,
    width: 400,
    height: 400
  },
  label:<ITextStyles> {
    root: {
      ...label,
      top: 37,
      left: 155
    }
  },
  p1:<ITextFieldStyles> {
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
  p2:<ITextFieldStyles> {
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
  op:<ITextFieldStyles> {
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
  container:<React.CSSProperties> {
    position: "absolute",
    top: 20,
    bottom: 30
  },
  label:<ITextStyles> {
    root: {
      ...label,
      top: 12,
      left: 40
    }
  },
  input:<ITextFieldStyles> {
    root: {
      width: 250,
      margin: 40
    },
    field: {
      ...fieldStyles
    }
  },
  decoder:<ITextFieldStyles> {
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
  container:<React.CSSProperties> {
    position: "absolute",
    top: 247,
    left: 155
  },
  field: {
    root: {
      top: 160,
      left: 34,
      width: 163
    }
  },
  label:<ITextStyles> {
    root: {
      ...label,
      top: 133,
      left: 34
    }
  }
};


/* other sim labels */
export const labels = {
  bus:<ITextStyles> {
    root: {
      ...label,
      top: 25,
      left: 380,
      fontSize: 14,
      width: 100
    }
  },
  addressesBus:<ITextStyles> {
    root: {
      ...label,
      top: 100,
      left: 380,
      paddingTop: 20,
      fontSize: 14,
      width: 100
    }
  }
};

export const ram = {
  container:<React.CSSProperties> {
    position: "absolute",
    top: 30,
    left: 570,
    zIndex: 1
  },
  svg: {
    fill: "var(--white)",
    stroke: "#ccc",
    strokeWidth: 1,
    width: 50,
    height: 100
  },
  text:<ITextStyles> {
    root: {
      ...label,
      top: 38,
      left: 8,
      transform: "rotate(90deg)"
    }
  }
};

export const focus = {
  backgroundColor: "#f9c55b",
  color: "black"
};