import { forwardRef } from "react"

export const HomepageStory = forwardRef((_, ref) => {
  const placeholderStyles = {
    height: "1000px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }

  return (
    <section ref={ref} style={placeholderStyles}>
      <h1>Our Story</h1>
      <h4>Coming soon!</h4>
    </section>
  )
})