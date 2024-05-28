import React from 'react'
import './AdminAppUpload.css'

export default function AdminAppUpload() {
  return (
    <div>
      <div class="div2" id='div2'>
    <section>
        <div class="container">
            <div class="row">
                    <h4 id='uh'>UPLOAD APPLICATION</h4>
                    <form onSubmit="" id='form3'>
                    <div className="container">
                      <div className="row">
                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6" id='basic'>
                          <h3>Basic Details</h3><br /><br />
                          <input type="text" name='appName' id='appname' placeholder='Application Name'/>
                          <br /><hr id='hr1_1'/><br />
                          <textarea name="appDescription" id="desc" cols="30" rows="10" placeholder='Description of the Application'></textarea>
                          <br /><hr id='hr2'/><br />
                          <input type="text" name="developerName" id="devname" placeholder='Developer name'/>
                          <br /><hr id='hr1'/><br />
                          <input type="text" name="publisherName" id="publname" placeholder='Publisher name'/>
                          <br /><hr id='hr1'/><br />
                          <select name="Category" id="category">
                          <option value="">Choose category</option>
                            <option value="Productivity">Productivity</option>
                            <option value="Social Networking">Social Networking</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Communication">Communication</option>
                            <option value="Education">Education</option>
                            <option value="Health and Fitness">Health and Fitness</option>
                            <option value="Travel">Travel</option>
                            <option value="Finance">Finance</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Game">Game</option>
                            <option value="Utilities">Utilities</option></select><br /><hr id='hr1'/><br />
                            <select name="OS" id="os">
                          <option value="">Choose OS</option>
                            <option value="Windows">Windows</option>
                            <option value="Linux">Linux</option>
                            <option value="MAC">MAC</option></select><br /><hr id='hr1'/><br />
                        </div>
                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6" id='basic1'>
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
