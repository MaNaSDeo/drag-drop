import { type iPosition } from "@/types";
import React, { forwardRef, MouseEvent } from "react";

interface NoteProps {
  text: string;
  position?: iPosition;
  onMouseDown: (e: MouseEvent<HTMLDivElement>) => void;
}

const Note = forwardRef<HTMLDivElement, NoteProps>(
  ({ text, position, onMouseDown }, ref) => {
    return (
      <div
        ref={ref}
        onMouseDown={onMouseDown}
        style={{
          position: "absolute",
          left: `${position?.x}px`,
          top: `${position?.y}px`,
          border: "1px solid black",
          padding: "10px",
          width: "300px",
          maxHeight: "300px",
          cursor: "move",
          userSelect: "none",
          backgroundColor: "lightYellow",
        }}
        //   {...position}
      >
        📌 {text}
      </div>
    );
  }
);

export default Note;
