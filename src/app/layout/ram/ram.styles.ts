export const container:React.CSSProperties = {
  position: "fixed",
  top: 50,
  right: 0,
  bottom: 55,
  backgroundColor: "var(--white)",
  borderLeft: "1px solid var(--neutralLight)",
  overflow: "hidden",
  zIndex: 100
}

export const title:React.CSSProperties = {
  position: "sticky",
  top: 0,
  left: 0,
  right: 0,
  backgroundColor: "var(--white)",
  borderBottom: "1px solid var(--neutralLight)",
  textAlign: "center",
  height: 40,
  zIndex: 100,
  overflow: "hidden",
  display: "flex",
  flexDirection: "row",
  paddingTop: 10,
  paddingLeft: 10
}

export const titleText = {
  fontWeight: 600,
  fontSize: 12
}

export const titleButton:React.CSSProperties = {
  position: "absolute",
  top: 5,
  right: 5
}

export const ramHalf:React.CSSProperties = {
  overflowY: "scroll"
}

export const verticalHalf:React.CSSProperties = {
  position: "relative",
  width: "100%",
  overflowY: "scroll",
  overflowX: "auto"
}

export const cell:React.CSSProperties = {
  fontSize: 11
}