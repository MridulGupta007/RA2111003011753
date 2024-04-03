import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [authData, setAuthData] = useState({})
  const [number, setNumber] = useState([])
  
  const data = {
    companyName: "StickSports",
    clientID: "583d0cb0-dbdb-4543-80c4-4bbce6a593aa",
    clientSecret: "eYhBSuUdRSrSiFJN",
    ownerName: "Mridul Gupta",
    ownerEmail: "gontagupta@gmail.com",
    rollNo: "RA2111003011753"
  }

  const authFunc = async () => {
 
    const response = await fetch('http://20.244.56.144/test/auth', {
      method: "POST",
      body: JSON.stringify(data)
    })

    const authInfo = await response.json()
    console.log(authInfo)

    
    setAuthData(authInfo)

    const resp = await fetch('http://20.244.56.144/test/primes', {
      headers: {"Authorization": `${authInfo.token_type} ${authInfo.access_token}`}
    })
    const number = await resp.json()
    console.log(number)
    setNumber(prev => [...prev, ...number])
}

useEffect(() => {
  authFunc()
}, [])
  return (
    <>
    <p>{(number.reduce((accummulator, currValue) => accummulator + currValue, 0))/number.length}</p>
    </>
  )
}

export default App
