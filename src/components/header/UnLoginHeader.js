import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo_PC from '../../assets/img/Netflix_logo_pc.png';
import Logo_MO from '../../assets/img/Netflix_logo_mo.png';
import './header.scss';

export default function UnLoginHeader() {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(()=>{
        const updateScroll = () => {
            setScrollPosition(window.scrollY || document.documentElement.scrollTop);
        }
        window.addEventListener('scroll', updateScroll);
    }, []);

    return(
        <header className={scrollPosition < 100 ? "" : "scroll"}>
            <div className="hd-container">
                <div className="hd-left flex-center">
                    <div className="netflix-logo">
                        <Link to="/login">
                            <img src={ Logo_PC } className="pc-logo" alt="넷플릭스 로고" />
                            <img src={ Logo_MO } className="mo-logo" alt="넷플릭스 로고" />
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
