import React from 'react';
import RandomMain from "../../components/RandomMain";
// import RankSlide from "../../components/RankSlide";
// import BasicSlide from "../../components/BasicSlide";
// import PopupContent from "../../components/PopupContent";
import TestSlide from "../../components/TestSlide";
import Dialog from '@mui/material/Dialog';
import TestPopup from "../../components/TestPopup";
import Slide from '@mui/material/Slide';
import "./home.scss";

// const html = document.getElementsByTagName("html")[0]
const key = '679db3d03f27f5e2b0684e936ccc0774'
const genre = {
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

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    return (
        <div id="content" className='home'>
            <RandomMain />
            <div className="mv_con_wrap">
                <TestSlide handleClickOpen = {handleClickOpen} category_title={"호러 영화"} request_url={'discover/movie?api_key=' + key + '&with_genres=' + genre.horror + '&language=ko-KR'} />
                <TestSlide handleClickOpen = {handleClickOpen} category_title={"액션 영화"} request_url={'discover/movie?api_key=' + key + '&with_genres=' + genre.action + '&language=ko-KR'} />
                
                {/* <RankSlide ClickOpen= {this.openPopup} />
                <BasicSlide ClickOpen= {this.openPopup} category_title={"곧 개봉예정"} request_url={'movie/upcoming?api_key=' + key + '&language=ko-KR&page=1'} />
                <BasicSlide ClickOpen= {this.openPopup} category_title={"넷플릭스 오리지널"} request_url={'discover/tv?api_key=' + key + '&with_networks=213&language=ko-KR'} />
                <BasicSlide ClickOpen= {this.openPopup} category_title={"판타지 영화"} request_url={'discover/movie?api_key=' + key + '&with_genres=' + genre.fantasy + '&language=ko-KR'} />
                <BasicSlide ClickOpen= {this.openPopup} category_title={"스릴러 영화"} request_url={'discover/movie?api_key=' + key + '&with_genres=' + genre.thriller + '&language=ko-KR'} />
                <BasicSlide ClickOpen= {this.openPopup} category_title={"로맨스 영화"} request_url={'discover/movie?api_key=' + key + '&with_genres=' + genre.romance + '&language=ko-KR'} />
                <BasicSlide ClickOpen= {this.openPopup} category_title={"호러 영화"} request_url={'discover/movie?api_key=' + key + '&with_genres=' + genre.horror + '&language=ko-KR'} /> */}
            </div>
            <div>
                <Dialog 
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description">
                    <TestPopup handleClose = {handleClose} />
                </Dialog>
            </div>
        </div>
    )
};

