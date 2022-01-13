const API_KEY = '0f61def237ffa6f07320700ee78a6151';

const requests= {
    fetchTrending:`/trending/movie/week?api_key=${API_KEY}&language=en-us`,
    fetchTopRated:`/movie/top_rated?api_key=${API_KEY}&language=en-us`,
    fetchUpcoming:`/movie/upcoming?api_key=${API_KEY}&language=en-us`,
    fetchLatest:`/movie/latest?api_key=${API_KEY}&language=en-us`,
    fetchPopular:`/movie/popular?api_key=${API_KEY}&language=en-us`,
    fetchAction:`/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchAdventure:`/discover/movie?api_key=${API_KEY}&with_genres=12`,
    fetchAnimation:`/discover/movie?api_key=${API_KEY}&with_genres=16`,
    fetchComedy:`/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchDrama:`/discover/movie?api_key=${API_KEY}&with_genres=18`,
    fetchHorror:`/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchScienceFiction:`/discover/movie?api_key=${API_KEY}&with_genres=878`,
    fetchRomance:`/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchMusical:`/discover/movie?api_key=${API_KEY}&with_genres=10402`,
    fetchSearch:`/search/movie?api_key=${API_KEY}&query=`
}

export default requests;