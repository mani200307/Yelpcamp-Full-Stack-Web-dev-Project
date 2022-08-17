// goodCampground = JSON.parse(campground)

mapboxgl.accessToken = 'pk.eyJ1IjoibWFuaTIwMDMiLCJhIjoiY2w2djAwZWIzMWpobTNkdGNiNnE2cmJ5NSJ9.TccIKc_9Fk-syognvNOvFA';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v10', // style URL
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 10, // starting zoom
    projection: 'globe' // display the map as a 3D globe
});
map.on('style.load', () => {
map.setFog({}); // Set the default atmosphere style 
});

map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({offset: 25})
            .setHTML(
                `<h3>${campground.title}</h3><P>${campground.location}</P>`
            )
    )
    .addTo(map)