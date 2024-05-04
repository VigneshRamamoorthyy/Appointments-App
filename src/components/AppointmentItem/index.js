import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsStarred} = props
  const {id, title, date, isStarred} = appointmentDetails

  const starImgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStarredItem = () => {
    toggleIsStarred(id)
  }

  return (
    <li className="appointment-list">
      <div className="appointment-container">
        <div className="name-time-container">
          <p className="appointment-name">{title}</p>
          <p className="time">Date {date}</p>
        </div>
        <button
          className="star-btn"
          type="button"
          data-testid="star"
          onClick={onClickStarredItem}
        >
          <img src={starImgUrl} className="star-img" alt="star" />
        </button>
      </div>
    </li>
  )
}

export default AppointmentItem
