# kaunas-tvarkosi
Interactive map of streets, parks and etc. (re)constructions in Kaunas city, Lithuania

## Deployment
All website is made from static content.
You will need to generate/update GeoJSON/JavaScript data in www dir by running:

    ./geo_to_js.sh kaunas_data.geojson

Now you just need to copy contents of www directory to your webservers serving directory.

## Data editing
I suggest using http://geojson.io

This on-line GeoJSON editor can Open and Save file directly to/from github repository.
