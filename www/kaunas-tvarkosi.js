var zoom = 12;
var mymap = L.map('mapid').setView([54.9, 23.91], zoom);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	maxZoom: 18,
	minZoom: 11,
	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

function onEachFeature(feature, layer) {
	if (feature.properties.description) {
		layer.bindPopup(feature.properties.description, {maxWidth: 350});
	}
	layer.bindTooltip(feature.properties.name, {sticky: true});
}

// When adding new type don't forget to update legend
function getColor(type) {
	switch (type) {
		case "reconstruction":	return "Red";
		case "finishing":	return "Yellow";
		case "done":   		return "Green";
		case "planned":		return "Blue";
		default:		return "Pink";
	}
}

function featureStyle(feature) {
	return {
	    color: getColor(feature.properties.type),
	    weight: 8,
	};
}

var kt_layer = L.geoJSON(kt_data, {
	onEachFeature: onEachFeature,
	style: featureStyle
}).addTo(mymap);

// On mobile show tooltip permanently from specific zoom
if (L.Browser.mobile == true) {
mymap.on('zoomend', function() {
	var zoomed = mymap.getZoom();
	// change tooltip only when needed
	if ((zoomed >= 15 && zoom < 15) ||
	    (zoomed < 15 && zoom >= 15)) {
		kt_layer.eachLayer(function(layer){
			layer.unbindTooltip();
			if (zoomed >= 15) {
				layer.bindTooltip(layer.feature.properties.name, {permanent:true, opacity: 0.7, interactive: true});
			} else {
				layer.bindTooltip(layer.feature.properties.name, {sticky: true});
			}
		});
	}
	zoom = zoomed;
});
}

legend = L.control({position: 'topright'});

legend.onAdd = function (map) {
	var div = L.DomUtil.create('div', 'info legend');
	div.innerHTML =
		'<i style="background:' + getColor("reconstruction") + '"></i> ' + 'rekonstruojama<br>' +
		'<i style="background:' + getColor("finishing") + '"></i> ' + 'baiginėjama<br>' +
		'<i style="background:' + getColor("done") + '"></i> ' + 'pabaigta<br>' +
		'<i style="background:' + getColor("planned") + '"></i> ' + 'planuojama<br>';
	return div;
};
legend.addTo(mymap);

/* Resize popup after image is loaded */
var popUpdated;
document.querySelector(".leaflet-popup-pane").addEventListener("load", function (event) {
	var tagName = event.target.tagName,
	    popup = mymap._popup; // Currently open popup, if any.

	if (tagName === "IMG" && popup && popup != popUpdated) {
		popup.update();
		popUpdated = popup;
	}
}, true); // Capture the load event, because it does not bubble.

