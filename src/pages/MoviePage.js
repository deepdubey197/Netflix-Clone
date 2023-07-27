import React from 'react';
import { useState, useEffect } from 'react';
import TopNav from '../components/TopNav';
import styled from 'styled-components';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
const API_KEY = '3456179555fd68656e4951b27bdc3c31';
const API_URL = 'https://api.themoviedb.org/3/discover/movie';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const genres = [
  'Action',
  'Adventure',
  'Comedy',
  'Drama',
  'Fantasy',
  // Add more genres as needed
];

const MovieCard = styled.div`
  width: 250px;
  margin: 10px;
  border-radius: 8px;
  padding: 20px;
  padding-bottom: 300px;
  height: 200px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const MovieImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
`;

const MovieTitle = styled.h3`
  font-size: 18px;
  margin: 10px 0;
  color: white;
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 40%;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 2rem;
  z-index: 1;
`;

const Divider = styled.div`
display: flex;
align-items: center;
gap: 20px;
margin-top: 50px;
color: white;
font-size: 1.2rem;
background-color: #232323;
`;

const TextContainer = styled.div`
flex: 1;
margin-left: 100px;
padding-bottom: 100px;
`;


export const PrevArrow = styled(ArrowButton)`
  left: 10px;
`;

export const NextArrow = styled(ArrowButton)`
  right: 10px;
`;

const Netflix = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [mustWatchMovies, setMustWatchMovies] = useState([]);
  const [highlyRatedMovies, setHighlyRatedMovies] = useState([]);
  const [mostViewedMovies, setMostViewedMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const getGenreId = (genre) => {
    switch (genre) {
      case 'Adventure':
        return 12;
      case 'Action':
        return 28;
      case 'Comedy':
        return 35;
      case 'Drama':
        return 18;
      case 'Fantasy':
        return 14;
      // Add more cases for other genres as needed
      default:
        return null;
    }
  };

  


  const filterByGenre = (genre) => {
    setSelectedGenre(genre);
  };

  const filteredMovies = selectedGenre
    ? movies.filter((movie) => movie.genre_ids.includes(getGenreId(selectedGenre)))
    : movies;

   

  

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const allMovies = [];
        let currentPage = 1;
        while (allMovies.length < 120) {
          const response = await axios.get(API_URL, {
            params: {
              api_key: API_KEY,
              sort_by: 'popularity.desc',
              language: 'en-US',
              page: currentPage,
            },
          });
          allMovies.push(...response.data.results);
          currentPage++;
        }
        setMovies(allMovies);

        // Filter movies for different sliders
        setTrendingMovies(allMovies.slice(0, 30));
        setMustWatchMovies(allMovies.slice(30, 60));
        setHighlyRatedMovies(allMovies.slice(60, 90));
        setMostViewedMovies(allMovies.slice(90, 120));
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, []);




 

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    prevArrow: <PrevArrow />, 
    nextArrow: <NextArrow />,
  };

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <HeroContainer>
      <div className='hero'>
        <div className='overlay'></div>
        <TopNav isScrolled={isScrolled} />

        <img
          className='background-image'
          src='https://images2.alphacoders.com/132/1321797.jpeg'
          alt='hero image'
        />
        <div className='container'>
          <div className='title'>
            <h1>Bird Box Barcelona</h1>
            <p>
            As a mysterious force decimates humanity, a sinister new threat grows in this Barcelona-set film that expands the story of the blockbuster "Bird Box."
            </p>
          </div>
          <div className='buttons'>
            <button onClick={() => navigate('/player')} className='playBtn'>
              Play<i class='bx bx-play'></i>
            </button>
            <button className='moreBtn'>My List<i class='bx bx-plus'></i></button>
          </div>
        </div>
      </div>

      <h2 style={{ color: 'white', marginTop: '50px', marginLeft: '30px' }}>Trending On Netflix</h2>

      <Slider {...sliderSettings}>
        {trendingMovies.map((movie) => (
          <MovieCard key={movie.id}
          onClick={() => navigate('/player')}>
            <MovieImage src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
            <MovieTitle>{movie.title}</MovieTitle>
          </MovieCard>
        ))}
      </Slider>


      <h2 style={{ color: 'white', marginTop: '30px', marginLeft: '30px' }}>Most Viewed Movies</h2>
      <Slider {...sliderSettings}>
        {mustWatchMovies.map((movie) => (
          <MovieCard key={movie.id}
          onClick={() => navigate('/player')}>
            <MovieImage src={IMAGE_BASE_URL + movie.poster_path} alt={movie.title} />
            <MovieTitle>{movie.title}</MovieTitle>
          </MovieCard>
        ))}
      </Slider>

      <h2 style={{ color: 'white', marginTop: '30px', marginLeft: '30px' }}>Top Picks</h2>
      <Slider {...sliderSettings}>
        {highlyRatedMovies.map((movie) => (
          <MovieCard key={movie.id}
          onClick={() => navigate('/player')}>
            <MovieImage src={IMAGE_BASE_URL + movie.poster_path} alt={movie.title} />
            <MovieTitle>{movie.title}</MovieTitle>
          </MovieCard>
        ))}
      </Slider>

      <h2 style={{ color: 'white', marginTop: '30px', marginLeft: '30px' }}>Must Watch</h2>
      <Slider {...sliderSettings}>
        {mostViewedMovies.map((movie) => (
          <MovieCard key={movie.id}
          onClick={() => navigate('/player')}>
            <MovieImage src={IMAGE_BASE_URL + movie.poster_path} alt={movie.title} />
            <MovieTitle>{movie.title}</MovieTitle>
          </MovieCard>
        ))}
      </Slider>

      {/* Add genre filter buttons */}
      <div style={{ display: 'flex', justifyContent: 'center',paddingTop:'70px' }}>
  {genres.map((genre) => (
    <button
      key={genre}
      onClick={() => filterByGenre(genre)}
      style={{
        
        display: 'inline-block',
        width: '6em',
        height: '2.6em',
        lineHeight: '2.5em',
        overflow: 'hidden',
        margin: '20px',
        fontSize: '17px',
        zIndex: '1',
        color: 'white',
        backgroundColor: 'red',
        borderRadius: '6px',
        position: 'relative',
        fontFamily: 'Noto Sans',
        fontWeight: '600',
        cursor: 'pointer',

      }}
    >
      {genre}
      {/* Pseudo-element style */}
 
    </button>
  ))}
  <button
    onClick={() => filterByGenre(null)}
    style={{
      display: 'inline-block',
        width: '6em',
        height: '2.6em',
        lineHeight: '2.5em',
        overflow: 'hidden',
        margin: '20px',
        fontSize: '17px',
        zIndex: '1',
        color: 'white',
        backgroundColor: 'red',
        borderRadius: '6px',
        position: 'relative',
        fontFamily: 'Noto Sans',
        fontWeight: '600',
        cursor: 'pointer',
        
    }}
  >
    All Genres
  </button>
</div>

<div style={{flexWrap:'wrap',display:'flex',justifyContent:'center',paddingBottom:'500px'}}>
        {filteredMovies.map((movie) => (
            <MovieCard key={movie.id}
            onClick={() => navigate('/player')}>
              <MovieImage src={IMAGE_BASE_URL + movie.poster_path} alt={movie.title} />
              <MovieTitle>{movie.title}</MovieTitle>
            </MovieCard>
        ))}

        
      </div>

      <Divider>
        <TextContainer >
            <h5 style={{fontWeight:'400'}}>Questions?  <u>Call 000-800-919-1694</u></h5><br/><br/>
            <ul style={{fontWeight:'300',fontSize:'0.83em',cursor:'pointer'}}><u>FAQ</u></ul><br/>
            <ul style={{fontWeight:'300',fontSize:'0.83em',cursor:'pointer'}}><u>Media Centre</u></ul><br/>
            <ul style={{fontWeight:'300',fontSize:'0.83em',cursor:'pointer'}}><u>Ways to Watch</u></ul><br/>
            <ul style={{fontWeight:'300',fontSize:'0.83em',cursor:'pointer'}}><u>Cookie Preferences</u></ul><br/>
            <a href='https://fast.com/'><ul style={{color:'white',fontWeight:'300',fontSize:'0.83em'}}><u>Speed Test</u></ul></a>
        </TextContainer>

        <TextContainer >
            <br/><br/><br/><br/>
            <ul style={{fontWeight:'300',fontSize:'0.83em',cursor:'pointer'}}><u>Help Centre</u></ul><br/>
            <ul style={{fontWeight:'300',fontSize:'0.83em',cursor:'pointer'}}><u>Investor Relations</u></ul><br/>
            <ul style={{fontWeight:'300',fontSize:'0.83em',cursor:'pointer'}}><u>Terms of Use</u></ul><br/>
            <ul style={{fontWeight:'300',fontSize:'0.83em',cursor:'pointer'}}><u>Corporate Information</u></ul><br/>
            <ul style={{fontWeight:'300',fontSize:'0.83em',cursor:'pointer'}}><u>Legal Notices</u></ul><br/>
        </TextContainer>


        <TextContainer >
            <br/><br/><br/><br/>
            <ul style={{fontWeight:'300',fontSize:'0.83em',cursor:'pointer'}}><u>Account</u></ul><br/>
            <ul style={{fontWeight:'300',fontSize:'0.83em',cursor:'pointer'}}><u>Jobs</u></ul><br/>
            <ul style={{fontWeight:'300',fontSize:'0.83em',cursor:'pointer'}}><u>Privacy</u></ul><br/>
            <ul style={{fontWeight:'300',fontSize:'0.83em',cursor:'pointer'}}><u>Contact Us</u></ul><br/>
            <ul style={{fontWeight:'300',fontSize:'0.83em',cursor:'pointer'}}><u>Only on Netflix</u></ul><br/>
        </TextContainer>

        
        </Divider>


      
      




    </HeroContainer>
  );
};

const HeroContainer=styled.div`

  /*.card-arrange{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }*/

  

  .hero {
    position: relative;
  }

  .background-image {
    width: 100%;
    height: ;
    z-index: 1;
  }

  .overlay{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Adjust the alpha value to control darkness */
    z-index: 0;

  }

  .container {
    position: absolute;
    top: 65%;
    left: 30%;
    transform: translate(-50%, -50%);
    text-align: center;
    

    .buttons {
      display: flex;
      margin-top: 2rem;
      gap: 2rem;
      margin-left: 120px;
      position: sticky;
      
      
    }
    .playBtn{
      display: flex;
      align-items: center;
      justify-content: center;
      color: red;
      border-radius: 1rem;
      font-size: 1.4rem;
      gap:1rem;
      padding:0.9rem;
      padding-left: 2rem;
      padding-right: 0.8rem;
      border: none;
      cursor: pointer;
      font-family: 'Noto Sans', sans-serif;
      font-weight: 800;
      

    }
    .moreBtn{
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      background-color: black;
      border-radius: 1rem;
      font-size: 1.4rem;
      gap:0.8rem;
      padding:0.9rem;
      padding-left: 1.7rem;
      padding-right: 1.0rem;
      border: 0.1rem solid white;
      cursor: pointer;
      font-family: 'Noto Sans', sans-serif;
      font-weight: 800;
     


    }

    .title{
      
      h1{
        margin-right: 90px;
        margin-left: 110px;
        font-size: 70px;
        font-weight: 900;
        /*background: -webkit-linear-gradient(#eee, rgb(128,13,13));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;*/
        color: white;
        text-align: left;
        font-family: 'Noto Sans', sans-serif;
        position: sticky;
      }
      p{
        margin-bottom: 30px;
        width: 640px;
        font-family: 'Noto Sans', sans-serif;
        color: white;
        text-align: left;
        font-weight: 500;
        padding-top: 10px;
        padding-left: 15px;
        position: sticky;
        margin-left: 100px;
      }
    }

    
      
    }

    


    
    
    `;

export default Netflix

