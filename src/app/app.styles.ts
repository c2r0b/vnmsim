export const container:React.CSSProperties = {
  position: "fixed",
  top: 50,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "var(--white)"
}

export const panel:React.CSSProperties = {
  position: "relative",
  width: "100%",
  height: "100%",
  overflow: "hidden",
  zIndex: 100
}


export const simPanel:React.CSSProperties = {
  ...panel,
  borderRadius: "20px 0 0 0"
}

export const sidebar:React.CSSProperties = {
  position: "relative",
  zIndex: 9999,
}