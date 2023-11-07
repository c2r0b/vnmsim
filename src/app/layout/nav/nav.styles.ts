export const container:React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  height: 60,
  width: "100%",
  paddingTop: 0,
  paddingLeft: 5,
  backgroundColor: "var(--white)",
  borderBottom: "1px solid var(--lightBorder)",
  display: "flex",
  flexDirection: "row",
  gap: 28,
  zIndex: 9999,
}

export const openInput = {
  display: "none",
}

export const menuItem = {
  minWidth: 0,
  fontWeight: 400,
}

export const logo = {
  width: 35,
  height: 35,
  border: "1px solid var(--logoOrange)",
  borderRadius: 100,
  marginTop: 12,
  marginLeft: 7,
  cursor: "default",
}