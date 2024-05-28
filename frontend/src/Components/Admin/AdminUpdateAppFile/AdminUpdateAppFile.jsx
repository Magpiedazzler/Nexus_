import React from 'react'
import './AdminUpdateAppFile.css'

export default function AdminUpdateAppFile() {
  return (
    <div>
      <div class="div2" id='div2'>
    <section>
        <div class="container">
            <div class="row">
                    <h4 id='uh'>Update APPLICATION</h4>
                    <form onSubmit="" id='form3'>
                    <div className="container">
                          <h3>Upload files</h3><br /><br />
                          <label id='upbtn-label1'>Upload app icon </label><br />
                          <div className="uploadButtons">
                            <input type="file"  name='appIcon' id='upbtn1'/><br /><br />
                          </div><br />
                          <label id='upbtn-label1'>upload sample screenshots</label><br />
                          <div className='uploadButtons'>
                            <input type="file" name='appScreenshots' id='upbtn2'/><br /><br />
                          </div><br />
                          <label id='upbtn-label1'>Choose app file</label><br />
                          <div className='uploadButtons'>
                            <input type="file" name='appfile' id='upbtn3'/><br /><br />
                          </div>
                    </div>
                    <input type="submit" id="subbtn" />
                    </form>
            </div>
        </div>
    </section>
        </div>
    </div>
  )
}
