import React, { useRef } from 'react';
import './Banner.css';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { bannerUpload } from '../../../Services/adminApi';

export default function Banner() {
    const supportedImageExtentionRegex = /\.(jpg|jpeg|png|avif)$/i;
    const userIdentity = useSelector((state) => state?.user?.value?._id);
    const imageInputRef = useRef(null);
    const imagePreviewRef = useRef(null);

    const initialValues = {
        bannerFile: ""
    };

    const validationSchema = Yup.object({
        bannerFile: Yup.mixed().required('* This field is required')
    });

    const onSubmit = async (values, { resetForm }) => {
        const { data } = await bannerUpload(values, userIdentity);
        if (data?.status) {
            resetForm();
            if (imageInputRef.current) {
                imageInputRef.current.value = "";
            }
            if (imagePreviewRef.current) {
                imagePreviewRef.current.src = "";
            }
            toast.success(data?.message);
        } else {
            toast.error(data?.message);
        }
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });

    const handleFileChange = (event) => {
        const file = event.currentTarget.files[0];
        formik.setFieldValue("bannerFile", file);
        if (file && imagePreviewRef.current) {
            const fileUrl = URL.createObjectURL(file);
            imagePreviewRef.current.src = fileUrl;
        }
    };

    return (
        <div>
            <div className="div2" id="div2">
                <section>
                    <div className="container">
                        <div className="row">
                            <h4 id="uh">Update APPLICATION</h4>
                            <form onSubmit={formik.handleSubmit} id="form3">
                                <div className="container">
                                    <h3>Upload Banner</h3><br /><br />
                                    <label id="upbtn-label1">Upload app banner </label><br />
                                    <div className="uploadButtons">
                                        <input
                                            type="file"
                                            name="bannerFile"
                                            id="upbtn1"
                                            ref={imageInputRef}
                                            onBlur={formik.handleBlur}
                                            onChange={handleFileChange}
                                        /><br />
                                        {formik.touched.bannerFile && formik.errors.bannerFile ? (
                                            <p className="text-danger errorMsg" style={{ fontSize: "12px", margin: "0px" }}>{formik.errors.bannerFile}</p>
                                        ) : null}
                                        <br />
                                    </div><br />
                                    <div className="Demo">
                                        <img ref={imagePreviewRef} alt="Banner Demo" className="d-block w-100" />
                                    </div><br />
                                </div>
                                <input type="submit" id="subbtn" />
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
