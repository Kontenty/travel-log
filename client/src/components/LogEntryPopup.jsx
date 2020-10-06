import React from 'react'
import css from "../style.module.scss"

const LogEntryPopup = ({ entry }) => {
  return (
    <div className={css.entryPopup}>
      <h2>{entry.title}</h2>
      <span className={css.rating}>{entry.rating}</span>
      <p>{entry.comments}</p>
      <img src={entry.image} alt="log entry" className="popup-img" />
      <span>{new Date(entry.visitDate).toLocaleDateString()}</span>
    </div>
  )
}

export default LogEntryPopup
