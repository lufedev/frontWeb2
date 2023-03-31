import React from "react";
import "./cadastro.css";
import logo from "../login/logo-quina.png";
import { Link } from "react-router-dom";

function Signup() {
    return (
        <div className="container">
            <img src={logo} alt="Logo" className="logo" />
            <h1 className="title">Minha Quina</h1>
            <form className="form">
                <input className="input" type="text" placeholder="Nome Completo" />
                <input className="input" type="text" placeholder="E-mail" />
                <input className="input" type="password" placeholder="Senha" />
                <input className="input" type="password" placeholder="Confirme a senha" />
                <div className="button-container">
                    <button className="signup-button">Cadastrar</button>
                    <Link to="/" className="signup-link">
                        <button className="signup-button">Voltar ao Login</button>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Signup;
