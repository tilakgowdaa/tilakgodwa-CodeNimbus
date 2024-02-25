import * as React from 'react';


import { request, setAuthHeader } from '../helpers/axios_helper';

import AuthContent from './AuthContent';
import LoginForm from './LoginForm';

export default class AppContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            componentToShow: "login"
        }
    };

    // login = () => {
    //     this.setState({componentToShow: "login"})
    // };

    // Home = () => {
    //     this.setState({componentToShow: " "})
    //     setAuthHeader(null);
    // };

    onLogin = (e, email, password) => {
        e.preventDefault();
        request(
            "POST",
            "/login",
            {
                email: email,
                password: password
            }).then(
            (response) => {
                setAuthHeader(response.data.token);
                this.setState({componentToShow: "messages"});
            }).catch(
            (error) => {
                setAuthHeader(null);
                this.setState({componentToShow: "error"})
            }
        );
    };

    onSignUp = (event, name, email, password) => {
        event.preventDefault();
        request(
            "POST",
            "/register",
            {
                name: name,
                email: email,
                password: password
            }).then(
            (response) => {
                setAuthHeader(response.data.token);
                this.setState({componentToShow: "messages"});
            }).catch(
            (error) => {
                setAuthHeader(null);
                this.setState({componentToShow: "messages"})
            }
        );
    };

  render() {
    return (
      <>
        {/* <Buttons
          login={this.login}
          logout={this.logout}
        /> */}

        {this.state.componentToShow === "login" && <LoginForm onLogin={this.onLogin} onSignUp={this.onSignUp} />}
        {this.state.componentToShow === "messages" && <AuthContent />}

      </>
    );
  };
}