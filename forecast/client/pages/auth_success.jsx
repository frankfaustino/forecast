import React, { useEffect } from 'react'

const AuthSuccess = () => {
  useEffect(() => {
    const url = '/dashboard'
    window.opener.open(url, '_self')
    window.opener.focus()
    window.close()
  })

  return <div>Logged in!</div>
}

export default AuthSuccess
