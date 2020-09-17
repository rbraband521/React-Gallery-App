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
import PhotoContainer2 from './components/PhotoContainer2';
import Loader from './components/Loader';

const apiKey = config;

class App2 extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      rainbows: [],
      flowers: [],
      sky: [],
      loading: true,
    };
  } 

  performSearch = (query) => {
      this.setState({loading: true})
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(data => {this.setState({photos: data.photos.photo, loading: false});})
    .catch(error => {
      console.log('Error fetching and parsing data', error)
    });
    console.log(this.state.loading);
  }

  rainbowSearch = () => {
    this.setState({loading:true})
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=rainbows&per_page=24&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(data => {this.setState({rainbows: data.photos.photo,loading: false});})
    .catch(error => {console.log('Error fetching and parsing data', error)});}

  flowerSearch = () => {
    this.setState({loading: true})
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=flowers&per_page=24&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(data => {this.setState({flowers: data.photos.photo,loading: false});})
    .catch(error => {console.log('Error fetching and parsing data', error)});}

  skySearch = () => {
    this.setState({loading:true})
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=northern_lights&per_page=24&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(data => {this.setState({sky: data.photos.photo, loading: false});})
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
      const {loading} = this.state;
    return (
        <BrowserRouter>
          <div className="container">
            <SearchForm loading={this.state.loading} onSearch={this.performSearch} />  
            <Nav />
            <Switch>
              <Route exact path= '/' render={ () => loading ? <Loader />:<PhotoContainer2 data={this.state.sky} loading={true}/> } />
              <Route path='/search/:query' render={() => loading ? <Loader />:<PhotoContainer2  data={this.state.photos} loading={this.state.loading} /> } />
              <Route exact path= '/rainbows' render={ () => <PhotoContainer2 data={this.state.rainbows} loading={this.state.loading} />} />
              <Route exact path= '/flowers' render={ () => <PhotoContainer2 data={this.state.flowers} loading={this.state.loading} />} />
              <Route exact path= '/sky' render={ () => <PhotoContainer2 data={this.state.sky} loading={this.state.loading} />} />
              <Route render={ () => <Error error={true} />} />
            </Switch>
          </div>
        </BrowserRouter>
    );
  }
}

export default withRouter(App2);

