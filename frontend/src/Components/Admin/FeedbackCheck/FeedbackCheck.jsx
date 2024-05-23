import React, { useEffect, useState } from 'react'
import './FeedbackCheck.css'
import { useParams } from 'react-router-dom'
import { fetchFeedDetails, sendComments } from '../../../Services/adminApi'
import { toast } from 'react-toastify'

export default function FeedbackCheck() {
    const [feedback,setFeedback]=useState([])
    const [comment,setComment]=useState("")
    const {id:feedId}=useParams()
    useEffect(()=>{
        fetchFeedDetails(feedId).then((value)=>{
            if(value?.data?.status){
                setFeedback(value?.data?.data)
            }
        })
    },[feedId])

    const handleCommentChange = (event) => {
        setComment(event.target.value);
      };
    
      const handleSubmit = () => {
        if (comment.trim() === "") {
            toast.error("Comment cannot be empty");
          return;
        }

        sendComments(comment,feedback?._id,feedback?.userId?._id).then((value)=>{
            if(value?.data?.status){
                toast.success(value?.data?.message);
                setComment("");
            }else{
                toast.error(value?.data?.message);
            }
        })
    };

  return (
    <div>
        
        <div class="div2" id='div2'>
            <section>
                <div class="container">
                    <div class="row">
                            <h2>Feedback</h2>
                            <div id='fcbox'>
                                <label htmlFor="" id='fcl'>User Name:{" "} </label>
                                <input type="text" id='fct1' value={feedback?.userId?.username} readOnly/><br/><br />
                                <label htmlFor="" id='fcl'>Reaction about the store:{" "}</label>
                                <input type="text" id='fct2' value={feedback?.feedbackStatus} readOnly/><br/><br />
                                <label htmlFor="" id='fcl'>Feedback Category:{" "}</label>
                                <input type="text" id='fct3' value={feedback?.category} readOnly /><br /><br />
                                <label htmlFor="" id='fcl'>User Feedback: {feedback?.feedbackComment}</label><br />
                                <textarea name="" id="fct4" cols="30" rows="10" readOnly></textarea><br /><br />
                                <textarea name="" id="fct5" cols="30" rows="10" placeholder='Leave comments' value={comment} onChange={handleCommentChange}></textarea><br /><br />
                                <button id='fcb1' onClick={handleSubmit}>Submit</button>
                            </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
  )
}
