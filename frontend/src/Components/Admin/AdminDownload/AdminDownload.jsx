import React, { useEffect, useState } from 'react'
import './AdminDownload.css'
import { useNavigate, useParams } from 'react-router-dom'
import { getReview, getSelectedAppsDetails } from '../../../Services/userApi';

export default function AdminDownload() {
  const appId=useParams().id
  const [selectedData, setSelectedData] = useState([]);
  const [reviewData, setReviewData] = useState([]);
  const navigate = useNavigate();
  const DownloadSelectedApp = (apkFile, appId) => {
      const fileUrl = `http://localhost:4000/img/${apkFile}`;
      const link = document.createElement("a");
      link.href = fileUrl;
      link.setAttribute("download", "");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  };
  useEffect(() => {
      getSelectedAppsDetails(appId).then((value) => {
          if (value?.data?.status) {
              setSelectedData(value?.data?.appData);
          }
      });
  }, []);

  useEffect(() => {
      getReview(appId).then((value) => {
          if (value?.data?.status) {
              setReviewData(value?.data?.reviewData);
          }
      });
  }, []);

  const renderStars = (rating) => {
      const fullStar = '★';
      const emptyStar = '☆';
      const maxStars = 5;

      const fullStars = Math.floor(rating);
      const emptyStars = maxStars - fullStars;

      if (isNaN(fullStars) || fullStars < 0 || fullStars > maxStars) {
          return null;
      }
      return (
        <>
            {[...Array(fullStars)].map((_, i) => (
                <span key={i} className="star">{fullStar}</span>
            ))}
            {[...Array(emptyStars)].map((_, i) => (
                <span key={i} className="star">{emptyStar}</span>
            ))}
        </>
    );
};

const calculateRatingDistribution = () => {
    const distribution = Array(5).fill(0);
    reviewData.forEach((review) => {
        if (review.ratingStatus >= 1 && review.ratingStatus <= 5) {
            distribution[review.ratingStatus - 1]++;
        }
    });
    return distribution;
};

const renderRatingProgressBars = () => {
    const distribution = calculateRatingDistribution();

    return distribution.reverse().map((count, index) => {
        const stars = 5 - index;
        return (
            <div key={index} className="star-rating">
                {renderStars(stars)}
                <span className="star-count"><p>({count})</p></span>
            </div>
        );
    });
};

const calculateAverageRating = () => {
    if (reviewData.length === 0) return 0;
    const totalRating = reviewData.reduce((sum, review) => sum + parseInt(review.ratingStatus), 0);
    return (totalRating / reviewData.length).toFixed(1);
};

const averageRating = calculateAverageRating();

  return (
    <div>
      <div className="div2" id='div2'>
                <section>
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6" id='second_div'>
                                <div align='center'>
                                    <img src={`http://localhost:4000/img/${selectedData?.appIcon}`} alt="Sample app icon" id='img111' />
                                </div><br />
                                <h3 id='head111' align='center'>{selectedData?.appName}</h3><br />
                                <h6 id='head222' align='center'>{selectedData?.publisherName}</h6><br />
                                <div className="appLogo" align="center">
                                    <button
                                        type="button"
                                        name=""
                                        id="btn2"
                                        onClick={() =>
                                            DownloadSelectedApp(
                                                selectedData?.apkFile,
                                                selectedData?._id
                                            )
                                        }
                                    >
                                        Download
                                    </button>
                                </div>
                                <div align='center' id='downloadcate'>
                                    <label htmlFor="" id='lab3' align='center'>{selectedData?.Category}</label>
                                </div>
                                <div align="center">
                                    <button id='btn555' align='center' onClick={() => navigate(`/rating/${selectedData?._id}`)}><i className="bi bi-award" id='flag'></i>Rate</button>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6" id='third_div'>
                                <div align='center' id='subdiv2'>
                                    <h4 id='divh'>Screen Shots</h4><br /><hr id='imghr' /><br />
                                    <img src={`http://localhost:4000/img/${selectedData?.appScreenshot}`} alt="Sample screen shots" id='img2' />
                                </div>
                                <div align='center' id='subdiv3'>
                                    <h4 id='divh'>Description</h4><br /><hr id='deschr' /><br />
                                    <p>{selectedData?.appDescription}</p>
                                </div>
                                <div align='center' id='subdivv'>
                                    <h4 id='divh'>Rating and Review</h4><br /><hr id='rathr' /><br />
                                    <div id="review-section">
                                    <div className="average-rating">
                                            <h5>Average Rating: {averageRating} ★</h5>
                                        </div>
                                        {renderRatingProgressBars()}
                                        {reviewData.length > 0 ? (
                                            reviewData.map((value, index) => (
                                                <div key={index} className="review">
                                                    <h6>{value?.username}</h6>
                                                    <div>{renderStars(value?.ratingStatus)}</div>
                                                    <p>{value?.ratingMessage}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No ratings</p>
                                        )}
                                    </div>
                                </div>
                                <div id='subdiv4'>
                                    <h4 id='divh1' align='center'>System Requirements</h4><br /><hr id='srhr' /><br />
                                    <ul>
                                        <li>Available on : {selectedData?.OS} OS</li>
                                        <li>Architecture : 64x</li>
                                        <li>Keyboard : yes</li>
                                        <li>Mouse : yes</li>
                                        <li>RAM : min 4 GB</li>
                                        <li>Storage Space : min 10 GB free</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
    </div>
  )
}
