import { forwardRef } from "react"

export const LandingPagePricing = forwardRef((_, ref) => {
  const placeholderStyles = {
    height: "500px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }

  return (
    <section ref={ref} style={placeholderStyles}>
      <h1>Pricing</h1>
      <h4>Coming soon!</h4>
    </section>
  )
})