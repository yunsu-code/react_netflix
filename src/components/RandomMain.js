import React from 'react';
import Button from '@mui/material/Button';
import {PlayIcon, InfoIcon} from "../MuiIcons.js";
class RandomMainTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datas: [],
            id : "",
            title : "",
            overview : "",
            backdrop : "",
        }
    }
    callApi = () => {
        fetch("movie/popular?api_key=679db3d03f27f5e2b0684e936ccc0774&language=ko-KR&page=1")
        .then(res => res.json())
        .then(json => {
            const num = json.results.length;
            const randIndex = Math.floor(Math.random() * num);
            this.setState({
                datas: json.results,
                id: json.results[randIndex].id,
                title: json.results[randIndex].title,
                overview: json.results[randIndex].overview,
                backdrop: json.results[randIndex].backdrop_path
            })
        })
    }
    
    componentDidMount() {
        this.callApi();
        var main = document.querySelector(".home-main")
        main.classList.add("load")
    }
    
    render() {
        return (
            <div className="home-main" data-key={ this.state.id } data-type="movie">
                <div className="container">
                    <div className="background">
                        <img src={ 'https://image.tmdb.org/t/p/original' + this.state.backdrop } alt={ this.state.title } />
                        {/* <video className="main-video" muted preload="metadata">
                            <source src="../../assets/video/main_video.mp4" type="video/mp4" />
                            <span className="blind">{ this.state.title } 예고편 비디오</span>
                        </video> */}
                        <button variant="contained" className="ico-mute sound-btn circle"><span className="blind">소리 버튼</span></button>
                    </div>
                    <div className="main-contents">
                        <div className="article">
                            <div className="title">{ this.state.title }</div>
                            <p className="plot">{ this.state.overview }</p>
                        </div>
                        <div className="btn-wrap">
                            <Button variant="contained" className="basic play mgr10" startIcon={<PlayIcon />}>재생</Button>
                            <Button variant="contained" className="basic info" startIcon={<InfoIcon />} onClick={this.props.handleClickOpen}>상세보기</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RandomMainTest;