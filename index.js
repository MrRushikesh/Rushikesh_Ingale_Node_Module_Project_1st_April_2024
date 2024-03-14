const fs = require('fs');
const moment = require('moment');

//1. Parsing Datasets -: 

const movieData = JSON.parse(fs.readFileSync('./data/movie_data.json'));
const relatedUsers = JSON.parse(fs.readFileSync('./data/related_users.json'));
const userData = JSON.parse(fs.readFileSync('./data/user_data.json'));
const userPreferences = JSON.parse(fs.readFileSync('./data/user_preference.json'));

// console.log(movieData);
// console.log(relatedUsers);
// console.log(userData);
// console.log(userPreferences);


console.log("Loading....")


//2. Building The Scoring System -: 
//a. calculate Gaussian Decay Function for Time Delta. 
function gaussianDecay(releaseDate) {
  const sigma = 365; //standard deviation in days (1 year)
  const now = moment(); //current date
  const release = moment(releaseDate, "M/D/YYYY"); //relase date
  const deltaDays = now.diff(release, 'days'); //currentDate - relaseDate difference
  return Math.exp(-Math.pow(deltaDays, 2) / (2 * sigma * sigma)); //this formulae return score
}

// let releaseDate = movieData[0].release_date
// console.log(gaussianDecay(releaseDate))


// b. Calculate User's Preference Score for a Movie
function calculateUserPreferenceScore(userPreference, movieGenres) {
  let score = 0;
  movieGenres.forEach(genre => {
    const pref = userPreference.find(pref => pref.genre === genre);
    score += pref ? pref.preference_score : 0;
  });
  return score / movieGenres.length; // Average score across movie genres
}

// c. Calculate Average Related Users' Preference Score
function calculateAverageRelatedUsersScore(userId, relatedUsers, userPreferences, movieGenres) {
  const relatedIds = relatedUsers[userId].map(user => user.user_id);

  let totalScore = 0;
  let count = 0;
  relatedIds.forEach(id => {
    const userPref = userPreferences.find(pref => pref.user_id === id);
    if (userPref) {
      const score = calculateUserPreferenceScore(userPref.preference, movieGenres);
      totalScore += score;
      count++;
    }
  });

  return count > 0 ? totalScore / count : 0;
}


//3. Generating the Personalized Feed
function generatePersonalizedFeed(movieData, relatedUsers, userPreferences) {
  const personalizedFeeds = {};

  // Iterate through each user
  userData.forEach(user => {
    const userId = user.user_id;

    // Get user's preferences
    const userPref = userPreferences.find(pref => pref.user_id === userId);

    if (userPref) {
      personalizedFeeds[userId] = movieData.map(movie => {
        const timeScore = gaussianDecay(movie.release_date);
        const userScore = calculateUserPreferenceScore(userPref.preference, movie.genres);
        const relatedUsersScore = calculateAverageRelatedUsersScore(userId, relatedUsers, userPreferences, movie.genres);

        // Overall score calculation
        const overallScore = (timeScore + userScore + relatedUsersScore) / 3;

        return {
          movie_id: movie.movie_id,
          movie_name: movie.movie_name,
          genres: movie.genres,
          release_date: movie.release_date,
          score: overallScore
        };
      });

      // Sort personalized feed for this user
      personalizedFeeds[userId].sort((a, b) => b.score - a.score);

      // Get top 10 movies
      personalizedFeeds[userId] = personalizedFeeds[userId].slice(0, 10);
    } else {
      personalizedFeeds[userId] = [];
    }
  });

  return personalizedFeeds;
}

const personalizedFeed = generatePersonalizedFeed(movieData, relatedUsers, userPreferences);

//Display Each User Personalized Feed -: 
function personalizedFeedforParticularUser(userId) {
  const topTenMovie = personalizedFeed[userId]
  // console.log(topTenMovie)
  let particulatMovieResult = []
  topTenMovie.map((movie, index) => {
    let out = `${index + 1}. Movie Name -: ${movie.movie_name} || Genres -:  (${movie.genres.join(', ')}) || Release Date -:  ${movie.release_date} || Score -: ${movie.score} \n`
    particulatMovieResult += out;
  })
  return particulatMovieResult
}


//Enter User Id Here -: 

// const particularUserId = 115 //display for particular User
const particularUserId = null; //comment display for All User

if (particularUserId) {

  console.log(personalizedFeedforParticularUser(particularUserId))

} else {

  // Display all user personalized feed  //
  Object.keys(personalizedFeed).forEach(userId => {
    console.log(`User ID: ${userId}`);
    personalizedFeed[userId].forEach((movie, index) => {
      console.log(`${index + 1}. ${movie.movie_name} (${movie.genres.join(', ')}) - Score: ${movie.score}`);
    });
    console.log("---------------------------------------------------");
  });

}



//------------------------------------------------------------------------------------------------------------

// Display all user personalized feed  //

// Object.keys(personalizedFeed).forEach(userId => {
//     console.log(`User ID: ${userId}`);
//     personalizedFeed[userId].forEach((movie, index) => {
//         console.log(`${index + 1}. ${movie.movie_name} (${movie.genres.join(', ')}) - Score: ${movie.score}`);
//     });
//     console.log("---------------------------------------------------");
// });







