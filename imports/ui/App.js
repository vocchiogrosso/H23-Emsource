import React, {Component} from 'react';
import axios from 'axios';

import NavBar from './NavBar';
import QueryMap from './QueryMap';
import Panels from './Panels';
import Footer from './Footer';
import Modal from 'react-modal';
import {UserCards} from '../api/userCards';
import Emergency from '../ui/Emergency';

const POSTGIS_API_IP = "http://localhost:8080"

const modalStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

export default class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      modalIsOpen: false,
      data: {},
      query:{
        "lng" : -80.08406893,
        "lat" : 26.7760463,
        "mile": 10
      }
    }

    this.handleSubmit = this.handleSubmit.bind(this);

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.handleAdd = this.handleAdd.bind(this);
  }

  componentDidMount() {

    //set up location data query
    assistance = () => {
      axios.post(`${POSTGIS_API_IP}/location`, this.state.query)
      .then((res) => {
        console.log('ran assistance', res.data)
        this.setState({data: res.data})
      })
    }

    //init data state
    assistance();
  }


  //update query state based on geocoded search location 
  handleSubmit(e) {
    e.preventDefault();
    //const userLocation = "26.927815, -80.790069";
    const userLocation = e.target.userLocation.value;

    if(userLocation) {
      axios.post(`https://maps.googleapis.com/maps/api/geocode/json?address=${userLocation}`)
        .then((res) => {
          // GEOLOCATION data of the user
          const locationData = {
            lng: res.data.results[0].geometry.location.lng,
            lat: res.data.results[0].geometry.location.lat
          }
          this.setState({query: {"lat": locationData.lat,"lng": locationData.lng, "mile": 10}})
          assistance();
        })
        .catch((err) => {
          console.log(err);
        });
    }

      e.target.userLocation.value = '';
  }


  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }
  
  handleAdd(e){
    e.preventDefault();
    //get all values from the form 
    const { lat , lnt, name , type } = e.target
    const payload = { 
      'lat' :  lat.value, 
      'lng' :  lng.value, 
      'name':  name.value, 
      'type':  type.value
    }

    //send post to add to db
    axios.post(`${POSTGIS_API_IP}/add`, payload)
    .then((res) => {
      console.log('added to db', res.data.message)
      //refresh map and close modal
      assistance();
      this.closeModal()
    })
  }

  render() {
    return (
      <div>
        <NavBar handleSubmit={this.handleSubmit} openModal={this.openModal}/>

        <div className="map__container">
          <QueryMap data={this.state.data} query={this.state.query}/>
        </div>
        <Emergency userData={this.state.data} />

        //<Panels />

        <Footer />

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={modalStyles}
          contentLabel="Example Modal">

          <form className="form-group" onSubmit={this.handleAdd.bind(this)}>
            <label for="name">Name: </label>
            <input type="text" id="name" name="name" placeholder="lake"/><br />

            <label for="type">Type: </label>
            <input type="text" id="type" name="type" placeholder="drinking_water"/><br />

            <label for="lat">Lat: </label>
            <input type="text" id="lat" name="lat"  placeholder="26.711968" /><br />

            <label for="lng">Long: </label>
            <input type="text" id="lng" name="lng" placeholder="-80.069589" /><br />

            <button type="submit" className="btn btn-success">Add</button>
          </form>
        </Modal>

      </div>
    );
  }
};
