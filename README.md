# Rijksmuseum paintings

![App][image]

## Table of Contents

* [To Do](#to-do-)
* [Live Demo](#live-demo-)
* [Description](#description-)
* [Usage](#usage)
* [API](#api-)
* [How It Works](#how-it-works)
  * [Actor Diagram](#actor-diagram)
  * [Interaction Diagram](#interaction-diagram)
* [Sources](#sources)
* [Credits](#credits)
* [Licence](#licence)

## To do

- [x] get the name and an image of all the paintings by one specific artist.
- [x] get details of the paintings.
- [x] route to details page.
- [x] transform hex values to real colors.
- [ ] refactor code to modules.
- [ ] search painting from a specific artist.
- [ ] arrows for scrolling with a nice fade on both sides.
- [ ] styling.

## Live Demo

The live demo of the app can be found here:
[Live Demo Link](https://marjoleinaardewijn.github.io/web-app-from-scratch-1920/)

## Description

With this app the user can view all the paintings by a certain artist that are in the collection of the Rijksmuseum.
Information about all the paintings can be viewed, such as:
- Name;
- Year it was presented by the artist himself;
- Colors that have been used in a painting.

## Usage

Clone the repository

```
    git clone https://github.com/MarjoleinAardewijn/web-app-from-scratch-1920.git
```

After cloning the repository load the `index.html` file in your localhost.

## API

The API that is used for this app is the [Rijksmuseum API](https://data.rijksmuseum.nl/object-metadata/api/).

For getting the paintings from an artist I used the following API endpoint:

> https://www.rijksmuseum.nl/api/nl/collection?key=[api-key]&involvedMaker=[artist]

This will be returning the following data:

<details>
 <summary>All data from a specific artist</summary>

```json
{
  "elapsedMilliseconds": 0,
  "count": 3491,
  "artObjects": [
    {
      "links": {
        "self": "http://www.rijksmuseum.nl/api/nl/collection/SK-C-5",
        "web": "http://www.rijksmuseum.nl/nl/collectie/SK-C-5"
      },
      "id": "nl-SK-C-5",
      "objectNumber": "SK-C-5",
      "title": "De Nachtwacht",
      "hasImage": true,
      "principalOrFirstMaker": "Rembrandt van Rijn",
      "longTitle": "De Nachtwacht, Rembrandt van Rijn, 1642",
      "showImage": true,
      "permitDownload": true,
      "webImage": {
          "guid": "aa08df9c-0af9-4195-b31b-f578fbe0a4c9",
          "offsetPercentageX": 0,
          "offsetPercentageY": 1,
          "width": 2500,
          "height": 2034,
          "url":"https://lh3.googleusercontent.com/J-mxAE7CPu-DXIOx4QKBtb0GC4ud37da1QK7CzbTIDswmvZHXhLm4Tv2-1H3iBXJWAW_bHm7dMl3j5wv_XiWAg55VOM=s0"
      },
      "headerImage": {
        "guid": "29a2a516-f1d2-4713-9cbd-7a4458026057",
        "offsetPercentageX": 0,
        "offsetPercentageY": 0,
        "width": 1920,
        "height": 460,
        "url": "https://lh3.googleusercontent.com/O7ES8hCeygPDvHSob5Yl4bPIRGA58EoCM-ouQYN6CYBw5jlELVqk2tLkHF5C45JJj-5QBqF6cA6zUfS66PUhQamHAw=s0"
      },
      "productionPlaces": ["Amsterdam"]
    },
    // more results...
  ]
}
```
</details>

For getting the details from a painting I used the following API endpoint:

> https://www.rijksmuseum.nl/api/nl/collection/[objectNumber]?key=[api-key]

This will be returning the following data:

<details>
 <summary>Painting specific data</summary>

```json
{
  "elapsedMilliseconds": 219,
  "artObject": {  
    "links": {  
      "search":"http://www.rijksmuseum.nl/api/nl/collection"
    },
    "id": "nl-SK-C-5",
    "priref": "5216",
    "objectNumber": "SK-C-5",
    "language": "nl",
    "title": "De Nachtwacht",
    "copyrightHolder": null,
    "webImage":{  
      "guid": "aa08df9c-0af9-4195-b31b-f578fbe0a4c9",
      "offsetPercentageX": 50,
      "offsetPercentageY": 100,
      "width": 2500,
      "height": 2034,
     "url": "https://lh3.googleusercontent.com/J-mxAE7CPu-DXIOx4QKBtb0GC4ud37da1QK7CzbTIDswmvZHXhLm4Tv2-1H3iBXJWAW_bHm7dMl3j5wv_XiWAg55VOM=s0"
    },
    "colors": [  
      {  
        "percentage": 81,
        "hex": "#261808"
      },
      // more results...
    ],
    "colorsWithNormalization": [  
      {  
        "originalHex": "#261808",
        "normalizedHex": "#000000"
      },
      // more results...
    ],
    "normalizedColors": [  
      {  
        "percentage": 81,
        "hex": "#000000"
      },
      // more results...
    ],
    "normalized32Colors": [  
      {  
        "percentage": 81,
        "hex": "#000000"
      },
      // more results...
    ],
    "titles": [  
       "Officieren en andere schutters van wijk II in Amsterdam, onder leiding van kapitein Frans Banninck Cocq en luitenant Willem van Ruytenburch, bekend als ‘De Nachtwacht’",
         "Het korporaalschap van kapitein Frans Banninck Cocq en luitenant Willem van Ruytenburch, bekend als de 'Nachtwacht'"
    ],
    "description": "Officieren en andere schutters van wijk II in Amsterdam onder leiding van kapitein Frans Banninck Cocq en luitenant Willem van Ruytenburch, sinds het einde van de 18de eeuw bekend als ‘De Nachtwacht’. Schutters van de Kloveniersdoelen uit een poort naar buiten tredend. Op een schild aangebracht naast de poort staan de namen van de afgebeelde personen: Frans Banning Cocq, heer van purmerlant en Ilpendam, Capiteijn Willem van Ruijtenburch van Vlaerdingen, heer van Vlaerdingen, Lu[ij]tenant, Jan Visscher Cornelisen Vaendrich, Rombout Kemp Sergeant, Reijnier Engelen Sergeant, Barent Harmansen, Jan Adriaensen Keyser, Elbert Willemsen, Jan Clasen Leydeckers, Jan Ockersen, Jan Pietersen bronchorst, Harman Iacobsen wormskerck, Jacob Dircksen de Roy, Jan vander heede, Walich Schellingwou, Jan brugman, Claes van Cruysbergen, Paulus Schoonhoven. De schutters zijn gewapend met onder anderen pieken, musketten en hellebaarden. Rechts de tamboer met een grote trommel. Tussen de soldaten links staat een meisje met een dode kip om haar middel, rechts een blaffende hond. Linksboven de vaandrig met de uitgestoken vaandel.",
    "labelText": null,
    "objectTypes": [  
      "schilderij"
    ],
    "objectCollection": [  
      "schilderijen"
    ],
    "makers": [ ],
    "principalMakers": [  
      {  
        "name": "Rembrandt van Rijn",
        "unFixedName": "Rijn, Rembrandt van",
        "placeOfBirth": "Leiden",
        "dateOfBirth": "1606-07-15",
        "dateOfBirthPrecision": null,
        "dateOfDeath": "1669-10-08",
        "dateOfDeathPrecision": null,
        "placeOfDeath": "Amsterdam",
        "occupation": [  
          "prentmaker",
          "tekenaar",
          "schilder"
        ],
        "roles":[  
          "schilder"
        ],
        "nationality": "Noord-Nederlands",
        "biography": null,
        "productionPlaces": [  
          "Amsterdam"
        ],
        "qualification": null
      }
    ],
    "plaqueDescriptionDutch": "Rembrandts beroemdste en grootste doek werd gemaakt voor de Kloveniersdoelen. Dit was een van de verenigingsgebouwen van de Amsterdamse schutterij, de burgerwacht van de stad. \r\nRembrandt was de eerste die op een groepsportret de figuren in actie weergaf. De kapitein, in het zwart, geeft zijn luitenant opdracht dat de compagnie moet gaan marcheren. De schutters stellen zich op. Met behulp van licht vestigde Rembrandt de aandacht op belangrijke details, zoals het handgebaar van de kapitein en het kleine meisje op de achtergrond. Zij is de mascotte van de schutters.",
    "plaqueDescriptionEnglish": "Rembrandt’s largest, most famous canvas was made for the Arquebusiers guild hall. This was one of several halls of Amsterdam’s civic guard, the city’s militia and police. \r\nRembrandt was the first to paint figures in a group portrait actually doing something. The captain, dressed in black, is telling his lieutenant to start the company marching. The guardsmen are getting into formation. Rembrandt used the light to focus on particular details, like the captain’s gesturing hand and the young girl in the foreground. She was the company mascot.\r\n",
    "principalMaker": "Rembrandt van Rijn",
    "artistRole": null,
    "associations": [ ],
    "acquisition": {  
      "method": "bruikleen",
      "date": "1808-01-01T00:00:00",
      "creditLine": "Bruikleen van de gemeente Amsterdam"
    },
    "exhibitions": [ ],
    "materials": [
      "doek",
      "olieverf"
    ],
    "techniques":[ ],
    "productionPlaces": [  
      "Amsterdam"
    ],
    "dating":{  
      "presentingDate": "1642",
      "sortingDate": 1642,
      "period": 17,
      "yearEarly": 1642,
      "yearLate": 1642
    },
    "classification": {  
      "iconClassIdentifier": [  
        "45(+26)",
        // more results...
      ],
      // more results...
    },
    "hasImage": true,
    "historicalPersons": [  
      "Banninck Cocq, Frans",
      // more results...
    ],
    "inscriptions": [ ],
    "documentation": [  
      "The Rembrandt Database,  Object information, Rembrandt,  Civic guardsmen of Amsterdam under command of Banninck Cocq,  dated 1642, Rijksmuseum, Amsterdam, inv. no. SK-C-5, http://www.rembrandtdatabase.org/Rembrandt/painting/3063/civic-guardsmen-of-amsterdam-under-command-of-banninck-cocq, accessed 2016 February 01",
        // more results...
    ],
    "catRefRPK": [ ],
    "principalOrFirstMaker": "Rembrandt van Rijn",
    "dimensions": [  
      {  
        "unit": "cm",
        "type": "hoogte",
        "part": null,
        "value": "379,5"
      },
      // more results...
    ],
    "physicalProperties": [ ],
    "physicalMedium": "olieverf op doek",
    "longTitle": "De Nachtwacht, Rembrandt van Rijn, 1642",
    "subTitle": "h 379,5cm × b 453,5cm × g 337kg",
    "scLabelLine": "Rembrandt van Rijn (1606–1669), olieverf op doek, 1642",
    "label": {  
      "title": "De Nachtwacht",
      "makerLine": "Rembrandt van Rijn (1606–1669), olieverf op doek, 1642",
      "description": "Rembrandts beroemdste en grootste schilderij werd gemaakt voor de Kloveniersdoelen. Dit was een van de drie hoofdkwartieren van de Amsterdamse schutterij, de burgerwacht van de stad. Rembrandt was de eerste die op een schuttersstuk alle figuren in actie weergaf. De kapitein, in het zwart, geeft zijn luitenant opdracht dat de compagnie moet gaan marcheren. De schutters stellen zich op. Met behulp van licht vestigde Rembrandt de aandacht op belangrijke details, zoals het handgebaar van de kapitein en het kleine meisje op de voorgrond. Zij is de mascotte van de schutters. De naam Nachtwacht is pas veel later ontstaan, toen men dacht dat het om een nachtelijk tafereel ging.",
      "notes": "Multimediatour, 500. Tekst aangeleverd door Jonathan Bikker.",
      "date": "2019-07-05"
    },
    "showImage": true,
    "location": "HG-2.31"
  },
  // more results...
}
```
</details>

## How it works
### Actor diagram

![Actor Diagram][https://github.com/MarjoleinAardewijn/web-app-from-scratch-1920/tree/master/images/actor-diagram-WAFS-1920-v2 "Actor Diagram"]

### Interaction diagram

![Interaction Diagram][https://github.com/MarjoleinAardewijn/web-app-from-scratch-1920/tree/master/images/interaction-diagram-WAFS-1920 "Interaction Diagram"]

## Feature Wishlist / Backlog

## Sources

The sources I used the most during the development of the app are:
- [Mozilla Developer Network](https://developer.mozilla.org/nl/docs/Web/JavaScript).
- [Stackoverflow](https://stackoverflow.com/).
- [Geeks for geeks](https://www.geeksforgeeks.org/).
- [Rijksmuseum API Documentation](https://data.rijksmuseum.nl/object-metadata/api/).
- [Tutorial republic](https://www.tutorialrepublic.com/).
- [W3Schools](https://www.w3schools.com/).

## Credits

- [Routie](https://codepen.io/joostf/pen/jOPPMLK).
- User Input:
  - [Get value of an input field](https://www.tutorialrepublic.com/faq/how-to-get-the-value-of-text-input-field-using-javascript.php).
  - [Regex](https://stackoverflow.com/questions/441018/replacing-spaces-with-underscores-in-javascript).
- [Clear DIV](https://www.geeksforgeeks.org/how-to-clear-the-content-of-a-div-using-javascript/).
- [README](https://github.com/RooyyDoe/web-app-from-scratch-1920).