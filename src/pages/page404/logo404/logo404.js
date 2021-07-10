import React from 'react';

import logo from './logo.png';
import './logo404.css';

const Logo404 = () => {
    return (
        <body>
            <div className='block404'>
                <div className='text404'>
                    <div>4</div>
                    <img src={logo} alt='logo' className='logo'/>
                    <div>4</div>
                </div>
            </div>
        </body>
    );
};

export default Logo404;
