import React from 'react'
import './About.css'
import coverImage from './Designer.png';
import { Link } from "react-router-dom"

export default function About() {
    return (
        <div>
            <div id='about'>
                <h1>About US</h1>
                <Link to='../home'><i class="bi bi-x-circle"></i></Link>
            </div>

            <section id='aboutsection1'>
                <div>
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6" id='about1'>
                                <p>Welcome to NEXUS, your ultimate destination for cross-platform applications tailored for desktops.
                                    Whether you are a Windows, macOS, or Linux user, NEXUS brings a world of innovative and essential
                                    apps right to your fingertips.</p><br /><br /><hr id='abouthr1' />
                                <h3>Our Mission</h3><br />
                                <p>At NEXUS, our mission is to bridge the gap between different desktop operating systems by offering a seamless, unified platform for discovering,
                                    downloading, and managing applications.
                                    We believe in providing users with the best software experience, regardless of their chosen OS.</p>
                            </div>
                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6" id='about2'>
                                <img src={coverImage} alt="Cover image" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id='aboutsection2'>
                <div>
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6" id='about3'>
                                <h3>What We Offer</h3><br />
                                <ul>
                                    <li><b>Diverse App Selection:</b> From productivity tools to creative software, from security utilities to entertainment applications, NEXUS offers a wide array of high-quality apps to meet all your needs.</li>
                                    <li><b>Cross-Platform Compatibility:</b> We ensure that all our applications are compatible across Windows, macOS, and Linux, providing a consistent experience no matter what system you use.</li>
                                    <li><b>Curated Content:</b> Our team meticulously selects and curates apps to ensure that you get access to reliable and top-rated software.</li>
                                    <li><b>Easy Navigation:</b> Our intuitive interface makes it simple to find and install the apps you need, with smart recommendations and user reviews to guide your choices.</li>
                                    <li><b>Security & Trust:</b> We prioritize your safety by implementing rigorous security checks and ensuring that all apps are verified and free from malware.</li>
                                </ul>
                            </div>
                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6" id='about4'>
                                <h3>Why Choose NEXUS?</h3><br />
                                <ul>
                                    <li><b>Unified Experience:</b> Enjoy the convenience of a single app store for all your desktop devices.</li>
                                    <li><b>Expert Curation:</b> Benefit from our expertise with a selection of only the best and most reliable applications.</li>
                                    <li><b>Community Driven:</b> Join a community of like-minded users and developers, sharing reviews, tips, and support.</li>
                                    <li><b>Constant Innovation:</b> Stay ahead with the latest software updates and innovations in the app world.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id='aboutsection3'>
                <div>
                    <h3 id='abouth1'>Join Us</h3><br />
                    <p>
                        Become a part of the NEXUS community today and transform your desktop experience. Discover new possibilities,
                        enhance your productivity, and enjoy the best apps the world has to offer, all in one place.
                    </p>
                    <marquee behavior="scroll" direction="left" scrollamount="10"><p id='aboutp1'>Thank you for choosing NEXUS, where quality meets convenience.</p></marquee>
                </div>
            </section>
            <footer id='footerabout1'>
                <div>
                    <h2>Contact Us</h2>
                    <ul>
                        <li><i class="bi bi-envelope-at"></i> nexusofficial@gmail.com</li>
                        <li><i class="bi bi-facebook"></i> NEXUS_app_store</li>
                        <li><i class="bi bi-instagram"></i> NEXUS</li>
                        <li><i class="bi bi-whatsapp"></i> 8943993705</li>
                    </ul>
                </div>
            </footer>
        </div>
    )
}
