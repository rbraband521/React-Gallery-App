//stateful
import React from 'react';
import Photo from './Photo';
import NotFound from './NotFound';

const PhotoContainer = (props) => {
    let results = props.data;
    console.log(results);
    let photos;
    if (results.length > 0) {
        photos = results.map(photo =>
            <Photo key = {photo.id} url={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} />);    
    }  else {
        photos = <NotFound />
    }
    
    return (
        <div className="photo-container">
            <h2>Here are your pictures!</h2>
            <ul className="photo-list">
                {photos}
            </ul>
        </div>
    );
}

export default PhotoContainer;