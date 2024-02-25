import * as React from 'react';
import classNames from 'classnames';

export default class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      active: "login",
      name: "",
      email: "",
      password: "",
      onLogin: props.onLogin,
      onSignUp: props.onSignUp
    };
  };

  onChangeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  };

  onSubmitLogin = (e) => {
    this.state.onLogin(e, this.state.email, this.state.password);
  };

  onSubmitSignUp = (e) => {
    this.state.onSignUp(e, this.state.name, this.state.email, this.state.password);
  };

  render() {
    return (
      <div >
        <div className="col-4">
          <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
            <li className="nav-item" role="presentation">
              <button className={classNames(this.state.active === "login")} id="tab-login"
                onClick={() => this.setState({ active: "login" })}>Login</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className={classNames(this.state.active === "signUp")} id="tab-SignUp"
                onClick={() => this.setState({ active: "signUp" })}>SignUp</button>
            </li>
          </ul>

          <div className="tab-content">
            <div className={classNames("tab-pane", "fade", this.state.active === "login" ? "show active" : "")} id="pills-login" >
              <form onSubmit={this.onSubmitLogin}>

                <div className="form-outline mb-4">
                  <input type="email" id="uEmail" name="email" className="form-control" onChange={this.onChangeHandler} />
                  <label className="form-label" htmlFor="loginName">Email</label>
                </div>

                <div className="form-outline mb-4">
                  <input type="password" id="uPassword" name="password" className="form-control" onChange={this.onChangeHandler} />
                  <label className="form-label" htmlFor="loginPassword">Password</label>
                </div>

                <button type="submit" className="btn btn-primary btn-block mb-4">Login</button>

              </form>
            </div>
            <div className={classNames("tab-pane", "fade", this.state.active === "signUp" ? "show active" : "")} id="pills-register" >
              <form onSubmit={this.onSubmitSignUp}>

                <div className="form-outline mb-4">
                  <input type="text" id="name" name="name" className="form-control" onChange={this.onChangeHandler} />
                  <label className="form-label" htmlFor="name">Name</label>
                </div>

                <div className="form-outline mb-4">
                  <input type="email" id="email" name="email" className="form-control" />
                  <label className="form-label" htmlFor="login">Email</label>
                </div>

                <div className="form-outline mb-4">
                  <input type="password" id="registerPassword" name="password" className="form-control" onChange={this.onChangeHandler} />
                  <label className="form-label" htmlFor="registerPassword">Password</label>
                </div>
                <div className="form-outline mb-4">
                  <input type="password" id="reEnterPassword" name="reEnterPassword" className="form-control"  />
                  <label className="form-label" htmlFor="reEnterPassword">Re-Enter Password</label>
                </div>

                <button type="submit" className="btn btn-primary btn-block mb-3">Sign in</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };

}