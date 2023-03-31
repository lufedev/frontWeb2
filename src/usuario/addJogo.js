import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./addJogo.css"

function AddJogo(props) {
    const [numeroSorteio, setNumeroSorteio] = useState(0);
    const [dezenas, setDezenas] = useState([]);
    const [dataJogo, setDataJogo] = useState('');
    const [apiResponse, setApiResponse] = useState("");

    useEffect(() => {
        setApiResponse('')

        const payload = {
            numeroSorteio,
            dezenas,
            dataJogo,
        };

        if (payload.numeroSorteio.length === 0 || payload.dezenas.length === 0 || payload.dataJogo.length === 0) {

        } else {
            const token = localStorage.getItem('token');
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            };
            fetch('http://localhost:8080/minha-quina/api/v1/apostas', requestOptions)
                .then(response => {
                    return response.text();
                })
                .then(data => {
                    setApiResponse(data);
                });

        }
    }, [props.valor])
    const handleDezenasChange = (event, index) => {
        const value = parseInt(event.target.value.trim(), 10);
        const newDezenas = [...dezenas];
        if (!isNaN(value) && value >= 1 && value <= 80) {
            newDezenas[index] = value;
            setDezenas(newDezenas);
        } else {
            newDezenas[index] = undefined;
            setDezenas(newDezenas);
        }
    };

    if (apiResponse[0] === '{') {
        setApiResponse('');
    }
    return (
        <>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <h2 style={{ color: 'red', fontSize: '20px', }} className='erroMsg'> {apiResponse}</h2>
            </div>
            <form style={{
                display: 'flex', flexDirection: 'row'
            }}>

                <div>
                    <label htmlFor="numeroSorteio" className='input'>🎫Número do sorteio🎫</label>
                    <input
                        type="number"
                        id="numeroSorteio"
                        value={numeroSorteio}
                        onChange={(event) => setNumeroSorteio(event.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="dezenas" className="input">
                        🔢Dezenas🔢
                    </label>
                    <div style={{ display: 'flex', flexDirection: 'row', maxWidth: "300px" }}>
                        {[0, 1, 2, 3, 4].map((index) => (
                            <input
                                style={{ margin: 2 }}
                                key={index}
                                type="text"
                                id={`dezenas-${index}`}
                                value={dezenas[index] || ''}
                                onChange={(event) => handleDezenasChange(event, index)}
                                min="1"
                                max="80"
                                required
                            />
                        ))}
                    </div>
                </div>
                <div>
                    <label htmlFor="dataJogo" className='input'>📅Data do jogo📅</label>
                    <input
                        type="date"
                        id="dataJogo"
                        value={dataJogo}
                        onChange={(event) => setDataJogo(event.target.value)}
                        required
                    />
                </div>

            </form>

        </>
    );
}

export default AddJogo;
