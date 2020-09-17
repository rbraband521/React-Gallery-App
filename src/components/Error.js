import React from 'react';

const Error = (props) => {
    if(props.error === true) {
    return <ul>
        <li>
            <h1>Oh no! We couldn't find the page you were looking for!</h1>
            <p>404: Not Found</p>
        </li>
        <a href = '/'><h4>Go Home</h4></a>
    </ul>
    } else return null;
}



export default Error;