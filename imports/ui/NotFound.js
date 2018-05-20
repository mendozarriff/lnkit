import React from 'react';
import {Link} from 'react-router-3';

export default ()=>{
    return (
        <div className="not-found">
            <div className="boxed-view__box">
                <div className="not-found__content">
                    <h1>Hmmm nothing here...</h1>
                    <Link to="/">Go back home</Link>
                </div>
            </div>
        </div>
    )
}


