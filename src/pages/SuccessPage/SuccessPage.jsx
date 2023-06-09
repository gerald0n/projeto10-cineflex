import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

export default function SuccessPage() {
   const navigate = useNavigate()
   const {ticket, sessionID, nameSelectedSeats} = useLocation().state;
   const [session, setSession] = useState([])

   const seatList_URL = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${sessionID}/seats`
   
   useEffect(() => {
      axios.get(seatList_URL).then((response) => setSession(response.data))
   }, [])

   const { day, movie, name, seats } = session
   
   
   return (
      <PageContainer>
         <h1>
            Pedido feito <br /> com sucesso!
         </h1>

         <TextContainer data-test="movie-info">
            <strong>
               <p>Filme e sessão</p>
            </strong>
            <p>{movie && movie.title}</p>
            <p>{day && `${day.date} - ${name}`}</p>
         </TextContainer>

         <TextContainer data-test="seats-info">
            <strong>
               <p>Ingressos</p>
            </strong>
            {nameSelectedSeats.map(seat => <p key={seat}>{`Assento ${seat}`}</p>)}
         </TextContainer>

         <TextContainer data-test="client-info">
            <strong>
               <p>Comprador</p>
            </strong>
            <p>Nome: {ticket.name}</p>
            <p>CPF: {ticket.cpf}</p>
         </TextContainer>

         <button 
         data-test="go-home-btn"
         onClick={() => {
            navigate('/')
         }}>Voltar para Home</button>
      </PageContainer>
   )
}

const PageContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   font-family: 'Roboto';
   font-size: 24px;
   color: #293845;
   margin: 30px 20px;
   padding-bottom: 120px;
   padding-top: 70px;
   a {
      text-decoration: none;
   }
   button {
      margin-top: 50px;
   }
   h1 {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 700;
      font-size: 24px;
      line-height: 28px;
      display: flex;
      align-items: center;
      text-align: center;
      color: #247a6b;
   }
`
const TextContainer = styled.div`
   width: 100%;
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   margin-top: 30px;
   strong {
      font-weight: bold;
      margin-bottom: 10px;
   }
`
