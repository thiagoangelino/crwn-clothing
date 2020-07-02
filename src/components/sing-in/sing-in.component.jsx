import React from 'react'

import FormImput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import {singInWithGoogle} from '../../firebase/firebase.utils'

import './sing-in.styles.scss'

class SingIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }        
    }

    handleSubmit = event => {
        event.preventDefaut();

        this.state ({email:'', password:''})
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
                        handleChange= {this.handleChange} 
                        value= { this.state.email }
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
                        <CustomButton onClick={singInWithGoogle} isGoogleSingIn>
                        Sing In With Google
                        </CustomButton>
                    </div>
                </form>
            </div>
        );
    }
}

export default SingIn;