import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Card from '../components/Card'
import axios from 'axios'
import { Link, useParams } from "react-router-dom"

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

const Home = ({ type }) => {
  const [movies, setMovies] = useState([])
  const { id } = useParams ();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/movie/popular', //`https://api.themoviedb.org/3/movie/popular/${type}`
          {
            params: {
              api_key: process.env.REACT_APP_TMDB_API_KEY,
              language: 'en-US',
              page: 8,
            },
          }
        )
        setMovies(response.data.results)
        console.log(response.data.results);
      } catch (err) {
        console.log(err)
      }
    }

    fetchMovies()
  }, [type])

  return (
    <Container>
      {movies.map((movie) => (
        <Card key={movie.id} movie={movie} >
          <Link to={`/video/${movie.id}`}>{movie.name}</Link>
          {movie.name}
        </ Card>
        
        
      ))}
     
      

    </Container>
  )
}

export default Home
