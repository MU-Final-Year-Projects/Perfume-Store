import React, { useState } from 'react'
import './popular-product.css'
import { SliderData } from './SliderData'


const Popular_Product = ({ slides }) => {


    const [current, setCurrent] = useState(0);

    const length = slides.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    if (!Array.isArray(slides) || slides.length <= 0) {
        return null;
    }



    return (
        <div className="row container-fluid">
            <div className='slider col'>

                <biv className='left-arrow' onClick={prevSlide} ><i class="fas fa-chevron-right"></i> </biv>
                < biv className='right-arrow' onClick={nextSlide} ><i class="fas fa-chevron-left"></i> </biv>
                {SliderData.map((slide, index) => {
                    return (
                        <div
                            className={index === current ? 'slide active' : 'slide'}
                            key={index}
                        >
                            {index === current && (
                                <div className=" ">
                                    <img src={slide.image} alt='travel image' className='image ' />
                                </div>
                            )}
                        </div>
                    );
                })}




            </div>

            <div className='col des '>
                <p className="pb-4 pp">POPULAR PRODUCT</p>
                {SliderData.map((slide, index) => {
                    return (
                        <div>

                            {index === current && (
                                <div>
                                    <h1 class="badge badge-pill mb-4 p-4">{slide.id}</h1>
                                    <h2><i>{slide.title}</i></h2>
                                    <p className="fs-4">{slide.by}</p>
                                    <p>{slide.des}</p>
                                </div>


                            )}
                        </div>



                    );

                })}

            </div>

        </div>
    )
}

export default Popular_Product;