"use client"

import { useFormState } from "react-dom"

import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import { signUp } from "@modules/account/actions"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useFormState(signUp, null)

  return (
    <div className="register" data-testid="register-page">
      <h3 className="section__title">Create an Account</h3>
      <form className="form grid" action={formAction}>
        <Input
          label="First name"
          name="first_name"
          required
          autoComplete="given-name"
          data-testid="first-name-input"
        />
        <Input
          label="Last name"
          name="last_name"
          required
          autoComplete="family-name"
          data-testid="last-name-input"
        />
        <Input
          label="Email"
          name="email"
          required
          type="email"
          autoComplete="email"
          data-testid="email-input"
        />
        <Input
          label="Phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          data-testid="phone-input"
        />
        <Input
          label="Password"
          name="password"
          required
          type="password"
          autoComplete="new-password"
          data-testid="password-input"
        />
        <ErrorMessage error={message} data-testid="register-error" />

        <SubmitButton
          className="btn px-0 py-0 shadow-buttons-none hover:bg-ui-button-transparent"
          data-testid="register-button"
        >
          Submit & Register
        </SubmitButton>
      </form>
      {/* <span className="text-center text-ui-fg-base text-small-regular mt-6">
        Already a member?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="underline"
        >
          Sign in
        </button>
        .
      </span> */}
    </div>
  )
}

export default Register
