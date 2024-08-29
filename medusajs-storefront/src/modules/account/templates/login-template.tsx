"use client"

import { useState } from "react"

import Register from "@modules/account/components/register"
import Login from "@modules/account/components/login"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
}

const LoginTemplate = () => {
  const [currentView, setCurrentView] = useState("sign-in")

  return (
    <>
      <section className="breadcrumb">
        <ul className="breadcrumb__list flex container">
          <li>
            <LocalizedClientLink className="breadcrumb__link" href={`/`}>
              Home
            </LocalizedClientLink>
          </li>
          <li>
            <span className="breadcrumb__link">{">"}</span>
          </li>
          <li>
            <span className="breadcrumb__link">Login / Register</span>
          </li>
        </ul>
      </section>
      <div className="login-register section--lg">
        <div className="login-register__container container grid">
          {/* {currentView === "sign-in" ? (
          <Login setCurrentView={setCurrentView} />
        ) : (
          <Register setCurrentView={setCurrentView} />
        )} */}
          <Login setCurrentView={setCurrentView} />
          <Register setCurrentView={setCurrentView} />
        </div>
      </div>
    </>
  )
}

export default LoginTemplate
