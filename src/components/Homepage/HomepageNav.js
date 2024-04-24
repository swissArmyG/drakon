
export const HomepageNav = () => {
  const navOptions = [
    "LOGIN",
    "CONTACT",
    "SPINE CHART"
  ]

  return (
    <section className="HomepageNav --container">
      <div className="HomepageNav --nav -options">
        {
          navOptions.map((navOp, idx) => {
            return <p key={idx} className="HomepageNav --nav -option --button">{navOp}</p>
          })
        }
      </div>
      <p className="HomepageNav --nav -info">
        Your spine is a critical component of your body<br/>
        Without it, you would crumble to pieces<br/>
        Take excellent care of it
      </p>
    </section>
  )
}