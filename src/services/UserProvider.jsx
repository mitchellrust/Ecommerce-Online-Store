import React, { createContext } from "react";
import { auth } from "../firebase";
import { generateUserDocument } from './db';
import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";

const override = css`
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

export const UserContext = createContext({ user: null });

class UserProvider extends React.Component {
  state = {
    loading: true,
    user: null
  };

  componentDidMount = async () => {
    auth.onAuthStateChanged(async userObj => {
      const user = await generateUserDocument(userObj, null, null);
      this.setState({ user, loading: false });
    });
  };

  render() {
    if (this.state.loading) {
      return (
        <BounceLoader
          className="loader"
          css={override}
          size={80}
          color={"#ff5e6c"}
          loading={this.state.loading}
        />
      );
    }
    return (
      <UserContext.Provider value={this.state.user}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserProvider;