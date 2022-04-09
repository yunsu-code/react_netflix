import React from 'react';
import SvgIcon from '@mui/material/SvgIcon';

export default function HomeIcon(props) {
    return (
        <SvgIcon {...props} fill="#fff" height="24" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24">
            <polygon points="5 3 19 12 5 21 5 3"/>
        </SvgIcon>
    );
}

function PlayIcon(props) {
    return (
        <SvgIcon {...props} fill="#fff" height="24" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24">
            <polygon points="5 3 19 12 5 21 5 3"/>
        </SvgIcon>
    );
}

function InfoIcon(props) {
    return (
        <SvgIcon {...props} style={{enableBackground:"new 0 0 16 16"}} fill="#fff" version="1.1" viewBox="0 0 16 16">
            <g id="Guide"/>
            <g id="Layer_2">
                <g>
                    <path d="M8,2C4.69,2,2,4.69,2,8s2.69,6,6,6s6-2.69,6-6S11.31,2,8,2z M8,13c-2.76,0-5-2.24-5-5s2.24-5,5-5s5,2.24,5,5 S10.76,13,8,13z"/>
                    <path d="M8,6.85c-0.28,0-0.5,0.22-0.5,0.5v3.4c0,0.28,0.22,0.5,0.5,0.5s0.5-0.22,0.5-0.5v-3.4C8.5,7.08,8.28,6.85,8,6.85z"/>
                    <path d="M8.01,4.8C7.75,4.78,7.51,5.05,7.5,5.32c0,0.01,0,0.07,0,0.08c0,0.27,0.21,0.47,0.49,0.48c0,0,0.01,0,0.01,0 c0.27,0,0.49-0.24,0.5-0.5c0-0.01,0-0.11,0-0.11C8.5,4.98,8.29,4.8,8.01,4.8z"/>
                </g>
            </g>
        </SvgIcon>
    );
}

function SearchIcon(props) {
    return (
        <SvgIcon {...props} fill="none" height="24" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24">
            <circle cx="10.5" cy="10.5" r="7.5"/><line x1="21" x2="15.8" y1="21" y2="15.8"/>
        </SvgIcon>
    );
}

function AlarmIcon(props) {
    return (
        <SvgIcon {...props}  height="24" fill="#fff" version="1.1" viewBox="0 0 24 24" width="24">
            <title/>
            <path d="M18 15.984l2.016 2.016v0.984h-16.031v-0.984l2.016-2.016v-4.969c0-3.094 1.641-5.625 4.5-6.328v-0.703c0-0.844 0.656-1.5 1.5-1.5s1.5 0.656 1.5 1.5v0.703c2.859 0.703 4.5 3.281 4.5 6.328v4.969zM12 21.984c-1.125 0-2.016-0.891-2.016-1.969h4.031c0 1.078-0.938 1.969-2.016 1.969z"/>
        </SvgIcon>
    );
}

export { PlayIcon, InfoIcon, SearchIcon, AlarmIcon };
