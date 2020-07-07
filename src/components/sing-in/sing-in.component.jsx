import React from 'react'

import FormImput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import { auth, singInWithGoogle} from '../../firebase/firebase.utils'

import './sing-in.styles.scss'

class SingIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }        
    }

    handleSubmit = async event => {
        event.preventDefault();

        const {email, password} = this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState ({email:'', password:''})

        }catch(error) {
            console.log(error);
            
        }
    }

    handleChange = event => {
        const { value, name } = event.target;
        
        this.setState({[name]: value});
    }

    render() {
        return (
            <div className='sing-in'>
                <h2> I already have an account </h2>
                <span> Sing in with your email and password </span>
                
                <form onSubmit= {this.handleSubmit}>
                    <FormImput 
                        name='email' 
                        type='email' 
                        value= { this.state.email }
                        handleChange= {this.handleChange} 
                        label='Email'                      
                        required
                    />
                    <FormImput 
                        name='password' 
                        type='password' 
                        value= { this.state.password } 
                        handleChange= {this.handleChange}
                        label='Password'
                        required
                    />
                    <div className='buttons'>
                        <CustomButton type='submit'> 
                        Sing In
                        </CustomButton>
                        <CustomButton type='button' onClick={singInWithGoogle} isGoogleSingIn>
                        Sing In With Google
                        </CustomButton>
                    </div>
                </form>
            </div>
        );
    }
}

export default SingIn;