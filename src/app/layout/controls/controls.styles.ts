export const container:React.CSSProperties = {
  position: "fixed",
  right: 0,
  bottom: 0,
  left: 0,
  paddingRight: 15,
  backgroundColor: "var(--white)",
  borderTop: "1px solid var(--neutralLight)",
  zIndex: 900,
  display: "flex",
  flexDirection: "row",
  gap: 20
};

export const controls:React.CSSProperties = {
  paddingTop: 15,
  paddingLeft: 15,
  paddingBottom: 15,
  display: "flex",
  flexDirection: "row",
  gap: 10
};

export const sliderContainer:React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 0,
  marginTop: 6
};

export const sliderLabel = {
  fontSize: 10,
  marginTop: -8
};

export const slider = {
  width: 150
};

export const poweredByVercel:React.CSSProperties = {
  position: "fixed",
  right: 15,
  bottom: 3
};