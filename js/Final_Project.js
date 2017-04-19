require([
      "esri/Map",
      "esri/views/SceneView",
      "esri/layers/FeatureLayer",
      "dojo/domReady!"
    ], function (Map, SceneView, FeatureLayer) {

    var map = new Map({
        basemap: "hybrid"
    });

    var view = new SceneView({
        container: "viewDiv",
        map: map,
        center: [-101.17, 21, 78],
        scale: 50000000
    });
    var campsites = new FeatureLayer({
        url: "https://services1.arcgis.com/fBc8EJBxQRMcHlei/arcgis/rest/services/ROMO_BackcountryCampsites_2017/FeatureServer/0"
    });
    map.add(campsites);

});
