
export const LandingPageNav = () => {
  const navOptions = [
    "LOGIN",
    "CONTACT",
    "SPINE CHART"
  ]

  return (
    <section className="LandingPageNav --container">
      <div className="LandingPageNav --nav -options">
        {
          navOptions.map((navOp, idx) => {
            return <p key={idx} className="LandingPageNav --nav -option --button">{navOp}</p>
          })
        }
      </div>
      <p className="LandingPageNav --nav -info">
        Your spine is a critical component of your body<br/>
        Without it, you would crumble to pieces<br/>
        Take excellent care of it
      </p>
    </section>
  )
}