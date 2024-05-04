import {Component} from 'react'

import {format} from 'date-fns'

import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

import './index.css'

const initialAppoitmentList = []

class Appointments extends Component {
  state = {
    appointmentsList: initialAppoitmentList,
    title: '',
    date: '',
    isFilterActive: false,
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const formattedDate = date
      ? format(new Date(date), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppoitment = {
      id: uuidv4(),
      date: formattedDate,
      isStarred: false,
      title,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppoitment],
      title: '',
      date: '',
    }))
  }

  onChangeName = event => {
    this.setState({
      title: event.target.value,
    })
  }

  onChangeDate = event => {
    this.setState({
      date: event.target.value,
    })
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppoitment => {
        if (id === eachAppoitment.id) {
          return {...eachAppoitment, isStarred: !eachAppoitment.isStarred}
        }
        return eachAppoitment
      }),
    }))
  }

  getFilteredAppointmentsList = () => {
    const {appointmentsList, isFilterActive} = this.state
    if (isFilterActive) {
      return appointmentsList.filter(
        eachAppoitment => eachAppoitment.isStarred === true,
      )
    }
    return appointmentsList
  }

  onClickFilter = () => {
    const {isFilterActive} = this.state
    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  render() {
    const {title, date, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
    const FilteredAppointmentsList = this.getFilteredAppointmentsList()
    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="appointments-img-container">
            <form className="form-container" onSubmit={this.onAddAppointment}>
              <h1 className="title">Add Appointment</h1>
              <label htmlFor="title" className="label">
                TITLE
              </label>
              <input
                id="title"
                type="text"
                className="input-element"
                placeholder="Title"
                onChange={this.onChangeName}
                value={title}
              />
              <label htmlFor="date" className="label">
                DATE
              </label>
              <input
                type="date"
                className="input-element"
                id="date"
                onChange={this.onChangeDate}
                value={date}
              />
              <button className="add-btn" type="submit">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointments-img"
            />
          </div>

          <div className="appointments-container">
            <hr />
            <div className="appointments-starred-container">
              <h1 className="appointments-heading">Appointments</h1>
              <button
                className={`starred-btn ${filterClassName}`}
                type="button"
                onClick={this.onClickFilter}
              >
                Starred
              </button>
            </div>
            <ul className="appointment-lists-container">
              {FilteredAppointmentsList.map(eachAppoitment => (
                <AppointmentItem
                  key={eachAppoitment.id}
                  appointmentDetails={eachAppoitment}
                  toggleIsStarred={this.toggleIsStarred}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
