let addReview = false;

const addReviewButton = document.querySelector("#add-review-button");
const addReviewContainer = document.querySelector(".add-review-container");
addReviewButton.addEventListener("click", () => {
    addReview = !addReview;
    if (addReview) {
        addReviewContainer.style.display = "block";
    } else {
        addReviewContainer.style.display = "none";
    }
});

const toggleDarkModeButton = document.querySelector("#toggle-dark-mode");
const body = document.body;

toggleDarkModeButton.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
});

fetch(' http://localhost:3000/movies')
.then(response => response.json())
.then(movieData => RenderMovies(movieData))

function RenderMovies(movieObj) {

    const reviewCardContainer = document.querySelector('.review-box-container');

    movieObj.forEach(movie => {
        const reviewCard = document.createElement('div')
        reviewCard.className = 'review-box-card'
        
        const reviewCardHeader = document.createElement('div')
        reviewCardHeader.className = 'review-box-title'

        const movieTitle = document.createElement('h3')
        movieTitle.className = 'review-heading'
        movieTitle.id = 'movie-title-id'
        movieTitle.textContent = movie.title;

        const movieRating = document.createElement('h4')
        movieRating.className = 'review-heading'
        movieRating.id = 'movie-rating-id'
        movieRating.textContent = `Movie Rating: ${movie.rating}/5`;

        reviewCardHeader.appendChild(movieTitle)
        reviewCardHeader.appendChild(movieRating)

        const reviewCardPoster = document.createElement('div')
        reviewCardPoster.className = 'review-box-poster'

        const moviePoster = document.createElement('img');
        moviePoster.className = 'movie-poster-image'
        moviePoster.src = movie.poster;

        reviewCardPoster.appendChild(moviePoster)

        const reviewCardText = document.createElement('div')
        reviewCardText.className = 'review'

        const movieReview = document.createElement('p')
        movieReview.className = 'review-text'
        movieReview.textContent = movie.review;

        reviewCardText.appendChild(movieReview)

        const reviewCardFooter = document.createElement('div')
        reviewCardFooter.className = 'review-box-info'

        const movieReleaseDate = document.createElement('h4')
        movieReleaseDate.className = 'review-heading'
        movieReleaseDate.textContent = `Release Date: ${movie.releaseDate}`

        const movieDirector = document.createElement('h4')
        movieDirector.className = 'review-heading'
        movieDirector.textContent = `Director: ${movie.director}`

        const movieLikes = document.createElement('h4')
        movieLikes.className = 'review-heading'
        movieLikes.id = 'like-counter'
        movieLikes.textContent = `${movie.likes} Likes`

        const likeButton = document.createElement('button')
        likeButton.id = 'like-button'
        likeButton.textContent = '♥'

        reviewCardFooter.appendChild(movieReleaseDate)
        reviewCardFooter.appendChild(movieDirector)
        reviewCardFooter.appendChild(movieLikes)
        reviewCardFooter.appendChild(likeButton)

        reviewCard.appendChild(reviewCardHeader)
        reviewCard.appendChild(reviewCardPoster)
        reviewCard.appendChild(reviewCardText)
        reviewCard.appendChild(reviewCardFooter)

        reviewCardContainer.appendChild(reviewCard)

        movieTitle.addEventListener('mouseover', showMovieInfo)
        movieTitle.addEventListener('mouseout', hideTooltip);

        function showMovieInfo(event) {
            tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.innerHTML = `Movie Runtime: ${movie.runtime} mins<br>Movie Age Rating: PG${movie.ageCap}`
            document.body.appendChild(tooltip);

            tooltip.style.left = event.pageX + 'px';
            tooltip.style.top = event.pageY + 'px';
        }

        let tooltip = true;

        function hideTooltip() {
            if (tooltip) {
                tooltip.remove();
                tooltip = null;
            }
        }

        likeButton.addEventListener('click', () => {
            movie.likes++;
            movieLikes.textContent = `${movie.likes} Likes`;
          });
        
    })
}

function addNewMovie(movieObj){
    fetch('http://localhost:3000/movies', {
      method : 'POST',
  
      headers : {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
  
      body : JSON.stringify(movieObj)
    })
    .then(response => response.json())
    .then(movieData => console.log(movieData))

  }


const addMovieForm = document.querySelector('.add-review-form');
addMovieForm.addEventListener('submit', handleSubmitForm);

function handleSubmitForm(event) {
    event.preventDefault()

    let movieObj = {
        title: event.target['movie-title'].value,
        poster: event.target['movie-poster'].value,
        rating: event.target['movie-rating'].value,
        releaseDate: event.target['movie-release-date'].value,
        director: event.target['movie-director'].value,
        review: event.target['movie-review'].value,
        likes: 0,
        runtime: event.target['movie-runtime'].value,
        ageCap: event.target['movie-age-rating'].value
    }
    console.log(movieObj)


    RenderMovies([movieObj]);
    addNewMovie(movieObj);
}
