// import { useNavigate } from 'react-router-dom'

export const HomepagePricing = () => {
  // const navigate = useNavigate()
  const pricingContent = {
    1: {
      header: "Step 1: Begin Your Journey",
      body: "Start clicking the area where you are experiencing pain on our basic pain diagram to help us understand your symptoms."
    },
    2: {
      header: "Step 2: Questionnaire",
      body: "Next, complete our basic questionnaire. Please complete the form and check the \"I consent\" box at the end to provide your legal consent."
    },
    3: {
      header: "Step 3: Document Upload",
      body: "After submitting the questionnaire, you'll receive an email confirming your submission and asking you to upload your imaging studies (preferably MRI) to our secure DropBox folder. Click the upload link and follow the instructions. Once done, you'll receive a completion message."
    },
    4: {
      header: "Step 4: Payment",
      body: "After you upload you files, you’ll receive an official email from us that will take you to our payment portal. Complete your payment of $149.99 USD, and you're all set!"
    },
    5: {
      header: "Step 5: Receive Your Second Opinion ",
      body: "Once your payment is complete, you can expect your official second opinion within 1-3 business days via email."
    }
  }

  return (
    <section className="HomepagePricing --background">
      <div className="--content-container">
        {/* <h1 className="mt-0">Pricing</h1> */}
        {/* <span className="--button --button-text" onClick={() => navigate("/")}>
          <i className="fa-solid fa-arrow-left-long" />
          Return to previous page
        </span> */}
        {/* <p>Our comprehensive second opinion service is available for $150 USD. This includes a detailed review of your medical records by top spine specialists, ensuring you receive the best possible advice. Gain peace of mind and avoid unnecessary procedures with our trusted service and fair pricing.</p> */}
        <p><em>How It Works</em></p>
        {
          Object.keys(pricingContent)
            .map(key => {
              return <p key={key}>
                <em>{pricingContent[key].header} </em>
                {pricingContent[key].body}
              </p>
            })
        }
      </div>
    </section>
  )
}