import React from 'react';
import { useForm } from 'react-hook-form';

import css from '../style.module.scss';
import { addNewEntry } from '../API';

const LogEntryForm = ({ location, onAddEntry }) => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    data.latitude = location.lat;
    data.longitude = location.lng;
    console.log(data);
    try {
      const addedEntry = await addNewEntry(data);
      console.log(addedEntry);
      onAddEntry(addedEntry);
    } catch (error) {
      console.debug(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <legend>Add new log entry</legend>
      <div className={css.formFields}>
        <label htmlFor="title">Title</label>
        <div className={css.inputWrap}>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="title"
            ref={register({ required: true })}
            className={errors.title ? 'invalid' : ''}
          />
          {errors.title && (
            <span className={css.inputError}>This field is required</span>
          )}
        </div>
        <label htmlFor="rating">Rating</label>
        <div className={css.inputWrap}>
          <input
            type="number"
            name="rating"
            id="rating"
            placeholder="rating"
            ref={register({ min: 0, max: 10 })}
            className={errors.rating ? 'invalid' : ''}
          />
          {errors.rating && (
            <span className={css.inputError}>
              Rating must be between 0 and 10
            </span>
          )}
        </div>
        <label htmlFor="comments">Comments</label>
        <div className={css.inputWrap}>
          <textarea name="comments" id="comments" rows="3" ref={register} />
        </div>
        <label htmlFor="image">Image</label>
        <div className={css.inputWrap}>
          <input
            type="text"
            name="image"
            id="image"
            placeholder="image url"
            ref={register({ required: true })}
            className={errors.image ? 'invalid' : ''}
          />
          {errors.image && (
            <span className={css.inputError}>This field is required</span>
          )}
        </div>
        <label htmlFor="visitDate">Visit date</label>
        <div className={css.inputWrap}>
          <input
            type="date"
            name="visitDate"
            id="visitDate"
            ref={register({ required: true })}
            className={errors.visitDate ? 'invalid' : ''}
          />
          {errors.visitDate && (
            <span className={css.inputError}>This field is required</span>
          )}
        </div>
      </div>
      <button type="submit">Add entry</button>
    </form>
  );
};

export default LogEntryForm;
