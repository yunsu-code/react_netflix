import React from 'react';

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
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=679db3d03f27f5e2b0684e936ccc0774&language=ko-KR&page=1")
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
        <div className="home-main">
                <div className="container">
                    <div className="background">
                        <img src={ 'https://image.tmdb.org/t/p/original' + this.state.backdrop } alt={ this.state.title } />
                        <video className="main-video" muted preload="metadata">
                            <source src="../../assets/video/main_video.mp4" type="video/mp4" />
                            <span className="blind">{ this.state.title } 예고편 비디오</span>
                        </video>
                        <button type="button" className="ico-mute sound-btn circle"><span className="blind">소리 버튼</span></button>
                    </div>
                    <div className="main-contents">
                        <div className="article">
                            <div className="title">{ this.state.title }</div>
                            <p className="plot">{ this.state.overview }</p>
                        </div>
                        <div className="btn-wrap">
                            <button type="button" className="basic play-btn mgr10">재생</button>
                            <button type="button" className="basic info-btn" data-id={ this.state.id } data-type="movie" >상세보기</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RandomMainTest;