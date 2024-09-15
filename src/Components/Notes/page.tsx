import React, {
  createRef,
  RefObject,
  useEffect,
  useRef,
  MouseEvent,
} from "react";
import Note from "../Note/page";
import { type iNote, type iNotesProps, type iPosition } from "@/types";

function Notes({ notes = [], setNotes }: iNotesProps) {
  useEffect(() => {
    const savedNotes = JSON.parse(
      localStorage.getItem("notes") || "[]"
    ) as iNote[];

    const updatedNotes: iNote[] = notes.map((note) => {
      const savedNote = savedNotes.find((n: iNote) => n.id === note.id);
      if (savedNote) {
        return { ...note, position: savedNote.position };
      } else {
        const position = determineNewPosition();
        return { ...note, position };
      }
    });

    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  }, [notes.length, setNotes]);

  const noteRefs = useRef<{ [key: number]: RefObject<HTMLDivElement> }>({});

  const determineNewPosition = (): iPosition => {
    const maxX = window.innerWidth - 300;
    const maxY = window.innerHeight - 300;

    return {
      x: Math.floor(Math.random() * maxX),
      y: Math.floor(Math.random() * maxY),
    };
  };

  const handleDragStart = (note: iNote, e: MouseEvent<HTMLDivElement>) => {
    const { id } = note;

    const noteRef = noteRefs.current[id].current;
    if (!noteRef) return;

    const rectangle = noteRef.getBoundingClientRect();

    const offSetX = e.clientX - rectangle.left;
    const offSetY = e.clientY - rectangle.top;

    // Store the initial position
    const startPosition = { x: rectangle.left, y: rectangle.top };

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      const newX = e.clientX - offSetX;
      const newY = e.clientY - offSetY;

      noteRef.style.left = `${newX}px`;
      noteRef.style.top = `${newY}px`;
    };

    const handleMouseUp = (e: globalThis.MouseEvent) => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);

      const finalRect = noteRef.getBoundingClientRect();
      const newPosition = { x: finalRect.left, y: finalRect.top };

      if (checkForOverlap(id, newPosition)) {
        noteRef.style.left = `${startPosition.x}px`;
        noteRef.style.top = `${startPosition.y}px`;
      } else {
        updateNotePosition(id, newPosition);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const updateNotePosition = (id: number, newPosition: iPosition) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, position: newPosition } : note
    );
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const checkForOverlap = (id: number, newPosition: iPosition): boolean => {
    const currentNoteRef = noteRefs.current[id].current;
    if (!currentNoteRef) {
      return false; // If we can't find the current note, assume no overlap
    }
    // const currentRect = currentNoteRef.getBoundingClientRect();
    const currentRect = new DOMRect(
      newPosition.x,
      newPosition.y,
      currentNoteRef.offsetWidth,
      currentNoteRef.offsetHeight
    );

    return notes.some((note) => {
      if (note.id === id) return false; // Skip the current note

      const otherNoteRef = noteRefs.current[note.id].current;
      if (!otherNoteRef) {
        return false; // If we can't find the other note, assume no overlap
      }
      const otherRect = otherNoteRef.getBoundingClientRect();

      // Check for overlap
      const overlap = !(
        currentRect.right < otherRect.left ||
        currentRect.left > otherRect.right ||
        currentRect.bottom < otherRect.top ||
        currentRect.top > otherRect.bottom
      );

      return overlap;
    });
  };

  return (
    <div>
      {notes.length > 0 &&
        notes.map((note) => (
          <Note
            key={note.id}
            text={note.text}
            position={note.position}
            ref={
              noteRefs.current[note.id] ||
              (noteRefs.current[note.id] = createRef<HTMLDivElement>())
            }
            onMouseDown={(e: any) => handleDragStart(note, e)}
          />
        ))}
    </div>
  );
}

export default Notes;
