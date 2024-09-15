"use client";

import Notes from "@/Components/Notes/page";
import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {
  const [notes, setNotes] = useState<{ id: number; text: string }[]>([
    {
      id: 1,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 2,
      text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    },
    {
      id: 3,
      text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ",
    },
    {
      id: 4,
      text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ]);

  return (
    <div>
      <Notes notes={notes} setNotes={setNotes} />
    </div>
  );
}
