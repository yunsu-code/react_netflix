import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo_PC from '../../assets/img/Netflix_logo_pc.png';
import Logo_MO from '../../assets/img/Netflix_logo_mo.png';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { visuallyHidden } from '@mui/utils';
import { SearchIcon, AlarmIcon } from "../../MuiIcons.js";
import { connect } from 'react-redux';
import './header.scss';
import { userActions } from '../../user_store/action';

var menu = [
    {
        list : "홈",
        to : "/home",
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
        to : "#",
    },
    {
        list : "프로필 관리",
        key : "프로필 관리",
        to : "#",
    },
    {
        list : "계정",
        key : "계정",
        to : "#",
    },
    {
        list : "고객센터",
        key : "고객센터",
        to : "#",
    },
    {
        list : "넷플릭스에서 로그아웃",
        key : "로그아웃",
        to : "/login",
    },
]

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
        <Link to={tool.to}> {tool.list}</Link>
    </li>
    );
}

class LoginHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            scrollPosition: 0
        };
    }
    
    componentDidMount() {
        const updateScroll = () => {
            this.setState({scrollPosition : window.scrollY || document.documentElement.scrollTop});
        }
        window.addEventListener('scroll', updateScroll);
        this.props.getUsers();
    }

    searchEvent = (e) => {
        let $search = e.target.closest(".search").classList;
        if( $search.contains("none")){
            $search.remove("none")
            $search.add("open");
        }
        else if( $search.contains("open")){
            $search.add("none")
            $search.remove("open");
        }
    }

    searchDelEvent = () => {
		let	search_input = document.querySelectorAll("header .search-input")[0];
		search_input.value = null;
    }

    
    menuOpenEvent = () => {
        let mo_nav_list = document.querySelectorAll("header .mo-nav-list .nav-list")[0]
        let body = document.getElementsByTagName("body")[0]
        mo_nav_list.classList.toggle("hidden")
		body.classList.toggle("pop-open")
    }

    menuCloseEvent = (e) => {
        let mo_nav_list = document.querySelectorAll("header .mo-nav-list .nav-list")[0]
        let body = document.getElementsByTagName("body")[0]
        if(e.target.tagName === "UL") {
            mo_nav_list.classList.toggle("hidden")
            body.classList.toggle("pop-open")
        }
    }

    render() {
        const { user, users } = this.props;

        return (
            <header className={this.state.scrollPosition < 100 ? "" : "scroll"}>
                <div className="hd-container">
                    <div className="hd-left flex-center">
                        <div className="netflix-logo">
                            <Link to="/home">
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
                    
                    <div className="mo-nav-list display-none"  onClick={this.menuCloseEvent }>
                        <button type="button" onClick={this.menuOpenEvent } >카테고리<span className="ico-fill-down"></span></button>
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
                                <IconButton aria-label="search" className="search-btn" onClick={this.searchEvent } >
                                    <SearchIcon className="ico" />
                                    <Box component="span" sx={visuallyHidden}>검색하기</Box>
                                </IconButton>
                                <div className="input-wrap relative">
                                    <input type="text" className="search-input" placeholder="검색어를 입력해주세요." />
                                    <button type="button" className="ico-delete" onClick={this.searchDelEvent }>
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
                                <div className="tooltip-box right type1">
                                    <ul>
                                        <li className='list username'>
                                            <span>{user.useremail}</span>님<br />안녕하세요:)
                                        </li>
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
                                        <li className='list username'>
                                            <span>{user.useremail}</span>님<br />안녕하세요:)
                                        </li>
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
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
}

const connectedLoginHeader = connect(mapState, actionCreators)(LoginHeader);
export { connectedLoginHeader as LoginHeader };