//stateful
import React, { Component } from 'react';
import Photo from './Photo';
import NotFound from './NotFound';
// import Loader from './Loader';

class PhotoContainer2 extends Component {
       state = {
            loading: this.props.loading
        }
    render () {
        let results = this.props.data;
        console.log(results);
        let photos;
        console.log(this.props.loading);
        // if (this.state.loading) {
        //     photos = <Loader />
        // }
        if (results.length > 0) {
            photos = results.map(photo =>
                <Photo key = {photo.id} url={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} />);
            } else if (results < 1 && this.state.loading === false) {
                return <NotFound />
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
}

    


export default PhotoContainer2;