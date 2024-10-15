import { useState,useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setLenght] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [CharacterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let pass = ""

    if(numberAllowed){
      str += '0123456789'
    }
    if(CharacterAllowed){
      str += '!@#$%^&*()_+}{[]?><'
    }
    for(let i=1; i<length; i++){
      let char = Math.floor(Math.random() * str.length +1);
      pass += str.charAt(char);

    }
    setPassword(pass)
  },[length,numberAllowed.CharacterAllowed,setPassword])

  const copyPasswordToClipboard = useCallback(()=>{
      passwordRef.current?.select();
      window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator();
  },[length,numberAllowed,CharacterAllowed,passwordGenerator])
  
  

  

  return (
    <>
    <div className='h-48 w-full max-w-screen-md mx-auto shadow-md rounded-lg px-5 my-8 text-orange-400 bg-gray-700 '>
      <h1 className='flex justify-center text-3xl text-white'>Password Generator</h1>
      <div className='className="flex  overflow-hidden mb-4 '>
      <input type="text" className='outline-none rounded-md w-11/12 py-3 px-3' placeholder='Password' readOnly value={password} ref={passwordRef}/>
      <button className='my-5 outline-none rounded-md  bg-blue-600 text-white px-3 py-3 shrink-0' onClick={copyPasswordToClipboard}>Copy</button>
      

      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex item-center gap-x-1'>
        <input type="range" min={8} max={50} value={length} className='cursor-pointer' onChange={(e)=>{setLenght(e.target.value)}} />
        <label>Length : {length}</label>
      </div>
      <div className='flex item-center gap-x-1'>
          <input type="checkbox" defaultChecked={numberAllowed} onChange={()=> setNumberAllowed((prev)=> !prev)}  />
          <label>Number</label>
        </div>
        <div className='flex items-center gap-x-1'>
        <input type="checkbox" defaultChecked={CharacterAllowed} onChange={()=>setCharacterAllowed((prev)=> !prev)} />
          <label>Character</label>

        </div>


      </div> 
      
    </div>
    
    </>
  )
}

export default App
