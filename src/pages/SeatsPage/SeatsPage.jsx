import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import styled, { css } from 'styled-components'

export default function SeatsPage({ sessionID }) {
   const seatList_URL = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${sessionID}/seats`
   const [session, setSession] = useState([])
   const [arrClicked, setArrClicked] = useState([])

   const [ticket, setTicket] = useState({
      ids: [],
      name: '',
      cpf: ''
   })

   useEffect(() => {
      axios.get(seatList_URL).then((response) => setSession(response.data))
   }, [])

   const { id, name, day, movie, seats } = session

   const selectSeat = (seat, index) => {
      if (seat.isAvailable) {
         if (!arrClicked.includes(seat.id)) {
            setArrClicked([...arrClicked, seat.id])
         } else {
            const copyArr = [...arrClicked]
            copyArr.splice(arrClicked.indexOf(seat.id), 1)
            setArrClicked(copyArr)
         }
      }
   }

   return (
      <PageContainer>
         Selecione o(s) assento(s)
         <SeatsContainer>
            {seats &&
               seats.map((seat, index) => {
                  return (
                     <SeatItem
                        key={seat.id}
                        clicked={arrClicked.includes(seat.id)}
                        status={seat.isAvailable}
                        onClick={() => selectSeat(seat, index)}
                     >
                        {seat.name}
                     </SeatItem>
                  )
               })}
         </SeatsContainer>
         <CaptionContainer>
            <CaptionItem>
               <CaptionCircle value="Selecionado" />
               Selecionado
            </CaptionItem>
            <CaptionItem>
               <CaptionCircle value="Disponível" />
               Disponível
            </CaptionItem>
            <CaptionItem>
               <CaptionCircle value="Indisponível" />
               Indisponível
            </CaptionItem>
         </CaptionContainer>
         <FormContainer>
            Nome do Comprador:
            <input
               placeholder="Digite seu nome..."
               onChange={(e) => {
                  ticket.name = e.target.value
                  setTicket(ticket)
               }}
            />
            CPF do Comprador:
            <input
               minLength="11"
               maxLength="11"
               placeholder="Digite seu CPF..."
               onChange={(e) => {
                  ticket.cpf = e.target.value
                  setTicket(ticket)
               }}
            />
            <button
               onClick={() => {
                  ticket.ids = arrClicked
                  setTicket(ticket)
               }}
            >
               Reservar Assento(s)
            </button>
         </FormContainer>
         <FooterContainer>
            <div>
               <img src={movie && movie.posterURL} alt="poster" />
            </div>
            <div>
               <p>{movie && movie.title}</p>
               <p>
                  {day && day.weekday} - {name}
               </p>
            </div>
         </FooterContainer>
      </PageContainer>
   )
}

const PageContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   font-family: 'Roboto';
   font-size: 24px;
   text-align: center;
   color: #293845;
   margin-top: 30px;
   padding-bottom: 120px;
   padding-top: 70px;
`
const SeatsContainer = styled.div`
   width: 330px;
   display: flex;
   flex-direction: row;
   flex-wrap: wrap;
   align-items: center;
   justify-content: center;
   margin-top: 20px;
`
const FormContainer = styled.div`
   width: calc(100vw - 40px);
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   margin: 20px 0;
   font-size: 18px;
   button {
      align-self: center;
   }
   input {
      width: calc(100vw - 60px);
   }
`
const CaptionContainer = styled.div`
   display: flex;
   flex-direction: row;
   width: 300px;
   justify-content: space-between;
   margin: 20px;
`
const CaptionCircle = styled.div`
   ${({ value }) => {
      switch (value) {
         case 'Selecionado':
            return css`
               background: #1aae9e;
               border: 1px solid #0e7d71;
            `
            break
         case 'Indisponível':
            return css`
               background: #fbe192;
               border: 1px solid #f7c52b;
            `
            break

         default:
            return css`
               background: #c3cfd9;
               border: 1px solid #7b8b99;
            `
            break
      }
   }}
   height: 25px;
   width: 25px;
   border-radius: 25px;
   display: flex;
   align-items: center;
   justify-content: center;
   margin: 5px 3px;
`
const CaptionItem = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   font-size: 12px;
`
const SeatItem = styled.div`
   ${({ status }) => {
      switch (status) {
         case true:
            return css`
               background: #c3cfd9;
               border: 1px solid #7b8b99;
            `
            break
         case false:
            return css`
               background: #fbe192;
               border: 1px solid #f7c52b;
            `
            break

         default:
            break
      }
   }};

   ${({ clicked }) => {
      if (clicked) {
         return css`
            background: #1aae9e;
            border: 1px solid #0e7d71;
         `
      }
   }}

   height: 25px;
   width: 25px;
   border-radius: 25px;
   font-family: 'Roboto';
   font-size: 11px;
   display: flex;
   align-items: center;
   justify-content: center;
   margin: 5px 3px;
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
