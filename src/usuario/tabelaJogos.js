import React, { useState, useEffect } from 'react';
import './tabelaJogos.css';

function TabelaJogos(props) {
    const [data, setData] = useState([])
    const [deleted, setDeleted] = useState(false);

    const handleDelete = (id) => {
        const token = localStorage.getItem('token'); // obter o token JWT do localStorage
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };
        const url = 'http://localhost:8080/minha-quina/api/v1/apostas/' + id;
        fetch(url, requestOptions)
            .then(response => response.json())
            .catch(error => console.error(error));
        setDeleted(true)
    }

    useEffect(() => {
        const token = localStorage.getItem('token'); // obter o token JWT do localStorage
        const requestOptions = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        fetch('http://localhost:8080/minha-quina/api/v1/apostas', requestOptions)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error(error));
        setDeleted(false)
    }, [deleted, props.valor, props.update]);


    if (data.length === 0) {
        return (<h1> Nenhum jogo adicionado!</h1>)
    }
    return (
        <table>
            <thead >
                <tr >
                    <th>ID</th>
                    <th>Número Sorteio</th>
                    <th>Dezenas</th>
                    <th>Data</th>
                    <th>Editar</th>
                    <th>Excluir</th>
                </tr>
            </thead>
            <tbody>
                {data.map(item => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.numeroSorteio}</td>
                        <td>{item.dezenas.join(', ')}</td>
                        <td>{item.dataJogo}</td>
                        <td>

                            <img src="https://cdn-icons-png.flaticon.com/512/1828/1828911.png" className='edit' />

                        </td>
                        <td>

                            <img src="https://cdn-icons-png.flaticon.com/512/4043/4043845.png" className="delete" onClick={() => handleDelete(item.id)} />

                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TabelaJogos;