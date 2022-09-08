# Wordle-Clone
A recreation of The New York Time's web-based word game "Wordle", with a few additional features.

Created using Javascript, HTML and CSS, this Wordle clone also provides options for either 4 or 5-letter words and choice of words source, whether that being the existing word banks or an API that pulls words from the [Letterpress word list](https://github.com/lorenbrichter/Words).

<img src="https://user-images.githubusercontent.com/34701993/188786005-cc8530bb-1be9-457a-8774-9d499a6f965a.png" width="500" >

# How to Get Started
Once the project is cloned and opened in the desired IDE workspace, simply open the `index.html` file in the web browser and start playing.

For using the API word list, [Node.js](https://nodejs.org/en/) will be required for installing and running the API and local server.

To test if Node was downloaded successfully, input the following command to see the installed version,

### `node -v`

Once Node.js is installed, the API must be downloaded. For this project an API called [an-array-of-english-words](https://www.npmjs.com/package/an-array-of-english-words) that pulls every word from the Letterpress word list was used for the extended word bank option.

To begin, install the API with the following command,

### `npm install an-array-of-english-words`

After installation is complete, start the local server and word filtering script in `api.js` by running the command,

### `node api.js`

Once completed, a message reading `Server is running on localhost:8080` will confirm the connection was successful. Finally, reloading the web page will give full access to either word banks for play.

# How To Play
The rules for Wordle are simple, a word is generated at random and the user is to guess that word within a given number of tries. Ever guess gives context clues to the user to help them in figuring out the randomly generated word. These clues are based on the letters for the given guess and mean as follow,

+ **Gray** - The letter is not in the generated word.

+ **Yellow** - The letter is in the generated word, but in the wrong spot.

+ **Green** - The letter is in the generated word and in the right spot.

For this Wordle clone there are additional options/gameplay compared to the original Wordle and do as follow,

+ **4-LETTERS** - A smaller 4x5 Wordle grid variation.

+ **5-LETTERS** - The original 5x6 Wordle grid variation.

+ **WORD BANKS** - Uses the hard coded word banks scripts within the project for guessing and generating a new word.

+ **API** - Uses the API Letterpress list of words for guessing and generating a new word.
