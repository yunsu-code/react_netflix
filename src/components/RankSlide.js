import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation} from 'swiper'
import React, { useState, useEffect  } from 'react';
import SlideLoading from './SlideLoading';
import axios from 'axios'
SwiperCore.use([Navigation])

export default function RankSlide( {handleClickOpen, request_url} ) {
    const [mv_data, setMovies] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [type, setType] = useState(null);
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
                setError(null);
                setMovies(null);
                setLoading(true);
                const res = await axios.get(
                    request_url
                );
                setMovies(res.data.results);
            } catch (e) {
                setError(e);
            }
            setTimeout(() => {
                setLoading(false);
            }, 1500);
        };
        fetchDatas();

        if(request_url.indexOf("tv?") !== -1) { setType("tv") } 
        else { setType("movie") }
        return () => setLoading(false); //router 이동시 메모리 lack 에러
    }, [request_url]);
    
    if (loading) return <SlideLoading />;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!mv_data) return null;
    
    const $movies_10 = mv_data.slice(0, 10);

    return (
        <section className="mv__con popular type1">
            <div className="con__title">
                <h3>오늘 TOP 10 영화</h3>
                <Link to="#" className="all-view">
                    <span className="all">모두보기</span>
                    <span className="ico-arrow-right"></span>
                </Link>
            </div>
            <Swiper {...swiper_option} className="swiper-container popular__swiper">
                {$movies_10.map(mv => (
                    <SwiperSlide className="swiper-slide" key={ mv.id } data-key={ mv.id } data-type={type} >
                        <Link to="#">
                            <div className="thumb">
                                <img src={ 'https://image.tmdb.org/t/p/w500' + mv.poster_path } alt={ mv.title } />
                            </div>
                        </Link>
                        <div className="hover_el" onClick={ handleClickOpen }>
                            <div className="thumb"><img src={ 'https://image.tmdb.org/t/p/original' + mv.backdrop_path } alt={ mv.title } /></div>
                            <div className="info-box">
                                <div className="title">{ mv.title }</div>
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
