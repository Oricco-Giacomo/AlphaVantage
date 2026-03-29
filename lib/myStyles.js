const myFullStyle = {
  "version": 8,

  "sources": {
    "openMapTiles": {
      "type": "vector",
      "tiles": [
         `https://api.maptiler.com/tiles/v3/{z}/{x}/{y}.pbf?key=AVXt2UV4vFU23b3AwPbF`
      ],
      "minzoom": 0,
      "maxzoom": 14
    }
  },

  "layers": [
    // Sfondo
    {
      "id": "background",
      "type": "background",
      "paint": {
        "background-color": "#f5f5f5"
      }
    },

    // 1 Acqua (fiumi, laghi, mari)
    {
      "id": "water",
      "type": "fill",
      "source": "openMapTiles",
      "source-layer": "water",
      "paint": {
        "fill-color": "#a0c8f0"
      }
    },

    // 3 Landuse (parchi, foreste, aree urbane)
    {
      "id": "landuse",
      "type": "fill",
      "source": "openMapTiles",
      "source-layer": "landuse",
      "paint": {
        "fill-color": [
          "match",
          ["get", "class"],
          "park", "#d0efc0",
          "forest", "#c8e6c9",
          "residential", "#eeeeee",
          "#f0f0f0"
        ]
      }
    },

    // 3 Strade
    {
      "id": "roads",
      "type": "line",
      "source": "openMapTiles",
      "source-layer": "transportation",
      "paint": {
        "line-color": [
          "match",
          ["get", "class"],
          "motorway", "#f28c00",
          "primary", "#ffcc00",
          "secondary", "#ffffff",
          "tertiary", "#dddddd",
          "residential", "#eeeeee",
          "#cccccc"
        ],
        "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          5, 0.5,
          14, 3
        ]
      }
    },

    // 4 Edifici
    {
      "id": "buildings",
      "type": "fill",
      "source": "openMapTiles",
      "source-layer": "building",
      "paint": {
        "fill-color": "#d0d0d0",
        "fill-outline-color": "#b0b0b0"
      }
    },

    // 5 Nomi di città, villaggi, località
    {
      "id": "place-labels",
      "type": "symbol",
      "source": "openMapTiles",
      "source-layer": "place",
      "layout": {
        "text-field": "{name}",
        "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
        "text-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          3, 10,
          10, 16
        ]
      },
      "paint": {
        "text-color": "#333333",
        "text-halo-color": "#ffffff",
        "text-halo-width": 1
      }
    },

    // 6 Punti di interesse (POI)
    {
      "id": "poi-labels",
      "type": "symbol",
      "source": "openMapTiles",
      "source-layer": "poi",
      "layout": {
        "text-field": "{name}",
        "text-font": ["Open Sans Regular", "Arial Unicode MS Regular"],
        "text-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          5, 8,
          14, 12
        ],
        "icon-image": "marker-15",
        "icon-size": 1
      },
      "paint": {
        "text-color": "#555555",
        "text-halo-color": "#ffffff",
        "text-halo-width": 0.5
      }
    }
  ]
};



// Rispetto al precedente, usa un unico colore per tutte le strade e NON ha place e POI
const myLightStyle = {
  "version": 8,
  "sources": {
    "openMapTiles": {
      "type": "vector",
      "tiles": [
        `https://api.maptiler.com/tiles/v3/{z}/{x}/{y}.pbf?key=AVXt2UV4vFU23b3AwPbF`
      ],
      "maxzoom": 14
    }
  },
  "layers": [
    {
      "id": "background",
      "type": "background",
      "paint": { "background-color": "#f5f5f5" }
    },
    {
      "id": "water",
      "type": "fill",
      "source": "openMapTiles",
      "source-layer": "water",
      "paint": { "fill-color": "#a0c8f0" }
    },
    {
      "id": "landuse",
      "type": "fill",
      "source": "openMapTiles",
      "source-layer": "landuse",
      "paint": { "fill-color": "#eaeaea" }
    },
    {
      "id": "roads",
      "type": "line",
      "source": "openMapTiles",
      "source-layer": "transportation",
      "paint": { "line-color": "#ffffff", "line-width": 1.2 }
    },
    {
      "id": "buildings",
      "type": "fill",
      "source": "openMapTiles",
      "source-layer": "building",
      "paint": { "fill-color": "#d0d0d0" }
    }
  ]
}

