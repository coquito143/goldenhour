import React from 'react'

function Input(props) {
  return (
    <div id="input-div">
        <h2>Enter Zip Code</h2>
        <form onSubmit={props.handleSubmit}>
        <input name="zipcode" placeholder="Zip Code"
          onChange={props.handleChange}
        />
          <input type="submit"/>
        </form>
  </div>
  )
}

export default Input;