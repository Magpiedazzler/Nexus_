import React from 'react'
import './ViewFeedback.css'
import { Link } from 'react-router-dom'

export default function ViewFeedback() {
  return (
    <div>
        
        <div class="div2" id='div2'>
            <section>
                <div class="container">
                    <div class="row">
                            <h2>Feedback</h2>
                            <div id='box3'>
                                <input type="text" id='vft1' value={'Account name'} readOnly/>
                                <input type="text" id='vft2' value={'Feedback Category'} readOnly/>
                                <Link to='../../admin/feedback'><input type="button" id='vfb1' value={'View Details'}/></Link>
                            </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
  )
}
