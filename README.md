# Personalized Movie Feed Generator

#### This Node.js project is designed to create a personalized movie feed for users, similar to a simplified version of a Netflix movie recommendation system. The personalized feed is based on the user's genre preferences, the age of the movie, and the preferences of related users.

## Project Overview
- The project aims to provide a ranked feed of the top 10 movies for each user. The ranking is calculated based on the following factors:

1. Time Delta of Release Date: The age of the movie, with a Gaussian decay function applied.
2. User's Preference towards the Movie: Based on the genres in the movie and the user's preference score for each genre.
3. Preference towards the Movie by Related Users: Average of each related user's preference towards the movie.

## Getting Started

- Prerequisites

1. Node.js installed on your machine
2. Basic knowledge of JavaScript
3. Installation

- Clone the repository:
```bash
    git clone https://github.com/MrRushikesh/Rushikesh_Ingale_Node_Module_Project_1st_April_2024.git
```
- Navigate to the project directory:
```bash
    cd personalized-movie-feed
```

- Install dependencies:
```bash
    npm install
```


## Usage 

### Running the Script -: 

- Ensure the datasets are in the /data directory:

1. movie_data.json
2. related_users.json
3. user_data.json
4. user_preference.json


### Run the script -: 

```bash
    node index.js
```
## Functionality

### Scoring System -: 

1. Gaussian Decay Function: Calculates the time decay of the movie based on its release date.
2. User Preference Score: Calculates the user's preference score for a movie based on the genres.
3. Average Related Users' Preference Score: Calculates the average preference score of related users for a movie.

### Personalized Feed Generation- : 

1. generatePersonalizedFeed(movieData, relatedUsers, userPreferences): Main function to generate the personalized feed for each user.
- Iterates through each user and calculates the score for each movie.
- Sorts the movies based on the score and selects the top 10 for each user.

## Data Structures 

- The project uses the following data structures:

### Movie Data -: 

1. Each movie object includes:
- movie_id: Unique identifier for the movie.
- movie_name: Name of the movie.
- genres: Array of genres associated with the movie.
- release_date: Release date of the movie.

### Related Users:

1. Object where each key is a user ID and the value is an array of related users.
- Each related user object includes:
- user_id: Unique identifier for the related user.
- name: Name of the related user.

### User Data -: 

1. Array of user objects with:
- user_id: Unique identifier for the user.
- name: Name of the user.

### User Preferences -: 

1. Array of user preference objects with:
- user_id: Unique identifier for the user.
- preference: Array of preference objects with:
preference_score: Score indicating the user's preference for a genre.
genre: Genre for which the preference score applies.


## Project Structure 

- The project structure is as follows:

```bash

    personalized-movie-feed/
    ├── data/
    │   ├── movie_data.json
    │   ├── related_users.json
    │   ├── user_data.json
    │   └── user_preference.json
    ├── .gitignore
    ├── index.js
    ├── package.json
    └── README.md

```

- data/: Directory containing the provided datasets.
- index.js: Main script file containing the implementation.
- package.json: Node.js package file with project dependencies.
- README.md: Project documentation file.

## Deployment
- To deploy the project:

1. Ensure the datasets are in the /data directory.
2. Modify the script in index.js if needed.
3. Run the script using node index.js.