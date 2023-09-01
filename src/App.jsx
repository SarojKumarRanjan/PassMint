import { useState, useCallback, useEffect, useRef } from "react";


function App() {
  let [length, setlength] = useState(8);
  let [numAllowed, setNumAllowed] = useState(false);
  let [charAllowed, setCharAllowed] = useState(false);
  let [password, setPassword] = useState("");

  let passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIKLMNOPQRSTVXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "!@#$%^&*()_{}";
    }
    if (numAllowed && charAllowed) {
      str += "0123456789!@#$%^&*()_{}";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);

      setPassword(pass);
    }
  }, [length, numAllowed, charAllowed, setPassword]);

  // useref hook 
  const passwordRef = useRef (null)

  const copyPasswordToClip = useCallback(() => {

    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,51);

    window.navigator.clipboard.writeText(password);

  },[password])


  useEffect(() => {
    passwordGenerator()
  },[length,numAllowed,charAllowed,passwordGenerator]);

  return (
    <>
      <div className=" bg-gray-700 w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-60 py-4 text-orange-500 ">
        <h1 className="text-white text-center my-3 text-xl">PassMint</h1>
        <div className="flex shadow rounded-lg mb-4 overflow-hidden">

                <input type="text"
                value={password}
                className="outline-none w-full py-1 px-3"
                placeholder="password"
                readOnly
                ref={passwordRef}
                
                
                />
                <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
                onClick={copyPasswordToClip}
                
                
                >copy</button>





        </div>
        <div className="flex text-sm gap-2">
          <div className="flex items-center gap-x-1">
            <input 
             type="range" 
             min={8}
             max={50}
             value={length}
             className="cursor-pointer"
             onChange={(e) => {setlength(e.target.value)}}
             
             />
             <label > length {length} </label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox"
            defaultChecked={numAllowed}
            id="numInput"
            onChange={() => {setNumAllowed((prev) => !prev)}} />
          </div>
          <label > Numbers</label>

          <div className="flex items-center gap-x-1">
            <input type="checkbox"
            defaultChecked={charAllowed}
            id="numInput"
            onChange={() => {setCharAllowed((prev) => !prev)}} />
          </div>
          <label > Characters</label>
        </div>

        
      </div>
    </>
  );
}

export default App;
