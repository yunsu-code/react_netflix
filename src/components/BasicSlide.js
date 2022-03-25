import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation} from 'swiper'
import React, { useState, useEffect  } from 'react';
import axios from 'axios'

import SlideLoading from './SlideLoading';
SwiperCore.use([Navigation])

function BasicSlide( {category_title, request_url, ClickOpen} ) {
    const [mv_data, setMovies] = useState(null); //데이터
    const [loading, setLoading] = useState(false); //로딩중일때
    const [error, setError] = useState(null); //에러시
    const navigationPrevRef = React.useRef(null)
    const navigationNextRef = React.useRef(null)
    
    const swiper_option = {
        slidesPerView : 2,
        spaceBetween : 10,
        slidesPerGroup : 6,
        pagination : false,
        loop : false,
        navigation: {
            prevEl : navigationPrevRef.current,
            nextEl : navigationNextRef.current,
        },
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
        onSwiper : (swiper) => {
            setTimeout(() => {
                swiper.params.navigation.prevEl = navigationPrevRef.current
                swiper.params.navigation.nextEl = navigationNextRef.current
                
                swiper.navigation.destroy()
                swiper.navigation.init()
                swiper.navigation.update()
            })
        }
    }

    useEffect(() => {
        const fetchDatas = async () => {
            try {
                // 요청이 시작 할 때에는 error 와 users 를 초기화하고
                setError(null);
                setMovies(null);
                // loading 상태를 true 로.
                    setLoading(true)
                const res = await axios.get(
                    'https://api.themoviedb.org/3/' + request_url
                    );
                    setMovies(res.data.results); // 데이터는 res.data 안에.
                } catch (e) {
                    setError(e);
                }
                setTimeout(() => {
                    setLoading(false);
                }, 1500);
            };
        fetchDatas();
    }, [request_url]);
    
    if (loading) return <SlideLoading />;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!mv_data) return null;
    
    return (
        <section className="mv__con">
            <div className="con__title">
                <h3>{category_title}</h3>
                <Link to="#" className="all-view">
                    <span className="all">모두보기</span>
                    <span className="ico-arrow-right"></span>
                </Link>
            </div>
            <Swiper {...swiper_option} className="swiper-container popular__swiper">
                {mv_data.map(mv => (
                    <SwiperSlide className="swiper-slide" key={ mv.id }>
                        <Link to="#">
                            <div className="thumb">
                                <img src={ `https://image.tmdb.org/t/p/original` + mv.backdrop_path } alt={ mv.title } />
                            </div>
                        </Link>
                        <div className="hover_el" onClick={ClickOpen}>
                            <div className="thumb"><img src={ `https://image.tmdb.org/t/p/original` + mv.backdrop_path } alt={ mv.title } /></div>
                            <div className="info-box">
                                <div className="title">{ mv.title || mv.name }</div>
                                <div className="btn-wrap">
                                    <button type="button" className="ico-play circle tooltip"><div className="tooltip-box type2">재생</div></button>
                                    <button type="button" className="ico-add circle tooltip"><div className="tooltip-box type2">내가 찜한 콘텐츠에 추가</div></button>
                                    <button type="button" className="ico-like circle tooltip"><div className="tooltip-box type2">좋아요</div></button>
                                    <button type="button" className="ico-dislike circle tooltip"><div className="tooltip-box type2">맘에 안들어요</div></button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
                <button className="swiper-btn prev" slot="button-prev" ref={navigationPrevRef}></button>
                <button className="swiper-btn next" slot="button-next" ref={navigationNextRef}></button>
            </Swiper>
        </section>
    );
}

export default BasicSlide;