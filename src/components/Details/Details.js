import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import transportData from "../../data/data.json";
import { useForm } from "react-hook-form";
import logo from "../images/images/peopleicon.png";
import map from "../images/images/Map.png"
// import TimelineSeparator from '@material-ui/lab/TimelineSeparator';

const Details = () => {
  const { id } = useParams();
  const [transport, setTransport] = useState([]);
  const [newCart, setNewCart] = useState(true);
  const [input, setInput] = useState({
      from:'',
      to:''
  });
  const cart = transport.find((pd) => pd.id == id);
  console.log("cart2", cart);

  useEffect(() => {
    setTransport(transportData);
  }, []);

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
      console.log(data)
  };
  const handleBlur = (e) =>{
      if(e.target.name === 'from'){
        const destination = {...input}
        destination.from = e.target.value
        setInput(destination)
      }
      if(e.target.name === 'to'){
          const destination = {...input}
          destination.to = e.target.value
          setInput(destination)
      }
      
  }
  return (
    <div className="row">
        <div className="col-md-4">
      <div style={{marginTop:'30px', marginLeft:'30px'}}>
        {newCart && (
          <div>
            <form
              style={{
                width: "300px",
                border: "1px solid black",
                padding: "20px",
                borderRadius:'5px'
              }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <h5>Pick From: </h5>
              <input className="form-control" onBlur={handleBlur} name="from" ref={register} />
              <br />
              <h5>Pick To: </h5>
              <input className="form-control"  onBlur={handleBlur} name="to" ref={register} />
              <br />
              <input
                className="form-control"
                onClick={() => setNewCart(!newCart)}
                style={{ backgroundColor: "tomato" }}
                type="submit"
                value="Search"
              />
            </form>
          </div>
        )}
        <div>
          {!newCart && (
            <form action="">
              <div
                style={{
                  width: "300px",
                  border: "1px solid gray",
                  borderRadius:'5px'
                }}
              >
                <div style={{ backgroundColor: "tomato", padding:'10px'}}>
                  <h3>{input.from}</h3>
                  <br />
                  <h3>{input.to}</h3>
                </div>
                <div style={{padding:'10px'}}>
                <div style={{backgroundColor:'rgb(230, 226, 213)', padding:'5px',borderRadius:'3px',}}>
                  <img style={{ width: "40px", marginLeft: "40px" }} src={cart.img} alt="" />{" "}
                  <span style={{ marginLeft: "20px" }}>{cart.name}</span>{" "}
                  <img
                    style={{ width: "20px", marginLeft: "20px" }}
                    src={logo}
                    alt=""
                  />{" "}
                  <span style={{ marginLeft: "20px" }}>$67</span>
                </div>
                <div style={{ marginTop: "4px", borderRadius:'3px', marginBottom: "4px", backgroundColor:'rgb(230, 226, 213)', padding:'5px' }}>
                  <img style={{ width: "40px", marginLeft: "40px" }} src={cart.img} alt="" />{" "}
                  <span style={{ marginLeft: "20px" }}>{cart.name}</span>{" "}
                  <img
                    style={{ width: "20px", marginLeft: "20px" }}
                    src={logo}
                    alt=""
                  />{" "}
                  <span style={{ marginLeft: "20px" }}>$67</span>
                </div>
                <div style={{backgroundColor:'rgb(230, 226, 213)', padding:'5px',borderRadius:'3px',}}>
                  <img style={{ width: "40px", marginLeft: "40px" }} src={cart.img} alt="" />{" "}
                  <span style={{ marginLeft: "20px" }}>{cart.name}</span>{" "}
                  <img
                    style={{ width: "20px", marginLeft: "20px" }}
                    src={logo}
                    alt=""
                  />{" "}
                  <span style={{ marginLeft: "20px" }}>$67</span>
                </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
      </div>

      <div className="col-md-8">
          <img style={{ marginTop:'30px'}} src={map} alt=""/>
      </div>
    </div>
  );
};

export default Details;
