import { useEffect, useState } from 'react'
import auth from '../feature/authentication'
function Home() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    auth.getAllUser().then(response => {
      setUsers([...users, ...response.data])
    }).finally(() => { setLoading(false) }) 
  }, [])
  
  return <span className="loading loading-infinity loading-lg  text-red-400"></span>
}

export default Home