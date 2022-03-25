// import React, { useState, useEffect } from 'react';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import axios from 'axios'

function RandomMain() {
    const { data, loading, error } = useSelector(state => state.posts.posts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch();
    }, [dispatch]);
    
    // const [mv_data, setMovies] = useState(null); //데이터
    // const [loading, setLoading] = useState(false); //로딩중일때
    // const [error, setError] = useState(null); //에러시

    // useEffect(() => {
    //     const fetchDatas = async () => {
    //         try {
    //             // 요청이 시작 할 때에는 error 와 users 를 초기화하고
    //             setError(null);
    //             setMovies(null);

    //             // loading 상태를 true 로 바꿉니다.
    //             setLoading(true);

    //             const res = await axios.get(
    //             'https://api.themoviedb.org/3/movie/popular?api_key=679db3d03f27f5e2b0684e936ccc0774&language=ko-KR&page=1'
    //             );
    //             setMovies(res.data.results); // 데이터는 res.data 안에.
                
    //         } catch (e) {
    //             setError(e);
    //         }
    //         setLoading(false);
    //         var main = document.querySelector(".home-main")
    //         main.classList.add("load") 
    //     };
    //     fetchDatas();
    // }, []);
    
    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!data) return null;
    
    const num = data.length;
    const randIndex = Math.floor(Math.random() * num);
    const $random = data[randIndex];

    const $id = $random.id
    const $title = $random.title
    const $overview = $random.overview
    const $backdrop = `https://image.tmdb.org/t/p/original` + $random.backdrop_path

    return (
        <div className="home-main">
            <div className="container">
                <div className="background">
                    <img src={ $backdrop } alt={ $title } />
                    <video className="main-video" muted preload="metadata" poster={ $backdrop }>
                        <source src="../../assets/video/main_video.mp4" type="video/mp4" />
                        <span className="blind">{ $title } 예고편 비디오</span>
                    </video>
                    <button type="button" className="ico-mute sound-btn circle"><span className="blind">소리 버튼</span></button>
                </div>
                <div className="main-contents">
                    <div className="article">
                        <div className="title">{ $title }</div>
                        <p className="plot">{ $overview }</p>
                    </div>
                    <div className="btn-wrap">
                        <button type="button" className="basic play-btn mgr10">재생</button>
                        <button type="button" className="basic info-btn" data-id={ $id } data-type="movie" >상세보기</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RandomMain;
