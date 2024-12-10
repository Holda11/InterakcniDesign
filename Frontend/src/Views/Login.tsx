import { useState } from 'react'
import LoginComponent from '../Components/LoginComponent'
import RegisterComponent from '../Components/RegisterComponent'

const Login = () => {
    const [singIn, setSingIn] = useState<boolean>(true)
  return (
    <section>
        {singIn ? <h2>Přihlásit se</h2> : <h2>Registrovat se</h2>}
        <div>
            <button onClick={()=> setSingIn(true)}>Přihlásit se</button>
            <button onClick={()=> setSingIn(false)}>Registrovat se</button>
        </div>
        {singIn ?
        <LoginComponent/>
        :
        <RegisterComponent/>
        }
    </section>
  )
}

export default Login