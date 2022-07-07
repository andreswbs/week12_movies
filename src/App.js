import React, {useState, useEffect} from 'react';
import './App.css';
import MovieDetails from './MovieDetails';

function App() {
  const [movies, setMovies] = useState([])
  const [searchWord, setSearchWord] = useState('destiny')
  const [pageIndex, setPageIndex] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [activeMovieIndex, setActiveMovieIndex] = useState(0)

  useEffect(() => {
    setPageIndex(1)
    setTotalPages(1)
  }, [searchWord])
  
  const readMovies = async (index) => {
    if (index < 1) {
      index = pageIndex
    }
    const response = await fetch(`
    https://api.themoviedb.org/3/search/movie?api_key=24c64ea903d3b9426c0b72f5af3d2813&language=en-US&query=${searchWord}&page=${index}&include_adult=false
    `)
    const result = await response.json()
    console.log(result)
    setMovies(()=> result.results)
    setTotalPages(result.total_pages)
    setPageIndex(result.page)
  }

  const moviesList = movies.map((movie, index) => {
    return (
    <li key={index} onClick={()=> {
      console.log("Click on movie " + index)
      setActiveMovieIndex(index)
      }}>
      <h3>{movie.title}</h3>
    </li>
    )
  })

  const naviageNextPage = () => {
    if (pageIndex === totalPages) {
      return
    }
    readMovies(pageIndex + 1)
  }

  let movie = false
  if (movies.length > 1) {
    movie = movies[0]
  }

  let navigationButtons = ''
  if (movies.length > 0) {
    navigationButtons = (
      <div className='nav-buttons'>
        <button
          onClick={()=> readMovies(pageIndex - 1)}
          disabled= {pageIndex === 1}
        >
          Previous Page
        </button>
          {pageIndex} / {totalPages}
        <button 
          onClick={naviageNextPage} 
          disabled={pageIndex === totalPages} 
        >
          Next Page
        </button>
      </div>
    )
  }

  return (
      <div className='container'>
        <div className='left-pane'>
          <h1>Movies</h1>
          <input type="text" value={searchWord} onChange={(event) => setSearchWord(event.target.value) } />
          <button onClick={readMovies} >Search</button>
          <div>
            {navigationButtons}
            <ul>
              {moviesList}
            </ul>
          </div>
        </div>
      </div>
  );
}

export default App;
