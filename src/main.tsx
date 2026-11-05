import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppHeader from './Components/AppHeader.tsx'
import UserList from './Components/UserList.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppHeader/>
    <UserList />
  </StrictMode>,
)
