import React, { useState } from 'react';
import TabelaJogos from './tabelaJogos';
import './painel.css'
import logo from '../login/logo-quina.png'
import { Link, useNavigate } from 'react-router-dom';
import AddJogo from './addJogo';


const Painel = () => {
    const navigate = useNavigate();
    const [add, setAdd] = useState(false);
    const [update, setUpdate] = useState(false);
    const logout = () => {
        const token = localStorage.getItem('token'); // obter o token JWT do localStorage
        const requestOptions = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        fetch('http://localhost:8080/auth/logout', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));

    }

    const handleLogout = () => {
        logout();
        navigate('/')
    }
    const handleSubmit = () => {
        if (add) {
            setAdd(false);
        }
        else {
            setAdd(true);
        }
    }
    const handleRefresh = () => {
        if (update) {
            setUpdate(false);
        }
        else {
            setUpdate(true);
        }
    }
    return (
        <div className="painel-container" >

            <div className="painel-titulo">


            </div>
            <img src={logo} alt="logo" className="logo" />
            <div className="background-panel">
                <AddJogo valor={add} />
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <TabelaJogos valor={add} update={update} />

                </div>



                <div className='painel-botoes'>
                    <button onClick={handleSubmit} >Adicionar jogo</button>
                    <img src="https://cdn-icons-png.flaticon.com/512/1082/1082454.png" className='refresh' onClick={handleRefresh}></img>
                    <button>Ver jogo recente</button>
                </div>
                <div className="painel-botoes-sair">
                    <button onClick={handleLogout} style={{ marginRight: "28px" }}> Sair </button>
                </div>
            </div>
        </div >
    );
};

export default Painel;
