export const container:React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  height: 50,
  backgroundColor: "#000",
  zIndex: 100
};

const cube:React.CSSProperties = {
  float: "left",
  width: 8,
  height: 8,
  marginBottom: 1,
  marginRight: 1,
  border: "2.5px solid white",
  borderRadius: 2.5
};

export const logo = {
  container: {
    marginTop: 12,
    marginBottom: 15,
    marginLeft: 15,
    width: 30,
    height: 30,
    transform: "rotate(45deg)"
  },
  cube: {
    standard: cube,
    colored: {
      ...cube,
      borderColor: "#f9c55b"
    }
  }
};

export const status = {
  root: {
    marginTop: -12,
    marginRight: 15,
    color: "white"
  },
  label: {
    color: "white",
    fontSize: 14,
    marginTop: -2
  },
  circle: {
    color: "white"
  }
};