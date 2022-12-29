import { useState, useRef} from 'react'

function HebrowInput({name, handleChange, required , num}) {
  const [erorrAnimation, setErorrAnimation] = useState('')
  const [err, setErr] = useState(!1)
  const inputT = useRef()
  
// Check if string has only hebrow
function hebrowText(str) {
  let check 

  if(str.length === 0) {
    return  setErr(!1)
  }

  for (let i = 0; i < str.length; i++) {
    check = (/[\u0590-\u05FF]/).test(`${str[i]}`);

    if (str[i] === ' ') continue
    
    if (!check){
      inputT.current.focus()

      setErr('ניתן להכניס רק אותיות ובעברית בלבד!')
      setErorrAnimation('erorr-animation')

      setTimeout(() => setErorrAnimation(''), 200);

      return
    };
  }


    setErr(!1)
  
}


  return (
  <>
    <input
    ref={inputT}
      type="text"
      name={name}
      autoComplete='off'
      onChange={e => handleChange(e, num)}
      onBlur={e => {
        hebrowText(e.target.value)

      }}
      minLength='2'
      maxLength='12'
      required={required}
  />


  {
    err && (
      <div className={`error ${erorrAnimation}`}>{err}</div>
    )
  }
  
  </>
  )
}

export default HebrowInput