import Container from 'react-bootstrap/Container';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout/AuthLayout';
import { AuthContext } from '../helpers/AuthContext';
import { useContext } from 'react';


function LandingPage() {
  const navigate = useNavigate()
  const { authState } = useContext(AuthContext);

  return (
    <AuthLayout>
      <section className='d-flex align-items-center' style={{ height: '70%' }}>
        <Container className="mt-5 text-center">
          <h1>Imagine a simpler chat app.</h1>
          <p>Chat with your friends — without all the bells and whistles.
            The chat app for minimalists.
          </p>
          {/* {console.log(!!authState)} */}
          {!!authState
            ? <Button variant="light" size="lg" className="mt-3 shadow" onClick={() => navigate('/home')}>Open Chatap in your browser</Button>
            :
            <>
              <Button variant="light" size="lg" className="mt-3 me-2 shadow" onClick={() => navigate('/register')}>Register for Chatap</Button>
              <Button variant="outline-light" size="lg" className="mt-3 ms-2 shadow" onClick={() => navigate('/login')}><i className="bi bi-box-arrow-in-right"></i> Login</Button>
            </>
          }
        </Container>

      </section >
    </AuthLayout>
  )
}

export default LandingPage;
