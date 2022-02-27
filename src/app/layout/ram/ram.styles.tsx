export const container = {
  position: "fixed",
  top: 50,
  right: 0,
  bottom: 55,
  backgroundColor: "white",
  borderLeft: "1px solid #eee",
  overflow: "hidden",
  zIndex: 100
};

export const title = {
  position: "sticky",
  top: 0,
  left: 0,
  right: 0,
  backgroundColor: "white",
  borderBottom: "1px solid #eee",
  textAlign: "center",
  height: 40,
  zIndex: 100,
  overflow: "hidden"
};

export const titleText = {
  root: {
    lineHeight: 38,
    fontWeight: 600
  }
};

export const titleButton = {
  root: {
    marginTop: 3,
    marginRight: 3
  },
  icon: {
    fontSize: 12
  }
};

export const ramHalf = {
  overflowY: "scroll"
};

export const verticalHalf = {
  position: "relative",
  width: "100%",
  overflowY: "scroll",
  overflowX: "auto"
};