import React from 'react'
import { useSelector} from 'react-redux'
import { selectUser } from './../redux/userSlice'
import { Rating, Star } from '@mui/material';


function MovieReview({movie, base_url}) {

    const user = useSelector(selectUser);

    return (
        <div className="review">
            <img 
                className="review-poster"
                key={movie.id}
                src={`${base_url}${movie.poster_path}`} 
                alt={movie.title}
            />
            <div className="review-movie-info">
                <h1>{movie.title}</h1>
                <p>{movie.overview}</p>
                <h3>{movie.vote_average}/10 <span className="review-count">({movie.vote_count})</span></h3>
                <form>
                    <h2>{user.displayName}</h2>
                    <textarea type="text" placeholder='Enter Your Review Here' className="review-input"/>\
                    <Rating
                        className="review-rating"
                        max="10"
                    />
                </form>
                <button className="review-btn">Submit Review</button>
                <Rating
                    name="simple-controlled"
                    max={10}
                />
            </div>
        </div>
    )
}

export default MovieReview;
