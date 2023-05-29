import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styled, { css } from 'styled-components'

export default function SeatsPage() {
   const { idSessao: sessionID } = useParams()
   const navigate = useNavigate()
   const seatList_URL = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${sessionID}/seats`
   const [session, setSession] = useState([])
   
   const [ids, setIds] = useState([])
   const [username, setUsername] = useState('')
   const [userCPF, setUserCPF] = useState('')


   useEffect(() => {
      axios.get(seatList_URL).then((response) => setSession(response.data))
   }, [])

   const { id, name, day, movie, seats } = session

   const selectSeat = (seat) => {
      if (seat.isAvailable) {
         if (!ids.includes(seat.id)) {
            setIds([...ids, seat.id])
         } else {
            const copyArr = [...ids]
            copyArr.splice(ids.indexOf(seat.id), 1)
            setIds(copyArr)
         }
      } else {
         alert('Esse assento não está disponível')
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
                        data-test="seat"
                        key={seat.id}
                        clicked={ids.includes(seat.id)}
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
            <form
               onSubmit={() => {
                  event.preventDefault()
                  if (ids.length === 0) {
                     alert('Selecione, no mínimo, 1 assento.')
                  } else {
                     
                     axios.post('https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many', {
                        ids: ids,
                        name: username,
                        cpf: userCPF
                     })
                     .then(response => {
                        if(response.status === 200) {
                           let ticket = {
                              ids: ids,
                              name: username,
                              cpf: userCPF
                           }
                           navigate('/sucesso', { state: { ticket, sessionID } })
                        }
                     })
                  }
               }}
            >
               <input
                  type="text"
                  data-test="client-name"
                  required
                  placeholder="Digite seu nome..."
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
               />
               CPF do Comprador:
               <input
                  value={userCPF}
                  type="number_format"
                  data-test="client-cpf"
                  required
                  minLength="11"
                  maxLength="11"
                  placeholder="Digite seu CPF..."
                  onChange={(e) => {setUserCPF(e.target.value)}}
               />
               <button data-test="book-seat-btn" type="submit">
                  Reservar Assento(s)
               </button>
            </form>
         </FormContainer>
         <FooterContainer data-test="footer">
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
   #button {
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
