import { useState } from "react";
import Button from "./Button";

// Confirmation is local to this plan and requires an exact, case-sensitive match.
export default function HashConfirm({ hash, onConfirm }) {
  const [typed, setTyped] = useState("");

  return (
    <div className="hash-confirm">
      <label>
        Hash del plan
        <input
          type="text"
          autoComplete="off"
          spellCheck={false}
          value={typed}
          onChange={(event) => setTyped(event.target.value)}
        />
      </label>
      <Button variant="danger" disabled={typed !== hash} onClick={() => onConfirm()}>
        Aprobar
      </Button>
    </div>
  );
}
