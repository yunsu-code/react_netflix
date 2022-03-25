import { Swiper, SwiperSlide } from "swiper/react";
import bg from '../assets/img/bg.jpg';
import React from 'react';


function SlideLoading() {

    const swiper_option = {
        slidesPerView : 2,
        slidesPerGroup : 6,
        pagination : false,
        loop : false,
        breakpoints : {
            680 : {
                slidesPerGroup: 3,
                slidesPerView: 3,
            },
            1240: {
                slidesPerGroup: 6,
                slidesPerView: 6,
            },
        },
        observer : true,
        observeParents : true,
    }

    return (
        <section className="mv__con">
            <Swiper {...swiper_option} className="swiper-container">
                <SwiperSlide className="swiper-slide loading">
                    <div className="thumb">
                        <img className="bg" src={ bg } alt="background" />
                    </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide loading">
                    <div className="thumb">
                        <img className="bg" src={ bg } alt="background" />
                    </div>
                </SwiperSlide>            
                <SwiperSlide className="swiper-slide loading">
                    <div className="thumb">
                        <img className="bg" src={ bg } alt="background" />
                    </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide loading">
                    <div className="thumb">
                        <img className="bg" src={ bg } alt="background" />
                    </div>
                </SwiperSlide>
            </Swiper>
        </section>
    )
}
export default SlideLoading;