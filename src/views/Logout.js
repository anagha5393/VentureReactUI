import React from 'react'
import { Redirect } from 'react-router'
import { fbapp } from '..'


export function Logout() {
  fbapp.auth().signOut();
  return (
    <Redirect push to="/login" />
  )
}