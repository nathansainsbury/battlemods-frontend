import React from 'react';
import SearchBar from './../SearchBar';
import SearchResults from './../SearchResults';

export default class extends React.Component<any, any>{

    public render(){
        return(
            <div>
                <SearchBar />
                <div className='container'>
                    <SearchResults />
                </div>
            </div>
        )
    }

}