import React from 'react';
import { Link } from 'react-router-dom';

export default function MoviePopup({ handleClose, mv_id, title, backdrop, overview, date, lang, genre, actor }) {
	return (
		<div className="MV__popup">
            <div className="popup-wrap">
                <div className="popup">
                    <div className="pop-inner">
                        <button onClick={ handleClose } type="button" className="ico-delete circle close-btn"></button>
                        <div className="thumb">
                            <img src={'https://image.tmdb.org/t/p/original' + backdrop } alt={title + "포스터"} />
                            <div className="title-box">
                                <div className="title">{title}</div>
                                <div className="btn-wrap">
                                    <button type="button" className="basic play-btn">재생</button>
                                    <button type="button" className="ico-add circle tooltip"><div className="tooltip-box type2">내가 찜한 콘텐츠에 추가</div></button>
                                    <button type="button" className="ico-like circle tooltip"><div className="tooltip-box type2">좋아요</div></button>
                                    <button type="button" className="ico-dislike circle tooltip"><div className="tooltip-box type2">맘에 안들어요</div></button>
                                </div>
                            </div>
                        </div>
                        <div className="desc-box">
                            <div className="plot">{overview}</div>
                            <div className="date"><span className="gray">개봉일 : </span>{date}</div>
                            <div className="genre">
                                <span className="gray">장르 :  
                                    {genre.map(g => (
                                        <Link to={"#"} className="link-wrap" key={g}>{g}</Link>
                                    ))}
                                </span>
                            </div>
                            <div className="actor">
                                <span className="gray">출연진 : 
                                    {actor.map(a => (
                                        <Link to={"#"} className="link-wrap" key={a}>{a}</Link>
                                    ))}
                                </span>
                            </div>
                            <div className="ori-lang"><span className="gray">원어 : </span>{lang}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  	);
}