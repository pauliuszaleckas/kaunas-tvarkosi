function onEachFeature(feature, layer) {
	if (feature.properties.description) {
		layer.bindPopup(feature.properties.description, {maxWidth: 350});
	}
	if (feature.properties.name) {
		if (L.Browser.mobile == true) {
			layer.bindTooltip(feature.properties.name, {permanent:true, opacity: 0.7, interactive: true});
		} else {
			layer.bindTooltip(feature.properties.name);
		}
	}
}

var mymap = L.map('mapid').setView([54.9, 23.91], 12);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	maxZoom: 18,
	minZoom: 11,
	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

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
	    weight: 5,
	};
}

L.geoJSON(kt_data, {
	onEachFeature: onEachFeature,
	style: featureStyle
}).addTo(mymap);

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

