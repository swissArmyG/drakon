import { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContext, NotificationContext, PatientContext } from "../../contexts"
import { FadedBgButton } from "../Buttons"
import { updatePatient } from '../../api/patients' 

export const ConfirmEmailChange = () => {
  const { userData } = useContext(AuthContext)
  const { patientProfile, setPatientProfile } = useContext(PatientContext)
  const { setNotification } = useContext(NotificationContext)
  const navigate = useNavigate()
  const location = useLocation()
  const { state } = location
  const { email } = state

  const _updatePatient = async() => {
    try {
      await updatePatient({
        patientId: patientProfile.id,
        payload: patientProfile
      })
      setPatientProfile(undefined)
      navigate("/")
    } catch (err) {
      setNotification({
        typpe: "error",
        message: "Something went wrong. We are unable to update your information at the moment. Please try again later."
      })
    }
  }

  const returnPreviousEmail = () => {
    setPatientProfile({ ...patientProfile, email: userData.email })
    navigate(-1)
  }
  
  return (
    <section className={`ConfirmEmailChange --background`}>
      <div className="--container ">
        <p>(<em>{`${email}`}</em>) is a new and different email than the one you provided on our existing record. Using this email will also <i>change the email you use for login.</i> Would you like to continue with the new email ?</p>

        <div className="--action-container">
          <FadedBgButton
            buttonText={"Use the new email"}
            buttonTextPosition={'24%'}
            width={"400px"}
            onClick={(e) => {
              e.preventDefault()
              patientProfile && _updatePatient()
            }}
          />
          
          <span className="--button --button-text" onClick={() => returnPreviousEmail()}>
            <i className="fa-solid fa-arrow-left-long" />
            {`Use the old email ${userData?.email || ""}`}
          </span>
        </div>
      </div>
    </section>
  )
}