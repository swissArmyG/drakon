import { useState } from 'react'
import { FadedBgButton } from '../Buttons'
import { login } from '../../servers/sessions'

export const Login = ({ isOpen, toggleOpen, notify, setUserData }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [loginPayload, setLoginPayload] = useState({
    email: '',
    password: ''
  })

  const isSubmittable = loginPayload.email && loginPayload.password

  const clearAndClose = () => {
    setLoginPayload({ email: '', password: '' })
    toggleOpen(false)
  }

  const onChange = (updates) => {
    setLoginPayload({ ...loginPayload, ...updates })
  }

  const onSubmit = async() => {
    setIsLoading(true)

    try {
      const { data } = isSubmittable && await login({
        email: loginPayload.email,
        password: loginPayload.password
      })

      setUserData(data)

      notify({ 
        type: 'success', 
        message: 'Successfully logged in.'
      })

      clearAndClose()
    } catch (err) {
      notify({ 
        type: 'error', 
        message: 'Invalid email or password.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return isOpen && <section className="Login">
    <div className="--textbox">
      
      <div>
        <h3 className="--button --button-text -exit" 
          onClick={() => toggleOpen(false)}>
          X
        </h3>
      </div>

      <div className="--input-container">
        <input type="text"
          placeholder="Email"
          value={loginPayload.email || ""}
          onChange={(e) => {
            onChange({ email: e.target.value })
          }}
        />
      </div>

      <div className="--input-container">
        <input type="password"
          placeholder="Password"
          value={loginPayload.password || ""}
          onChange={(e) => {
            onChange({ password: e.target.value })
          }} 
        />
      </div>

      <FadedBgButton
        buttonText={'LOGIN'}
        buttonTextPosition={'24%'}
        onClick={(e) => {
          e.preventDefault()
          onSubmit()         
        }}
        isDisabled={!isLoading && !isSubmittable}
      />

      <span className="--button --button-text">Forgot your password ?</span>
    </div>
  </section>
}