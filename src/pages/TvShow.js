import React, { useState, useEffect } from 'react';
import TopNav from '../components/TopNav';
import styled from 'styled-components';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


const API_KEY = '3456179555fd68656e4951b27bdc3c31';
const API_URL = 'https://api.themoviedb.org/3/discover/tv'; // Update the API URL for TV shows
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const genres = [
  'Action',
  'Adventure',
  'Comedy',
  'Drama',
  'Mystery',
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
  text-align: center; /* Align the title to the center */
  position: absolute; /* Position the title absolutely inside the MovieCard */
  bottom: 0; /* Place the title at the bottom of the MovieCard */
  left: 0;
  right: 0;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.7); /* Add a semi-transparent background for better visibility */
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
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

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tvShows, setTVShows] = useState([]);
  const [trendingTVShows, setTrendingTVShows] = useState([]);
  const [mustWatchTVShows, setMustWatchTVShows] = useState([]);
  const [highlyRatedTVShows, setHighlyRatedTVShows] = useState([]);
  const [mostViewedTVShows, setMostViewedTVShows] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  const getGenreId = (genre) => {
    switch (genre) {
      case 'Adventure':
        return 10759; // Update genre IDs for TV shows
      case 'Action':
        return 10759; // Update genre IDs for TV shows
      case 'Comedy':
        return 35;
      case 'Drama':
        return 18;
      case 'Mystery':
        return 9648;
      // Add more cases for other genres as needed
      default:
        return null;
    }
  };

  const fetchTVShows = async () => {
    try {
      const allTVShows = [];
      let currentPage = 1;
      while (allTVShows.length < 80) {
        const response = await axios.get(API_URL, {
          params: {
            api_key: API_KEY,
            sort_by: 'popularity.desc',
            language: 'en-US',
            page: currentPage,
          },
        });
        allTVShows.push(...response.data.results);
        currentPage++;
      }
      setTVShows(allTVShows);

      // Filter TV shows for different sliders
      setTrendingTVShows(allTVShows.slice(0, 20));
      setMustWatchTVShows(allTVShows.slice(20, 40));
      setHighlyRatedTVShows(allTVShows.slice(40, 60));
      setMostViewedTVShows(allTVShows.slice(60, 80));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTVShows();
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

  const filterByGenre = (genre) => {
    setSelectedGenre(genre);
  };

  const filteredTVShows = selectedGenre
    ? tvShows.filter((tvShow) => tvShow.genre_ids.includes(getGenreId(selectedGenre)))
    : tvShows;

  return (
    <HeroContainer>
      <div className='hero'>
        <div className='overlay'></div>
        <TopNav isScrolled={isScrolled} />

        <img
          className='background-image'
          src='https://www.edpost.com/hubfs/Imported_Blog_Media/13reasonswhy.png'
          alt='hero image'
        />
        <div className='container'>
          <div className='title'>
            <h1>13 Reasons Why</h1>
            <p>
              High school student Clay Jensen lands in the center of a series of heartbreaking mysteries set in motion by a friend's tragic suicide.
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
        {trendingTVShows.map((tvShow) => (
          <MovieCard key={tvShow.id}
          onClick={() => navigate('/player')}>
            <MovieImage src={`${IMAGE_BASE_URL}${tvShow.poster_path}`} alt={tvShow.title} />
            <MovieTitle>{tvShow.title}</MovieTitle>
          </MovieCard>
        ))}
      </Slider>


      <h2 style={{ color: 'white', marginTop: '30px', marginLeft: '30px' }}>Most Viewed</h2>
      <Slider {...sliderSettings}>
        {mustWatchTVShows.map((movie) => (
          <MovieCard key={movie.id}
          onClick={() => navigate('/player')}>
            <MovieImage src={IMAGE_BASE_URL + movie.poster_path} alt={movie.title} />
            <MovieTitle>{movie.title}</MovieTitle>
          </MovieCard>
        ))}
      </Slider>

      <h2 style={{ color: 'white', marginTop: '30px', marginLeft: '30px' }}>Highly Rated</h2>
      <Slider {...sliderSettings}>
        {highlyRatedTVShows.map((movie) => (
          <MovieCard key={movie.id}
          onClick={() => navigate('/player')}>
            <MovieImage src={IMAGE_BASE_URL + movie.poster_path} alt={movie.title} />
            <MovieTitle>{movie.title}</MovieTitle>
          </MovieCard>
        ))}
      </Slider>

      <h2 style={{ color: 'white', marginTop: '30px', marginLeft: '30px' }}>Must Watch</h2>
      <Slider {...sliderSettings}>
        {mostViewedTVShows.map((movie) => (
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
        {filteredTVShows.map((movie) => (
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
      padding-left: 10px;
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
        font-size: 73px;
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
      }
    }

    
      
    }

    


    
    
    `;

export default App



      
      
      
