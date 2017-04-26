require([
      "esri/Map",
      "esri/views/SceneView",
      "esri/widgets/BasemapToggle",
      "esri/layers/FeatureLayer",
      "dojo/domReady!"
    ], function (Map, SceneView, BasemapToggle, FeatureLayer) {

    var map = new Map({
        basemap: "hybrid"
    });

    var view = new SceneView({
        container: "viewDiv",
        map: map,
        center: [-101.17, 21, 78],
        scale: 50000000
    });

    var basemapToggle = new BasemapToggle({
        view: view, // The view that provides access to the map's "streets" basemap
        nextBasemap: "topo" // Allows for toggling to the "hybrid" basemap
    });

    view.ui.add(basemapToggle, "top-right");


    var campsites = new FeatureLayer({
        url: "https://services1.arcgis.com/fBc8EJBxQRMcHlei/arcgis/rest/services/ROMO_BackcountryCampsites_2017/FeatureServer/0"
    });
    map.add(campsites);
    
    var RMNPboundary = new FeatureLayer({
        url: "https://services1.arcgis.com/fBc8EJBxQRMcHlei/ArcGIS/rest/services/RockyMountainNP_Boundary/FeatureServer/0"
    });
    map.add(RMNPboundary);

});
