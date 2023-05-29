import styled from 'styled-components'
import HomePage from './pages/HomePage/HomePage'
import SeatsPage from './pages/SeatsPage/SeatsPage'
import SessionsPage from './pages/SessionsPage/SessionsPage'
import SuccessPage from './pages/SuccessPage/SuccessPage'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

export default function App() {
   axios.defaults.headers.common['Authorization'] = 'u8MlXsm5Fu0Q0epdCuMQG1cQ'
   const URL_GET_IMAGES = 'https://mock-api.driven.com.br/api/v8/cineflex/movies'
   const [arrayMovies, setArrayMovies] = useState([])

   useEffect(() => {
      axios.get(URL_GET_IMAGES).then((response) => {
         setArrayMovies(response.data)
      })
   }, [])

   return (
      <BrowserRouter>
      <Link to='/'>
         <NavContainer>CINEFLEX</NavContainer>
         </Link>

         <Routes>
            <Route path='/' element={<HomePage movies={arrayMovies} />}/>
            <Route path='/sessoes/:idFilme' element={<SessionsPage />}/>
            <Route path='/assentos/:idSessao' element={<SeatsPage />}/>
            <Route path='/sucesso' element={<SuccessPage />}/>
         </Routes>
      </BrowserRouter>
   )
}

const NavContainer = styled.div`
   width: 100%;
   height: 70px;
   display: flex;
   align-items: center;
   justify-content: center;
   background-color: #c3cfd9;
   color: #e8833a;
   font-family: 'Roboto', sans-serif;
   font-size: 34px;
   position: fixed;
   top: 0;
   a {
      text-decoration: none;
      color: #e8833a;
   }
`
