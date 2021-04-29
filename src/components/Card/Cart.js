import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './cart.css'
const Cart = (props) => {

    const {name, img, id} = props.transport;
    return (
        <div>
            <Link style={{textDecoration:'none'}} to={"/detail/"+id}>
                <div className="cart" style={{marginTop:'100px'}}>
                <div className="col-md-3">
                    <Card style={{ width: '14rem' }}>
                    <Card.Img style={{height:'160px'}} variant="top" src={img} />
                    <Card.Body className="card-body">
                        <Card.Title>{name}</Card.Title>
                    </Card.Body>
                    </Card>
                </div>
                </div>
            </Link>
        </div>
    );
};

export default Cart;