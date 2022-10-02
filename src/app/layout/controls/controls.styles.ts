import { ICSSRule } from "@fluentui/merge-styles";
import { IStackStyles } from "@fluentui/react";

export const container:IStackStyles = {
  root: {
    position: "fixed" as ICSSRule,
    right: 0,
    bottom: 0,
    left: 0,
    padding: "11px 15px",
    backgroundColor: "var(--white)",
    borderTop: "1px solid var(--neutralLight)",
    zIndex: 900
  }
};

export const speed = {
  root: {
    width: 290,
    paddingTop: 3
  }
};