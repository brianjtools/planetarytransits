## Current Transits JavaScript

This small JavaScript application will display the current transits of the planets used for Vedic Astrology using the Lahiri Ayanamsha.  This script works very similarly to how astrologers calculated charts before computers were easily available.  It includes a 5 year database of ephemeris files in JSON format from 2019 to 2023, one per month with daily planetary positions including an extra position for the Moon at noontime.

This script is also in use on the home page of [JyotishTools.com](http://www.jyotishtools.com)

Accuracy is about 1-2 arc minutes due to the simplicity of the script.  Exacting JPL NASA positions can only be achieved online by using a dedicated server which is expensive.  This JavaScript runs client side and depends on accessing the JSON file for the month from the server.

To use simply include the data folder on a web page either in a div or paragraph.  And example is given with the index.html file.

``` html language
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Current Planets Demo</title>
    <style>
        p {
            font-family: monospace;
            font-size: 20px;
            font-weight: bold;
            text-align: center;
        }
    </style>
    <script src="data/showpl.min.js" type="text/javascript"></script>
</head>
<body>
    <div>
        <p id="showplanets"></p>
    </div>
</body>
</html>
```
I am assuming most who want to use this script already have an editor for their site that sets up a local server to test edits and it should also be able to display this script.  Basic of website structure are also assumed.

Best Wishes,  
Brian Conrad  
JyotishTools.com
