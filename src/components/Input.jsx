import React from 'react'

function Input(props) {
  return (
    <div id="input-div" class="right">
        
        <form onSubmit={props.handleSubmit}>
        <input name="zipcode" placeholder="Enter Zip Code"
          onChange={props.handleChange}
        />
          <input type="submit"/>
        </form>
  </div>
  )
}

export default Input;