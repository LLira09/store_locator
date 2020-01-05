mapboxgl.accessToken =
  'pk.eyJ1IjoibGxpcmEwOSIsImEiOiJjazUxZXd0MmMwYXVyM2twZTd5bzJ5dXA4In0.Obh5gMAjcxaEe59RiQluPw';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  zoom: 9,
  center: [-118.415932, 33.917099]
});

// Fetch stores from API
async function getStores() {
  const res = await fetch('/api/v1/stores');
  const data = await res.json();

  const stores = data.data.map(store => {
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [
          store.location.coordinates[0],
          store.location.coordinates[1]
        ]
      },
      properties: {
        storeId: store.storeId,
        icon: 'shop'
      }
    };
  });

  loadMap(stores);
}

// Load map with stores
function loadMap(stores) {
  map.on('load', function() {
    map.addLayer({
      id: 'points',
      type: 'symbol',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: stores
          //   features: [
          //     {
          //       type: 'Feature',
          //       geometry: {
          //         type: 'Point',
          //         coordinates: [-118.415932, 33.917099]
          //       },
          //       properties: {
          //         storeId: '0001',
          //         icon: 'shop'
          //       }
          //     }
          //   ]
        }
      },
      layout: {
        'icon-image': '{icon}-15',
        'icon-size': 1.5,
        'text-field': '{storeId}',
        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        'text-offset': [0, 0.9],
        'text-anchor': 'top'
      }
    });
  });
}

getStores();
