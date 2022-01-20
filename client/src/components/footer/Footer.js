import React from 'react'
import './footer.css'

export default function Footer() {
    return (
        <>
            <footer>
                <section id="footer" class="bg-dark text-white text-center py-4 ">
                    <div class="container ">
                        <div class="row  py-5  ">
                            <div class="col-lg-4 ">
                                <h4 class="text-italic text-white">Subscribe & Stay Updated</h4>
                                <form action="#" >
                                    <label class="sr-only" for="name">Name</label>
                                    <input type="text" placeholder="Enter Name" class="form-control form-control-lg mt-5 m-2 input " />
                                    <label class="sr-only" for="email">Email</label>
                                    <input type="email" placeholder="Enter Email" class="form-control form-control-lg  m-2 input" />
                                    <input type="submit" value="Subscribe" class="btn btn-outline-light form-control-lg m-2" />
                                </form>
                            </div>

                            <div id="contact" class="col-lg-4 col-md-6 py-5 py-lg-0">
                                <h3 class="text-italic text-white">Contacts</h3>
                                <p class=""> <i class="fas fa-map-marker-alt p-3 "></i>193 Anwarpur,Derai</p>
                                <p> <i class="fas fa-phone-alt  pr-2"></i>+8801789030141</p>

                            </div>

                            <div class="col-lg-4 col-md-6 py-3 py-md-5 py-lg-0">
                                <h3 class="text-italic text-white">Get Social</h3>
                                <p>Follow us to stay connected and receive instant updates.</p>
                                <div class="social-icon">
                                    <i class="fab fa-facebook-f  p-2  fa-2x rounded-circle"></i>
                                    <i class="fab fa-instagram  p-2  fa-2x  rounded-circle"></i>
                                    <i class="fab fa-twitter  p-2 fa-2x  rounded-circle"></i>
                                    <i class="fab fa-linkedin-in  p-2 fa-2x  rounded-circle"></i>
                                </div>
                            </div>

                        </div>

                        <section>

                        </section>

                    </div>
                    <div class="">
                        &copy; 2021
            </div>
                </section>
            </footer>
        </>
    )
}
