import  { useContext } from 'react'
import { AuthContext } from '../context/AuthContext/AuthContext'

const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider')
  }

  return context
}

export default useAuthContext