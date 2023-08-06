import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dictionary() {
  const [word, setWord] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <input
        type="text"
        onChange={(e) => {
          setWord(e.target.value);
        }}
      />
      <button
        className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          navigate("/definition/" + word);
        }}
      >
        {" "}
        Search{" "}
      </button>
    </>
  );
}
