import React from 'react'
import styled from 'styled-components'

const FormContainer = styled.div`
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

const SearchSongForm = ({ onChange, onSubmit }) => (
    <FormContainer>
        <span className="title">Hae biisiä</span>
        <div className="input-container">
            <input name="song" onChange={onChange} />
        </div>
        <button onClick={onSubmit}>
            Lisää biisi
        </button>
    </FormContainer>
)

export default SearchSongForm