import React from 'react'
import './ForgotPassword.css'

export default function ForgotPassword() {
  return (
    <div>
      <form onSubmit="" id="fform1">
      <h1 id='t1'>Forgot Password</h1><br /><br />
      <input type="text" name="username" id="username" placeholder='email'/>
      <br /><hr id='line'/><br />
      <select name="secretQuestion" id="qsn" placeholder='Secret Question'>
      <option value="Choose Question">Choose Question</option>
        <option value="Who was your childhood hero?">Who was your childhood hero?</option>
        <option value="What was your first job?">What was your first job?</option>
        <option value="What was the name of your first pet?">What was the name of your first pet?</option>
        <option value="What was your Birth place?">What was your Birth place?</option>
      </select>
      <br /><hr id='line'/><br />
      <input type="text" name="answer" id="ans" placeholder='Answer'/>
      <br /><hr id='line'/><br />
      <input type="password" name="password" id="pswd" placeholder='Password'/>
      <br /><hr id='line'/><br />
      <input type="ConfirmPassword" name="password" id="cpswd" placeholder='Confirm Password'/>
      <br /><hr id='line'/><br />
      <button id="submit">Submit</button><br/>
      </form>
    </div>
  )
}
