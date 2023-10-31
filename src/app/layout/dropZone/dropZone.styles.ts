export const container = (isDragging:boolean):React.CSSProperties => ({
  position: "fixed",
  top: 50,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 9999,
  display: (isDragging === true) ? "block" : "none"
})

export const opaqueBack:React.CSSProperties = {
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  backgroundColor: "#ccc",
  opacity: 0.6,
}

export const element:React.CSSProperties = {
  position: "absolute",
  top: 10,
  right: 10,
  bottom: 10,
  left: 10,
  border: "3px dashed black",
  textAlign: "center"
}

export const message:React.CSSProperties = {
  margin: 0,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  padding: 15,
  backgroundColor: "black",
  fontSize: 12,
  color: "white"
}