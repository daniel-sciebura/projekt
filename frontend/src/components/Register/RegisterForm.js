import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import swal from 'sweetalert';
import './RegisterForm.css';

const RegisterForm = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.post('http://localhost:3001/api/users/register', {
                name,
                email,
                password
            },
                config
            );
            swal("Zarejestrowano użytkownika: " + data.name);
            localStorage.setItem("userInfo", JSON.stringify(data));

        } catch (error) {
            swal("Nie udało się zarejestrować użytkownika");
            setError(error.response.data.message);
        }
    }
    
    return (
        <div className="registerContainer">
            <div className="title">Rejestracja</div>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                    <Form.Label className="label-name">Imię:</Form.Label>
                    <Form.Control
                        type="name"
                        value={name}
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label className="label-name">Email:</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label className="label-name">Hasło:</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Zarejestruj
                </Button>
            </Form>
        </div>
    )
};

export default RegisterForm;