import { services } from "../../copies/drakon-home"

export const HomepageFAQ = () => {
  const renderServicesList = () => {
    return services.list.map(item => {
      return <div className="ListItem flex row justify-start">
        <p>
          <i className="fa-solid fa-caret-right" />
          {item}
        </p>
      </div>
    })
  }

  const renderServicesContent = () => {
    return services.content.map(item => {
      return <p>{item}</p>
    })
  }

  return (
    <section className="HomepageFAQ section-container flex row justify-center">
      <div className="left-column">
        {renderServicesList()}
      </div>
      <div className="right-column">
        <h1>{services.contentHeader}</h1>
        <p>{services.contentSubHeader}</p>
        {renderServicesContent()}
      </div>
    </section>
  )
}