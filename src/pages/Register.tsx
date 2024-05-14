import React, {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {signUpUser} from "../services/firebaseService";
import Input from "../components/Input";
import Container from "../components/Container";
import Button from "../components/Button";
import Label from "../components/Label";
import {RegisterProps} from "../interfaces/RegisterProps";
import {AlertType} from "../interfaces/AlertProps";
import Alert from "../components/Alert";

const defaultRegister: RegisterProps = {
    email: '',
    password: '',
    password_confirmation: '',
}

function Home(){
    const [formFields, setFormFields] = useState(defaultRegister);
    const [alert, setAlert] = useState({ show: false, message: '', type: AlertType.error});
    const { email, password, password_confirmation } = formFields;
    const navigate = useNavigate();

    function resetFormFields() {
        return (
            setFormFields(defaultRegister)
        );
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (password !== password_confirmation) {
            setAlert({show: true, message: 'The passwords must match.', type: AlertType.error});
            return;
        }

        try {
            const userCredential = await signUpUser(email, password);
            if (userCredential) {
                console.log("User Credential:", userCredential);
                resetFormFields();
                navigate('/products');
            } else {
                console.error('Sign up failed: No user credential returned');
            }
        } catch (error) {
            console.error('User Sign Up Failed', error);
            if (password.length < 6 ) setAlert({show: true, message: 'The password must be at least 6 characters.', type: AlertType.error});
        }
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target
        setFormFields({...formFields, [name]: value})
    }

    function closeAlert(){
        setAlert({ show: false, message: alert.message, type: AlertType.error });
    }

    return(
        <Container headerText="Register an account">
            {alert.show && <Alert message={alert.message} type={alert.type} onClose={closeAlert} />}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        required
                        label="Email address"
                    />
                    <Input
                        type='password'
                        name='password'
                        value={password}
                        onChange={handleChange}
                        label="Password"
                        required
                    />
                    <Input
                        type='password'
                        name='password_confirmation'
                        value={password_confirmation}
                        onChange={handleChange}
                        label="Password Confirmation"
                        required
                    />
                    <Button type="submit" text="Sign up" />
                </form>
                <Label href="/login" hrefText="Sign in" text="Already a member? "/>
        </Container>
)
}

export default Home