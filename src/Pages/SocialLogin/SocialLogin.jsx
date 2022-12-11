import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import useToken from '../../hooks/useToken';

const SocialLogin = () => {

    const { signInWithGoogle } = React.useContext(AuthContext);
    const [userEmail, setUserEmail] = React.useState(null);
    const [token] = useToken(userEmail)

    const navigate = useNavigate();

    if (token) {
        navigate('/home');
    }

    const handle_login = () => {
        signInWithGoogle()
            .then(result => {
                const { email, displayName, photoURL, } = result.user;
                const userDB = {
                    name: displayName,
                    email,
                    role: "Buyer",
                    image: photoURL
                }
                save_user(userDB);
            })
    };

    const save_user = (userDB) => {

        fetch('https://swap-hand-server-hasibul240.vercel.app/users/social', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userDB)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    setemail(userDB.email)
                    toast.success('Wellcom ' + userDB.name);
                }
            })
    };

    const setemail = (email) => {
        setUserEmail(email);
    };

    return (
        <button onClick={handle_login} className='btn btn-outline w-full'>
            <img className='w-8' src="/google_logo.png" alt="" />
            Continue With Google
        </button>
    );
};

export default SocialLogin;