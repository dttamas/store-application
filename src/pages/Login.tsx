import {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {signInUser} from "../services/firebaseService";
import Container from "../components/Container";
import Input from "../components/Input";
import Button from "../components/Button";
import Label from "../components/Label";
import {LoginProps} from "../interfaces/LoginProps";

const defaultLogin: LoginProps = {
    email: '',
    password: ''
}

function Home(){
    const [formFields, setFormFields] = useState(defaultLogin);
    const { email, password } = formFields;
    const navigate = useNavigate();

    const resetFormFields = () => {
        return (
            setFormFields(defaultLogin)
        );
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const userCredential = await signInUser(email, password)

            if (userCredential) {
                resetFormFields()
                navigate('/products');
            }
        } catch (error: any) {
            console.error('User Log In Failed', error.message);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormFields({...formFields, [name]: value})
    }

    return(
        <Container headerText="Sign in to your account">
                <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            label="Email address"
                            required
                        />
                        <Input
                            type='password'
                            name='password'
                            value={password}
                            onChange={handleChange}
                            label="Password"
                            required
                        />
                    <Button type="submit" text="Sign in" />
                </form>
                <Label text="Dont have an account?" href="/register" hrefText=" Sign up" />
        </Container>
    )
}

export default Home