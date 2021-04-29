import React, { useEffect, useState } from 'react';
import transportData from '../../data/data.json'
import Cart from '../Card/Cart';
import './Home.css'


const Home = (e) => {
    const [transport, setTransport] = useState([])

    useEffect(()=>{
        console.log(transportData)
        setTransport(transportData)
    }, [])
    return (
        <div  className="background-image">
            <div>
            <div className="row">
                {
                    transport.map(transport => <Cart transport={transport}></Cart>)
                }
            </div>
            </div>
        </div>
    );
};

export default Home;