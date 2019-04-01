import { Button } from 'grommet'
import { Login } from 'grommet-icons'
import React from 'react'

const openLoginWindow = () => {
  const url = 'http://localhost:8888/auth'
  const name = '_blank'
  const specs = 'width=500,height=500'
  window.open(url, name, specs)
}

const LoginButton = () => <Button alignSelf="center" icon={<Login />} label="Log in to Clover" onClick={openLoginWindow} />

export default LoginButton