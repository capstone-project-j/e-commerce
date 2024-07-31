import FormWrap from "../components/FormWrap"
import Container from "../components/nav/Container"
import LoginForm from "./LoginForm";

const Login = () => {
    return (
        <Container>
            <FormWrap>
                <LoginForm />
            </FormWrap>
        </Container>
    );
}

export default Login;