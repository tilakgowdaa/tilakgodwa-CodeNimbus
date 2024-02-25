import * as React from 'react';

import { request, setAuthHeader } from '../helpers/axios_helper';

export default class AuthContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    };

    componentDidMount() {
        request(
            "GET",
            "/messages",
            {}).then(
            (response) => {
                this.setState({data: response.data})
            }).catch(
            (error) => {
                if (error.response.status === 401) {
                    setAuthHeader(null);
                } else {
                    this.setState({data: error.response.code})
                }

            }
        );
    };

  render() {
    return (
        
                    <div >
                        <h5 className="card-title">Backend response</h5>                        
                        <h2>{this.state.data}</h2>
                    </div>
                
    );
  };
}