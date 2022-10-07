import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";

import { Localize } from "src/locale/Localize";

import * as Styles from "./dropZone.styles";

interface IProps {
  onOpen: Function;
}

const DropZone = observer((props:IProps) => {
  const [ isDragging, setIsDragging ] = useState(false);
  
  const handleDrag = (e, isDragging) => {
    e.preventDefault();
    setIsDragging(isDragging);
  };

  // files drop
  useEffect(() => {
    window.addEventListener("dragenter", (e) => handleDrag(e, true));
    const el = document.getElementById("dropZone");
    el.addEventListener("dragenter", (e) => handleDrag(e, true));
    el.addEventListener("dragover", (e) => handleDrag(e, true));
    el.addEventListener("dragleave", (e) => handleDrag(e, false));
    el.addEventListener("drop", (e) => {
      props.onOpen(e.dataTransfer.files[0]);
      handleDrag(e, false);
    });
  }, []);

  return (
    <div
      id="dropZone"
      style={ Styles.container(isDragging) }
    >
      <div style={ Styles.opaqueBack } />
      <div style={ Styles.element }>
        <p style={ Styles.message }>
          <Localize label="FILE_DROP"/>
        </p>
      </div>
    </div>
  );
});

export default DropZone;
