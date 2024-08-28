import { Lato, League_Spartan } from "next/font/google"

export const lato = Lato({
  variable: "--body-font",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
})

export const leagueSpartan = League_Spartan({
  variable: "--second-font",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
})
