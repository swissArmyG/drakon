import { useNavigate } from 'react-router-dom'

export const Pricing = () => {
  const navigate = useNavigate()

  return (
    <section className="Pricing --background">
      <div className="--content-container">
        <h1 className="mt-0">Pricing</h1>
        <span className="--button --button-text" onClick={() => navigate("/")}>
          <i className="fa-solid fa-arrow-left-long" />
          Return to previous page
        </span>

        <p>Our comprehensive second opinion service is available for $150 USD. This includes a detailed review of your medical records by top spine specialists, ensuring you receive the best possible advice. Gain peace of mind and avoid unnecessary procedures with our trusted service and fair pricing.</p>

        <h1>How Does It Work?</h1>

        <p>
          <em>Step 1: Begin Your Journey</em>
          Start by filling out our basic pain diagram to help us understand your symptoms. Once completed, click "next."
        </p>

        <p>
          <em>Step 2: Full Questionnaire</em>
          Next, you'll be directed to a page with a detailed questionnaire. Please complete the form and check the "I consent" box to provide your legal consent.
        </p>

        <p>
          <em>Step 3: Document Upload</em>
          After submitting the questionnaire, you'll be taken to a page where you can upload your MRI files. Click the upload link and follow the instructions. Once done, you'll receive a completion message.
        </p>
        
        <p>
          <em>Step 4: Payment</em>
          Finally, you’ll receive an official email from us that will take you to our payment portal. Complete your payment of $150 USD, and you're all set!
        </p>

        <p className="mb-0">
          <em>Step 5: Receive Your Second Opinion</em>
          Once your payment is complete, our premiere specialists will review your information and provide a comprehensive second opinion returned to the email address you provided. This way, you'll receive expert advice to help you make informed decisions about your health and avoid unnecessary procedures. Trust our team to give you the clarity and peace of mind you deserve.
        </p>
      </div>
    </section>
  )
}