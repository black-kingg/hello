import { useState, useEffect } from "react";

export default function Dictionary() {
  const [word, setWord] = useState("");
  const [word2, setWord2] = useState("");

  useEffect(() => {
    console.log("state updated" + "" + word);
  }, [word]);

  useEffect(() => {
    console.log("state updated" + "" + word2);
  }, [word2]);

  return (
    <>
      <input
        type="text"
        onChange={(e) => {
          setWord(e.target.value);
        }}
      />
      <h1>Let's get the definition of {word}</h1>

      <input
        type="text"
        onChange={(e) => {
          setWord2(e.target.value);
        }}
      />
      <h2>Let's get the definition of {word2}</h2>
    </>
  );
}
