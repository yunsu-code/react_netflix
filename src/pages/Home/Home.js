import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import RankSlide from "../../components/RankSlide";
import RandomMain from "../../components/RandomMain";
import BasicSlide from './../../components/BasicSlide';
import MoviePopup from "../../components/MoviePopup";
import axios from 'axios'
import bg from '../../assets/img/bg_dark.jpg';
import "./home.scss";

const key = '679db3d03f27f5e2b0684e936ccc0774'
const mv_genres = {
    action : 28,
    adventure : 12,
    animation : 16,
    comedy : 35,
    crime : 80,
    documentary : 99,
    drama : 18,
    family : 10751,
    fantasy : 14,
    history : 36,
    horror : 27,
    music : 10402,
    mystery : 9648,
    romance : 10749,
    sf : 878,
    tvmovie : 10770,
    thriller : 53,
    war : 10752,
    Western : 37,
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Home() {
    const [open, setOpen] = useState(false);
    const [mv_id, setKey] = useState(null);
    const [title, setTitle] = useState(null);
    const [backdrop, setBackdrop] = useState(bg);
    const [overview, setOverview] = useState(null);
    const [date, setDate] = useState(null);
    const [lang, setLang] = useState(null);
    const [genre, setGenre] = useState([]);
    const [actor, setActor] = useState([]);

    const handleClickOpen = (e) => {
        setOpen(true);
        const mv_id = e.target.closest(".swiper-slide, .home-main").getAttribute('data-key')
        const mv_type = e.target.closest(".swiper-slide, .home-main").getAttribute('data-type')
        setKey(mv_id)
        const root = mv_type + '/' + mv_id + '?api_key=' + key + '&language=ko-KR'
        const actor_root = mv_type + '/' + mv_id + '/credits?api_key=' + key + '&language=ko-KR'

        axios.all([axios.get(root), axios.get(actor_root)])
        .then(
            axios.spread((...res) => {
                const res1 = res[0];
                const res2 = res[1];
                const mv = res1.data;
                const actor = res2.data.cast;
                const actor_5 = actor.slice(0, 5);

                setTitle(mv.title || mv.name)
                setBackdrop('https://image.tmdb.org/t/p/original' +  mv.backdrop_path)
                setOverview( mv.overview)
                setDate(mv.release_date)
                setLang(mv.original_language)
                    
                const genreArray = []
                const actorArray = []
                for (var i = 0; mv.genres.length > i; i++ ) {
                    genreArray.push(mv.genres[i].name)
                }
                setGenre(genreArray);

                for (var a = 0; actor_5.length > a; a++ ) {
                    actorArray.push(actor_5[a].name)
                }
                setActor(actorArray);
            })
        )
    };
        
    const handleClose = () => {
        setOpen(false);
        setTitle(null)
        setBackdrop(bg)
        setOverview( null)
        setDate(null)
        setLang(null)
        setGenre([])
        setActor([])
    };
    return (
        <div id="content" className='home'>
            <RandomMain handleClickOpen = {handleClickOpen} />
            <div className="mv_con_wrap">
                <RankSlide handleClickOpen = {handleClickOpen} request_url={'movie/popular?api_key=679db3d03f27f5e2b0684e936ccc0774&language=ko-KR&page=1'} />
                <BasicSlide handleClickOpen = {handleClickOpen} category_title={"곧 개봉예정"} request_url={'movie/upcoming?api_key=' + key + '&language=ko-KR&page=1'} />
                <BasicSlide handleClickOpen = {handleClickOpen} category_title={"넷플릭스 오리지널"} request_url={'discover/tv?api_key=' + key + '&with_networks=213&language=ko-KR'} />
                <BasicSlide handleClickOpen = {handleClickOpen} category_title={"판타지 영화"} request_url={'discover/movie?api_key=' + key + '&with_genres=' + mv_genres.fantasy + '&language=ko-KR'} />
                <BasicSlide handleClickOpen = {handleClickOpen} category_title={"스릴러 영화"} request_url={'discover/movie?api_key=' + key + '&with_genres=' + mv_genres.thriller + '&language=ko-KR'} />
                <BasicSlide handleClickOpen = {handleClickOpen} category_title={"로맨스 영화"} request_url={'discover/movie?api_key=' + key + '&with_genres=' + mv_genres.romance + '&language=ko-KR'} />
                <BasicSlide handleClickOpen = {handleClickOpen} category_title={"호러 영화"} request_url={'discover/movie?api_key=' + key + '&with_genres=' + mv_genres.horror + '&language=ko-KR'} />
            </div>
            <div>
                <Dialog 
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                >
                    <MoviePopup 
                    handleClose = {handleClose} 
                    mv_id ={mv_id} 
                    title ={title} 
                    backdrop ={backdrop} 
                    overview ={overview} 
                    date ={date} 
                    lang ={lang} 
                    genre ={genre} 
                    actor ={actor} 
                    />
                </Dialog>
            </div>
        </div>
    )
};

