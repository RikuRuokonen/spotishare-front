import React, { Component } from 'react'
import Autosuggest from 'react-autosuggest'
import styles from './SearchInput.module.scss'
import { searchSong } from '../services/calls'
import throttle from 'lodash/throttle'

const doSearch = throttle(searchSong, 100, {
    trailing: true,
})

const getSuggestionValue = suggestion => suggestion.name

const InputContainer = (inputProps) => (
    <div className={styles.inputContainer}>
        <input className={styles.input} {...inputProps} />
    </div>
)

class SearchInput extends Component {
    state = {
        value: '',
        results: [],
    }
    onSuggestionsFetchRequested = ({ value }) => {
        doSearch(value)
            .then((items) => {
                this.setState({
                    results: items.length ? items : [{
                        error: 'No search results',
                    }],
                })
            })
            .catch(() => {
                this.setState({
                    error: true,
                })
            })
    }
    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue,
        })
    }
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
        })
    }
    renderSuggestion = (suggestion, { query, isHighlighted }) => {
        return (
            <div>
                <strong>{suggestion.album.artists[0].name}</strong>
                &nbsp;–&nbsp;
                <span>{suggestion.name}</span>
            </div>
        )
    }

    render() {
        const { results, value } = this.state
        const { onSelect } = this.props
        return (
            <Autosuggest
                suggestions={results}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                inputProps={{
                    placeholder: 'Etsi biisiä',
                    value,
                    required: true,
                    onChange: this.onChange,
                }}
                onSuggestionSelected={onSelect}
                theme={styles}
                renderInputComponent={InputContainer}
                renderSuggestion={this.renderSuggestion}
            />
        )
    }
}

export default SearchInput
