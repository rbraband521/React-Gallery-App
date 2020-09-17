import React, { Component } from 'react';
import './css/index.css';
import config from './config';
import {
  Route, 
  BrowserRouter,
  Switch
} from 'react-router-dom';

import { withRouter } from 'react-router';

import Nav from './components/Nav';
import SearchForm from './components/SearchForm';
import Error from './components/Error';
import PhotoContainer from './components/PhotoContainer';

const apiKey = config;

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      photos: [],
      rainbows: [],
      flowers: [],
      sky: [],
      loading: true,
    };
  } 
  
  performSearch = (query) => {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(data => {this.setState({
          photos: data.photos.photo,
          loading: false});})
      .then(this.setState({loading:true}))
    .catch(error => {
      console.log('Error fetching and parsing data', error)
    });
  }

  rainbowSearch = () => {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=rainbows&per_page=24&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(data => {this.setState({rainbows: data.photos.photo, loading: false});})
    .catch(error => {console.log('Error fetching and parsing data', error)});}

  flowerSearch = () => {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=flowers&per_page=24&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(data => {this.setState({flowers: data.photos.photo});})
    .catch(error => {console.log('Error fetching and parsing data', error)});}

  skySearch = () => {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=northern_lights&per_page=24&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(data => {
        this.setState({sky: data.photos.photo, loading: false});})
    .catch(error => {console.log('Error fetching and parsing data', error)});}


    componentDidMount() {
      this.performSearch();
      this.rainbowSearch();
      this.flowerSearch();
      this.skySearch();
    }


  componentDidUpdate(prevProps) {
    if(this.props.location.pathname !== prevProps.location.pathname) {
      if((this.props.location.pathname).includes('/search')) {
        const searchText = (this.props.location.pathname).substring(8);
      this.performSearch(searchText);
      console.log(searchText);
      } 
    }
  };

  render () {
    return (
        <BrowserRouter>
          <div className="container">
            <SearchForm loadingState={this.state.loading} onSearch={this.performSearch} />  
            <Nav />
            <Switch>
              <Route exact path= '/' render={ () => <PhotoContainer data={this.state.sky} loading={true}/> } />
              <Route path='/search/:query' render={() => (this.state.loading) ? <p>Loading...</p>:<PhotoContainer data={this.state.photos} /> } />
              <Route exact path= '/rainbows' render={ () => <PhotoContainer data={this.state.rainbows} />} />
              <Route exact path= '/flowers' render={ () => <PhotoContainer data={this.state.flowers} />} />
              <Route exact path= '/sky' render={ () => <PhotoContainer data={this.state.sky} />} />
              <Route render={ () => <Error error={true} />} />
            </Switch>
          </div>
        </BrowserRouter>
    );
  }
}

export default withRouter(App);

