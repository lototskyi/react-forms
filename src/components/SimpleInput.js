import { useEffect, useRef, useState } from "react";

const SimpleInput = (props) => {

    const nameInputRef = useRef();
    const [enteredName, setEnteredName] = useState('');
    const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
    const [enteredNameTouched, setEnteredNameTouched] = useState(false);

    useEffect(() => {
        if (enteredNameIsValid) {
            console.log('Name Input is valid!');
        }
    }, [enteredNameIsValid]);

    const nameInputChangeHandler = event => {
        setEnteredName(event.target.value);

        if (event.target.value.trim() !== '') {
            setEnteredNameIsValid(true);
        }
    };

    const nameInputBlurHandler = event => {
        setEnteredNameTouched(true);

        if (enteredName.trim() === '') {
            setEnteredNameIsValid(false);
        }
    };

    const formSubmissionHandler = event => {
        event.preventDefault();

        setEnteredNameTouched(true);

        if (enteredName.trim() === '') {
            setEnteredNameIsValid(false);
            return;
        }

        setEnteredNameIsValid(true);

        console.log(enteredName);
        console.log(nameInputRef.current.value);

        // nameInputRef.current.value = ''; not ideal, don't manipulate the DOM
        setEnteredName('');
    };

    const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

    const nameInputClasses = !nameInputIsInvalid ? 'form-control' : 'form-control invalid';

    return (
        <form onSubmit={formSubmissionHandler}>
            <div className={nameInputClasses}>
                <label htmlFor='name'>Your Name</label>
                <input 
                    ref={nameInputRef} 
                    type='text' 
                    id='name' 
                    onChange={nameInputChangeHandler}
                    onBlur={nameInputBlurHandler}
                    value={enteredName} 
                />
                {nameInputIsInvalid && <p className="error-text">Name must not be empty.</p>}
            </div>
            <div className="form-actions">
                <button>Submit</button>
            </div>
        </form>
    );
};

export default SimpleInput;
