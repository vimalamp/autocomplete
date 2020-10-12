import React, { useState } from 'react';
import './autocomplete.css';

export const AutocompleteForm = ( {colList} ) => {
    const [value, setValue] = useState('');
    const [colorsList, setColorsList] = useState([])

   const handleMatch = (val) => {
        const lst = [...colList];
        const valLen = val.length;
        const newColorsList = lst.filter( color => {
            return color.substr(0,valLen).toLowerCase() == val.toLowerCase() && valLen != 0;
        });
        setColorsList(newColorsList);
    }

    return (
        <div className="autocomplete">
            <h1 className="autocomplete-header">Color match</h1>
            <form onSubmit={() => {return false}}>
                <div class="input-wrapper">
                    <input 
                        className="search-input"
                        type="text" 
                        value={value}
                        onChange={ e => { 
                            e.preventDefault()
                            let newVal = e.target.value.trim();
                            setValue(newVal);
                            handleMatch(newVal);
                        }}
                        autoFocus
                        placeholder="Color"/>
                    <button 
                        className="clear-search-btn"
                        type="button"
                        tabIndex={-1}
                        onClick={ (e) => { 
                            e.preventDefault(); 
                            setValue(''); 
                            setColorsList([]) 
                        }}> x </button>
                </div>
                <div className="matches">
                    { colorsList.map( (key, index) =>
                        <div 
                            className="match"
                            key={index} 
                            tabIndex={0}
                            onClick={ () => { setValue(key); setColorsList([]) } }
                            onKeyDown={ e => {
                                if (e.keyCode === 13) {
                                    setValue(key); 
                                    setColorsList([]);
                                }}}>
                            <strong>{ key.substr(0,value.length) }</strong>{ key.substr(value.length) }
                        </div>
                    ) }
                </div>
            </form>
        </div>
        
    )


};