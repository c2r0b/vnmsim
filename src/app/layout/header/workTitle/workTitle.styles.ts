import { ITextStyles } from "@fluentui/react";

export const container:React.CSSProperties = {
  marginLeft: 15,
  marginTop: 4
};

export const title:ITextStyles = {
  root: {
    fontSize: 21,
    fontWeight: 600,
    color: "white",
    lineHeight: 0,
    marginTop: -10,
    marginBottom: -7
  }
};

export const date = {
  root: {
    fontSize: 9,
    paddingTop: 0,
    cursor: "default",
    color: "white"
  }
};