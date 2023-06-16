export type RegisterProps = {
  name: string
  email: string
  password: { first: string; second: string }
  recaptcha: string
}
