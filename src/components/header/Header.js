import React from 'react';
import { Link } from 'react-router-dom';
import Logo_PC from '../../assets/img/Netflix_logo_pc.png';
import Logo_MO from '../../assets/img/Netflix_logo_mo.png';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { visuallyHidden } from '@mui/utils';
import { SearchIcon, AlarmIcon } from "../../MuiIcons.js";
import './header.scss';

function NavList({menulist}) {
    return (
    <li className="nav">
        <Link to={menulist.to} key={menulist.key}> {menulist.list}</Link>
    </li>
    );
}
function ToolList({tool}) {
    return (
    <li className="list">
        <Link to={"#"}> {tool.list}</Link>
    </li>
    );
}

export default function Login_Header() {
    var menu = [
        {
            list : "홈",
            to : "/",
            key : "home",
        },
        {
            list : "시리즈",
            to : "/series",
            key : "series",

        },
        {
            list : "영화",
            to : "/movie",
            key : "movie",

        },
        {
            list : "NEW! 요즘 대세 콘텐츠",
            to : "/new",
            key : "new",

        },
        {
            list : "내가 찜한 콘텐츠",
            to : "/mycon",
            key : "mycon",

        },
    ]

    var tool_list = [
        {
            list : "키즈",
            key : "키즈",
        },
        {
            list : "프로필 관리",
            key : "프로필 관리",
        },
        {
            list : "계정",
            key : "계정",
        },
        {
            list : "고객센터",
            key : "고객센터",
        },
        {
            list : "넷플릭스에서 로그아웃",
            key : "넷플릭스에서 로그아웃",
        },
    ]
    return (
        <header>
            <div className="hd-container">
                <div className="hd-left flex-center">
                    <div className="netflix-logo">
                        <Link to="/">
                            <img src={ Logo_PC } className="pc-logo" alt="넷플릭스 로고" />
                            <img src={ Logo_MO } className="mo-logo" alt="넷플릭스 로고" />
                        </Link>
                    </div>
                    <div className="pc-nav-list">
                        <ul className="clrfix">
                            {menu.map(menulist => (
                                <NavList menulist={menulist} key={menulist.key}/>
                            ))}
                        </ul>
                    </div>
                </div>
                
                <div className="mo-nav-list display-none">
                    <button type="button">카테고리<span className="ico-fill-down"></span></button>
                    <div className="nav-list hidden">
                        <ul>
                            {menu.map(menulist => (
                                <NavList menulist={menulist} key={menulist.key}/>
                            ))}
                        </ul>
                    </div>
                </div>
                
                <div className="hd-right">
                    <div className="flex-center">
                        <div className="menu search none">
                            <IconButton aria-label="search" className="search-btn" >
                                <SearchIcon className="ico" />
                                <Box component="span" sx={visuallyHidden}>검색하기</Box>
                            </IconButton>
                            {/* <button type="button" className="ico-search">
                            </button> */}
                            <div className="input-wrap relative">
                                <input type="text" className="search-input" placeholder="검색어를 입력해주세요." />
                                <button type="button" className="ico-delete">
                                    <Box component="span" sx={visuallyHidden}>삭제</Box>
                                </button>
                            </div>
                        </div>
                        <Link to="#" className="menu kids">키즈</Link>
                        <div className="menu alarm tooltip">
                            <IconButton aria-label="alarm" >
                                <AlarmIcon className="ico" />
                                <Box component="span" sx={visuallyHidden}>검색하기</Box>
                            </IconButton>
                            {/* <button type="button" className="ico-alarm">
                                <Box component="span" sx={visuallyHidden}>알림</Box>
                            </button> */}
                            <div className="tooltip-box right type1">
                                <ul>
                                    {tool_list.map(tool => (
                                        <ToolList tool={tool} key={tool.key}/>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="menu my tooltip">
                            <button className="flex-center" type="button">
                                <Box component="span" sx={visuallyHidden}>프로필</Box>
                                <span className="profile"></span>
                                <span className="ico-fill-down"></span>
                            </button>
                            <div className="tooltip-box right type1">
                                <ul>
                                    {tool_list.map(tool => (
                                        <ToolList tool={tool} key={tool.key}/>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
