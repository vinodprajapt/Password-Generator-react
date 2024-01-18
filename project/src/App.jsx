import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  const [length, setlength] = useState(10);
  const [number, setnumber] = useState(false);
  const [Character, setcharacter] = useState(false);
  const [Password, setpassword] = useState("");

  const passwordRef = useRef();

  const Passwordgenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "0123456789";
    if (Character) str += "?/><|+=_-)(*&%$#@!";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setpassword(pass);
  }, [length, number, Character, setpassword]);

  const Copypassword = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(Password);
  }, [Password]);

  useEffect(() => {
    Passwordgenerator();
  }, [length, number, Character, Passwordgenerator]);

  return (
    <>
      <div className="card1">
        <h4 className="text-4xl text-info text-center pt-5">
          Password Generator
        </h4>
        <div className="flex text-center">
          <input
            className="mt-4 p-2"
            type="text"
            placeholder="password"
            value={Password}
            readOnly
            ref={passwordRef}
          />
          <button
            className="text-light bg-success rounded ml-1 p-2"
            onClick={Copypassword}
          >
            copy
          </button>
        </div>
        <div>
          <input
            className="ml-3 mt-3"
            type="range"
            value={length}
            onChange={(e) => {
              setlength(e.target.value);
            }}
          />
          <label htmlFor="numberinput">length({length})</label>
        </div>
        <div>
          <input
            className="ml-3 mt-2"
            type="checkbox"
            defaultChecked={number}
            onChange={() => {
              setnumber((prev) => !prev);
            }}
          />
          <label className="ml-1" htmlFor="">
            Number
          </label>
        </div>
        <div>
          <input
            className="ml-3 mt-2"
            type="checkbox"
            defaultChecked={Character}
            onChange={() => {
              setcharacter((prev) => !prev);
            }}
          />
          <label className="ml-1" htmlFor="Characterinput">
            Character
          </label>
        </div>
      </div>
    </>
  );
}

export default App;
