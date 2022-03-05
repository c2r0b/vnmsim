export const varSpin = {
  root: {
    padding: 0,
    margin: 0
  },
  spinButtonWrapper: {
    height: 17,
    selectors: {
      "&::after": {
        border: "none"
      }
    }
  },
  input: {
    backgroundColor: "transparent"
  }
};

export const focusedVar = {
  ...varSpin,
  input: {
    backgroundColor: "#f9c55b"
  }
};