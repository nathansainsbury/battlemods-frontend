import React from 'react';
import { ResultDiv } from './stateless';
import { connect } from 'react-redux';

class SearchResults extends React.Component<any, any>{

    public render(){

        const data = this.props.functionData.slice(0, 10) || [];

        return(
            <div className='ui one items'>
                {
                    data.map(el => (
                        <ResultDiv details={el} />
                        )
                    )
                }
            </div>
        )
    }

}
function mapStateToProps({functionData}){
    return {
        functionData
    }
}

export default connect(mapStateToProps,)(SearchResults);