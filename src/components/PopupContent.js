import React from 'react';
import { Link } from 'react-router-dom';

function PopupContent( {ClickClose} ) {
        return(
            <div className="MV__popup">
                <div className="popup-wrap">
                    <div className="popup">
                        <div className="pop-inner">
                            <button onClick={ClickClose} type="button" className="ico-delete circle close-btn"></button>
                            <div className="thumb">
                                {/* <img src={} alt="  포스터"> */}
                                <div className="title-box">
                                    <div className="title">{}</div>
                                    <div className="btn-wrap">
                                        <button type="button" className="basic play-btn">재생</button>
                                        <button type="button" className="ico-add circle tooltip"><div className="tooltip-box type2">내가 찜한 콘텐츠에 추가</div></button>
                                        <button type="button" className="ico-like circle tooltip"><div className="tooltip-box type2">좋아요</div></button>
                                        <button type="button" className="ico-dislike circle tooltip"><div className="tooltip-box type2">맘에 안들어요</div></button>
                                    </div>
                                </div>
                            </div>
                            <div className="desc-box">
                                <div className="plot">{}</div>
                                <div className="date"><span className="gray">개봉일 : </span>{}</div>
                                <div className="genre"><span className="gray">장르 : <Link to={"#"} className="link-wrap" v-for="value in genre" key="value">{}</Link></span></div>
                                <div className="actor"><span className="gray">출연진 : <Link to={"#"} className="link-wrap" v-for="value in actor" key="value">{}</Link></span></div>
                                <div className="ori-lang"><span className="gray">원어 : </span>{}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
}
 
export default PopupContent;