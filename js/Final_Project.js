require([
    "esri/Map",
    "esri/views/SceneView",
    "esri/widgets/BasemapToggle",
    "esri/layers/FeatureLayer",
    "esri/tasks/Locator",
    "dojo/domReady!"
], function (Map, SceneView, BasemapToggle, FeatureLayer, Locator) {

    var map = new Map({
        basemap: "hybrid"
    });

    var view = new SceneView({
        container: "viewDiv",
        map: map,
        center: [-105.55, 40.35],
        scale: 250000
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

    var CubLakeTrail = new FeatureLayer({
        url: "http://services.arcgis.com/YseQBnl2jq0lrUV5/arcgis/rest/services/CubLakeTrail/FeatureServer"
    });
    map.add(CubLakeTrail);

    var locatorTask = new Locator({
        url: "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"
    });

    view.on("click", function (event) {

        // Display the popup
        // Execute a reverse geocode using the clicked location
        locatorTask.locationToAddress(event.mapPoint).then(function (response) {
            // Get the coordinates of the click on the view
            var lat = Math.round(event.mapPoint.latitude * 1000) / 1000;
            var lon = Math.round(event.mapPoint.longitude * 1000) / 1000;
            // If an address is successfully found, print it to the popup's content
            var address = response.address.Match_addr;
            //view.popup.content = address;
            view.popup.open({
                // Set the popup's title to the coordinates of the location
                title: "Reverse geocode: [" + lon + ", " + lat + "]",
                content: address,
                location: event.mapPoint // Set the location of the popup to the clicked location
            });
        }).otherwise(function (err) {
            // If the promise fails and no result is found, print a generic message
            // to the popup's content
            view.popup.open({
                // Set the popup's title to the coordinates of the location
                title: "Error",
                content: "No address was found for this location",
                location: event.mapPoint
            });
        });
    });

});
