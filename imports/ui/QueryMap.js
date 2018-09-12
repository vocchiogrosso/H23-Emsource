import React, { Component } from 'react';
import  MapboxGl from 'mapbox-gl/dist/mapbox-gl.js';


const icons_colors = {
  "drinking-water": "drinking-water-15",
  "drinking_water": "drinking-water-15", 
  "Shelter": "castle-15",
  "food": "grocery-15",
  "Pet": "dog-park-15"
}  


export default class QueryMap extends Component {
constructor(props){
  super(props)
}

componentDidMount() {
    MapboxGl.accessToken = 'pk.eyJ1IjoiemhpayIsImEiOiJjaW1pbGFpdHQwMGNidnBrZzU5MjF5MTJiIn0.N-EURex2qvfEiBsm-W9j7w';


    renderMap = (props) => {
      //reset map, if map is defined
      if (typeof map !== 'undefined') {
        map = {};
      }

      //init map with location of the query
      //example from https://engineering.door2door.io/a-single-page-application-with-react-and-mapbox-gl-f96181a7ca7f
      let map = new MapboxGl.Map({
        container: this.container,
        style: 'mapbox://styles/zhik/cj7ctcb7v09hj2rmrds9z3v7g', 
        center: [props.query.lng, props.query.lat], 
        zoom: 10 
      });

      //filter dataset and group by type of aid, for custom icons
      if(Object.keys(props.data).length > 1){
        const filter_dataset = props.data.features.reduce( (s, v) => {
          const type = v.properties.type;
          if(!(type in s)){
            s[type] = {
              "type": "FeatureCollection",
              "features": [],
              "icon_color": icons_colors[type] || null, //colors isn't working
              "geom_type": v.geometry.type 
            }
          }
          s[type].features.push(v);
          return s;
        },{} )


        //for each type of aid, render layer
        map.on('load', function() {
          Object.keys(filter_dataset).map((k)=>{
          console.log("adding", k, filter_dataset[k])
          const geom_type = filter_dataset[k].geom_type;
          if(geom_type === 'Point'){
            map.addLayer({
                id: k,
                type: 'symbol',
                source: {
                    type: 'geojson',
                    data: filter_dataset[k]
                },
                layout: {
                    'icon-image': filter_dataset[k].icon_color || "circle-stroked-15",
                    'icon-size': 1.5 // scale
                }
            })
          }else{
            console.log(geom_type, ' - other type of dataset - Not supported', filter_dataset[k])
          }
        })

        //add popup layer
        const popup = new MapboxGl.Popup();

        map.on('click', function(e) {
        const features = map.queryRenderedFeatures(e.point, { layers: Object.keys(filter_dataset) });
        popup.remove();
        if (features.length === 0) {
          return;
        }
      
        const feature = features[0];

        const htmldiv = `<div>
                          <h2><a href="${feature.properties.link | null}">${feature.properties.name}</a></h2>
                          <p>${feature.properties.type}<p/>
                          <p>${feature.properties.dist} miles</p>
                        </div>`

        popup.setLngLat(e.lngLat)
        .setHTML(htmldiv)
        .addTo(map);

        map.getCanvas().style.cursor = features.length ? 'pointer' : '';
        });
      })
    }
  }

  //init map
  renderMap(this.props);
  }

  //re-render if new props (a search query)
  componentWillReceiveProps(nextProps) {  renderMap(nextProps); }
  

  render() {
    return(
    <div>
      <div className='Map' ref={(x) => { this.container = x }}></div>
    </div>
    );
  }
}
