import React, { useEffect, useState } from 'react';
import './Rating.css';
import * as Yup from "yup";
import { getSelectedAppsDetails, sendRating } from '../../../Services/userApi';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';

export default function Rating() {
    const appId = useParams().appId;
    const [selectedStatus, setSelectedStatus] = useState("");
    const [appDetails, setAppDetails] = useState({});
    const userId = useSelector((state) => state?.user?.value?._id);
    const navigate = useNavigate();

    useEffect(() => {
        getSelectedAppsDetails(appId).then((value) => {
            setAppDetails(value?.data?.appData);
        });
    }, []);

    const handleStatusChange = (status, event) => {
        event.preventDefault();
        setSelectedStatus(status);
    };

    const initialValues = {
        ratingMsg: "",
    };

    const validationSchema = Yup.object({
        ratingMsg: Yup.string()
            .min(3, "* Comments must be at least 3 characters long")
    });

    const onSubmit = async (values, { resetForm }) => {
        const { data } = await sendRating(selectedStatus, values, userId, appId);
        if (data.status) {
            setSelectedStatus("");
            toast.success(data.message);
            navigate("/");
        } else {
            setSelectedStatus("");
            toast.error(data.message);
        }
        resetForm();
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });

    return (
        <div>
            <div className="div2" id="div2">
                <section>
                    <div className="container">
                        <div className="row">
                            <h1 id="rh">App Report</h1>
                            <form onSubmit={formik.handleSubmit} id="rbox">
                                <div>
                                    <img src={`http://localhost:4000/img/${appDetails?.appIcon}`} alt="Sample app icon" id="img1" />
                                </div><br />
                                <input type="text" id="rtext" value={appDetails?.appName} readOnly /><br /><br />
                                <div id="feedback-buttonsss">
                                    <button id="fb1" className={selectedStatus === "1" ? "selected" : "notSelected"}
                                        onClick={(event) => handleStatusChange("1", event)}>
                                        <i className="bi bi-emoji-tear"></i></button>
                                    <button id="fb2" className={selectedStatus === "2" ? "selected" : "notSelected"}
                                        onClick={(event) => handleStatusChange("2", event)}>
                                        <i className="bi bi-emoji-frown"></i></button>
                                    <button id="fb3" className={selectedStatus === "3" ? "selected" : "notSelected"}
                                        onClick={(event) => handleStatusChange("3", event)}>
                                        <i className="bi bi-emoji-neutral"></i></button>
                                    <button id="fb4" className={selectedStatus === "4" ? "selected" : "notSelected"}
                                        onClick={(event) => handleStatusChange("4", event)}>
                                        <i className="bi bi-emoji-smile"></i></button>
                                    <button id="fb5" className={selectedStatus === "5" ? "selected" : "notSelected"}
                                        onClick={(event) => handleStatusChange("5", event)}>
                                        <i className="bi bi-emoji-laughing"></i></button>
                                </div>
                                {selectedStatus === "" ? (
                                    <p className="text-danger errorMsg">{formik.errors.status}</p>
                                ) : null}
                                <br /><br />
                                <textarea name="ratingMsg" id="rt" cols="30" rows="10" placeholder="Share your experience with this app..."
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.ratingMsg}></textarea>
                                {formik.touched.ratingMsg && formik.errors.ratingMsg ? (
                                    <p className="text-danger errorMsg" style={{ fontSize: "12px", margin: "0px", position: "relative", top: "-80px", left: "-280px" }}>
                                        {formik.errors.ratingMsg}
                                    </p>
                                ) : null}<br /><br />
                                <button id="rbtn">Send</button>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
