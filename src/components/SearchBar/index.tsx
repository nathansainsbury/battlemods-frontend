import React from 'react';
import { Formik, Field, Form } from 'formik';
import { connect } from 'react-redux';
import { getAllFunctions } from './../../actions';
class SearchBar extends React.Component<any, any>{

    public componentWillMount(){
        this.props.getAllFunctions('')
    }

    public render(){
        return(
            <div className='main_search'>
                <div className='container py-4'>
                    <Formik
                        validateOnBlur={true}
                        validate={(values)=>{
                            this.props.getAllFunctions(values.search)
                        }}
                        onSubmit={() => {}}
                        validateOnChange={true}
                        initialValues={{
                            search: '',
                        }}
                        render={({}) => (
                            <Form>
                                <div className="ui massive icon input fluid">
                                    <Field type="text" placeholder="Search" name='search'/> 
                                    <i className="search icon"></i>
                                </div>
                            </Form>
                        )}
                    />
                </div>
                </div>
        );
    }

}

function mapStateToProps({functionData}){
    return {
        functionData
    }
}

export default connect(mapStateToProps, {getAllFunctions})(SearchBar);