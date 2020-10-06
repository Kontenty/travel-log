import React from 'react'
import { useState } from 'react'
import css from "../style.module.scss"

const initialState = {
  title: "",
  rating: "",
  comments: "",
  image: "",
  visitDate: "",
}

const LogEntryForm = ({ lngLat }) => {
  const [formData, setFormData] = useState(initialState)

  const handleInput = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = { ...formData, latitude: lngLat.lat, longitude: lngLat.lng }
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={css.formFields}>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" placeholder="title" value={formData.title} onChange={handleInput} />
        <label htmlFor="rating">Rating</label>
        <input type="text" name="rating" id="rating" placeholder="rating" value={formData.rating} onChange={handleInput} />
        <label htmlFor="comments">Comments</label>
        <textarea name="comments" id="comments" rows="3" value={formData.comments} onChange={handleInput} />
        <label htmlFor="image">Image</label>
        <input type="text" name="image" id="image" placeholder="image url" value={formData.image} onChange={handleInput} />
        <label htmlFor="visitDate">Visit date</label>
        <input type="date" name="visitDate" id="visitDate" value={formData.visitDate} onChange={handleInput} />
      </div>
      <button type="submit">Add entry</button>
    </form>
  )
}

export default LogEntryForm
