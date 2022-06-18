import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './LoginForm.css';
import axios from "axios";
import swal from 'sweetalert';

const LoginForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);


    const submitHandler = async(e) => {
        e.preventDefault();

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            //poprawic dlaczego bez calego adresu wysyla na localhost:3000
            const { data } = await axios.post('http://localhost:3001/api/users/login', {
                email,
                password,
            },
                config
            );
            console.log(data);
            swal("Zalogowano użytkownika: " + data.email);
            localStorage.setItem('userInfo', JSON.stringify(data));
        }
        catch (error) {
            setError(error.response.data.message);
            swal("Nie udało się zalogować");
        }
    }


    return (
        <div className="loginContainer">
            <div className="title">Logowanie</div>
        <Form onSubmit={submitHandler}>
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
        Zaloguj
      </Button>
    </Form>
    </div>
    )
};

export default LoginForm;