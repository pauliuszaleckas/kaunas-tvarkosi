# kaunas-tvarkosi
Interactive map of streets, parks and etc. (re)constructions in Kaunas city, Lithuania.

See it in action here: http://kaunas-tvarkosi.zaleckas.lt

## Deployment
All website is made from static content.
You will need to generate/update GeoJSON/JavaScript data in **www** dir by running:

    ./geo_to_js.sh kaunas_data.geojson

> Optionaly if you have **yajl** installed on your system, then *geo_to_js.sh* will use *json_reformat* util to compress data **~2x**.

Now you just need to copy contents of **www** directory to your webservers serving directory.

## Data editing
I suggest using http://geojson.io/#id=github:pauliuszaleckas/kaunas-tvarkosi/blob/master/kaunas_data.geojson

This on-line GeoJSON editor can Open and Save file directly to/from github repository.
