import React from 'react'
import './LinuxApps.css'

export default function LinuxApps() {
  return (
    <div>
      <div id='div2'>
      <div id='anav1'>
                    <input type="text" id='hsearch' placeholder='Search..'/>
                    <button id='hsearchicon'><i class="bi bi-search" id='hsearch1'></i></button>
            </div>
            <h2 id='th2'>Apps for Linux</h2>
            
            <table class="table table-striped table-hover" id='tlinux'>
                <thead>
                    <tr>
                    <th scope="col">SL.No</th>
                    <th scope="col">Icon</th>
                    <th scope="col">App Name</th>
                    <th scope="col">Category</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">1</th>
                    <td><img id='timg' src="" alt="App icon" /></td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}
