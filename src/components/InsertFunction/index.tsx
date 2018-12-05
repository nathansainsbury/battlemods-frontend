import React from 'react';
import { Formik, Field, Form } from 'formik';
// import { connect } from 'react-redux';

export default class extends React.Component<any, any>{

    constructor(props:any){
        super(props);
    }

    public render(){
        return(
            <Formik 
                initialValues={{
                    function: '',
                    description: '',
                    category: '',
                    example: ''
                }}
                onSubmit={(values) => {
                    console.log(values);
                }}
                render={({}) => (
                    <Form>
                        <Field type='text' name='function' placeholder='function'/>
                        <Field type='text' name='description' placeholder='description'/>
                        <Field type='text' name='category' placeholder='category'/>
                        <Field type='text' name='example' placeholder='example'/>

                        <button type='submit'>Submit</button>
                    </Form>
                )}
            />
        )
    }
}