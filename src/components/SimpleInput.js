import { useState } from "react";

const SimpleInput = (props) => {

    const [enteredName, setEnteredName] = useState('');
    const [enteredNameTouched, setEnteredNameTouched] = useState(false);
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

    const enteredNameIsValid = enteredName.trim() !== '';
    const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;
    const enteredEmailIsValid = enteredEmail.trim() !== '' && new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}').test(enteredEmail);
    const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

    let formIsValid = false;

    if (enteredNameIsValid && enteredEmailIsValid) {
        formIsValid = true;
    }

    const nameInputChangeHandler = event => {
        setEnteredName(event.target.value);
    };

    const nameInputBlurHandler = event => {
        setEnteredNameTouched(true);
    };

    const formSubmissionHandler = event => {
        event.preventDefault();

        setEnteredNameTouched(true);
        setEnteredEmailTouched(true);

        if (!enteredNameIsValid || !enteredEmailIsValid) {
            return;
        }

        // nameInputRef.current.value = ''; not ideal, don't manipulate the DOM
        setEnteredName('');
        setEnteredNameTouched(false);
        setEnteredEmail('');
        setEnteredEmailTouched(false);
    };

    const emailInputChangeHandler = event => {
        setEnteredEmail(event.target.value);
    };

    const emailInputBlurHandler = event => {
        setEnteredEmailTouched(true);
    };

    const nameInputClasses = !nameInputIsInvalid ? 'form-control' : 'form-control invalid';
    const emailInputClasses = !emailInputIsInvalid ? 'form-control' : 'form-control invalid';

    return (
        <form onSubmit={formSubmissionHandler}>
            <div className={nameInputClasses}>
                <label htmlFor='name'>Your Name</label>
                <input 
                    type='text' 
                    id='name' 
                    onChange={nameInputChangeHandler}
                    onBlur={nameInputBlurHandler}
                    value={enteredName} 
                />
                {nameInputIsInvalid && <p className="error-text">Name must not be empty.</p>}
            </div>
            <div className={emailInputClasses}>
                <label htmlFor='email'>Your Email</label>
                <input 
                    type='email' 
                    id='email' 
                    onChange={emailInputChangeHandler}
                    onBlur={emailInputBlurHandler}
                    value={enteredEmail} 
                />
                {emailInputIsInvalid && <p className="error-text">Email is not correct.</p>}
            </div>
            <div className="form-actions">
                <button disabled={!formIsValid}>Submit</button>
            </div>
        </form>
    );
};

export default SimpleInput;
