import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'

export default function SessionsPage() {
   const {idFilme : movieID} = useParams()
   const movie_URL = `https://mock-api.driven.com.br/api/v8/cineflex/movies/${movieID}/showtimes`
   const [movie, setMovie] = useState([])

   useEffect(() => {
      axios.get(movie_URL).then((response) => {
         setMovie(response.data)
      })
   }, [])

   const { days: arrayOfAvailableDays } = movie

   return (
      <PageContainer>
         Selecione o horário
         <div>
            {arrayOfAvailableDays && arrayOfAvailableDays.map((day) => {
               const { id, weekday, date, showtimes } = day
               /* console.log(day) */
               return (
                  <SessionContainer key={id}>
                     {weekday} - {date}
                     <ButtonsContainer>
                        {showtimes.map(time => (
                        <Link key={time.id} to={`/assentos/${time.id}`}>
                        <button>{time.name}</button>
                        </Link>
                        ))}
                     </ButtonsContainer>
                  </SessionContainer>
               )
            })}
         </div>
         <FooterContainer>
            <div>
               <img
                  src={movie.posterURL}
                  alt="poster"
               />
            </div>
            <div>
               <p>{movie.title}</p>
            </div>
         </FooterContainer>
      </PageContainer>
   )
}

const PageContainer = styled.div`
   display: flex;
   flex-direction: column;
   font-family: 'Roboto';
   font-size: 24px;
   text-align: center;
   color: #293845;
   margin-top: 30px;
   padding-bottom: 120px;
   padding-top: 70px;
   div {
      margin-top: 20px;
   }
`
const SessionContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   font-family: 'Roboto';
   font-size: 20px;
   color: #293845;
   padding: 0 20px;
`
const ButtonsContainer = styled.div`
   display: flex;
   flex-direction: row;
   margin: 20px 0;
   button {
      margin-right: 20px;
   }
   a {
      text-decoration: none;
   }
`
const FooterContainer = styled.div`
   width: 100%;
   height: 120px;
   background-color: #c3cfd9;
   display: flex;
   flex-direction: row;
   align-items: center;
   font-size: 20px;
   position: fixed;
   bottom: 0;

   div:nth-child(1) {
      box-shadow: 0px 2px 4px 2px #0000001a;
      border-radius: 3px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: white;
      margin: 12px;
      img {
         width: 50px;
         height: 70px;
         padding: 8px;
      }
   }

   div:nth-child(2) {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      p {
         text-align: left;
         &:nth-child(2) {
            margin-top: 10px;
         }
      }
   }
`
