import React from 'react';
import css from '../style.module.scss';

const LogEntryPopup = ({ entry }) => {
  return (
    <>
      <span className={css.rating}>{entry.rating}</span>
      <div className={css.entryPopup}>
        <h2>{entry.title}</h2>
        <p>{entry.comments}</p>
        <img src={entry.image} alt="log entry" className="popup-img" />
        <small>{new Date(entry.visitDate).toLocaleDateString()}</small>
      </div>
    </>
  );
};

export default LogEntryPopup;
