//stateless: for displaing a user friendly message when the search return no results
import React from 'react';

const NotFound = () => (
    <li className="not-found">
        <h1>Sorry! We couldn't find any pictures matching your search!</h1>
    </li>
);

export default NotFound;