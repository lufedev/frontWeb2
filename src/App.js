import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./login/login.js"
import Cadastro from "./cadastro/cadastro.js"
import Painel from "./usuario/painel.js"
import AddJogo from "./usuario/addJogo.js";
function App() {
  const token = localStorage.getItem("token");


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/painel" element={<Painel />} />
        <Route path="/add-jogo" element={<AddJogo />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App;
