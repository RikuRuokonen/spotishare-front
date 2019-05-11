import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

const FormContainer = styled.div `
    background-color: #121212
    width: 20em;
    //border: 1px solid red;
    .title{
        margin: auto;
        widht: 100%;
        color: #b3b3b3;
        //border: 1px solid green; 
        display: block;
    }
    .input.contaier {
        width: 100%;
    }
    input{
        width: 100%;
        height: 2.5em;
        margin: 1em 0 1em 0;    
         border-radius: 9px;
    }
    button{
        width: 100%;
        height: 2.5em;
        background-color: #1db954;
        color: white; 
        border: 1px solid #1db954;
        font-size: 1em;
        font-weight: 600;
        border-radius: 9px;
    }
`

const SearchSongForm = (props) => {
    return(
        <FormContainer>
            <span className={'title'}>Lisää biisi id:llä</span>
            <div className={'input-container'}>
                <input name={'song'} onChange={props.onChange}></input>
            </div>
            <button onClick={props.onSubmit}>
                Lisää biisi
            </button>
        </FormContainer>
    )
}

export default SearchSongForm;