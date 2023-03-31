import React, { useState } from 'react';
import "./login.css";
import logo from "./logo-quina.png";
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {


    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const handleLogin = (event) => {
        event.preventDefault();
        const payload = {
            username: username,
            password: password
        };

        fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao tentar realizar o login');
                }
                return response.json();
            })
            .then(data => {
                const token = data.token;

                //set JWT token to local
                localStorage.setItem("token", token);
                navigate('/painel');
            })
            .catch(error => {
                setError("Usuário ou senha incorretos")
                console.error(error);
            });
    }
    return (
        <div className="container">
            <img src={logo} alt="logo" className="logo" />
            <h1 className="title">Minha Quina</h1>
            <h2 style={{ color: 'red' }}> {error}</h2>
            <form className="form">
                <form style={{
                    display: 'flex', flexDirection: 'column'
                }}>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        className="input"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="input"
                    />
                    <div className="button-container">
                        <button type="button" className="signup-button" onClick={handleLogin}>Login</button>
                        <Link to="/cadastro" className="signup-link">
                            <button className="signup-button">Cadastre-se</button>
                        </Link>
                    </div>
                </form>
            </form>
        </div>
    );
}

export default Login;