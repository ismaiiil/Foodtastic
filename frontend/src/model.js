import { action, thunk } from "easy-peasy";
export default {
  user: {
    isLogged: false,
    setIsLogged: action((state, bool) => {
      state.isLogged = bool;
    }),
    user: {},
    //fetchUser object and set user state
    fetchUser: thunk(async (actions, url) => {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      const user = {
        username: data.CUST_UNAME,
        firstName: data.CUST_FNAME,
        lastName: data.CUST_LNAME,
        address: data.CUST_ADDR,
        city: data.CUST_VITY,
        isAdmin: data.CUST_IS_ADMIN,
        isBlocked: data.CUST_IS_BLOCKED,
        zipCode: data.CUST_ZIP
      };
      actions.setUser(user);
      actions.setIsLogged(true);
    }),
    setUser: action((state, user) => {
      state.user = user;
    }),
    signOutRes: thunk(async (actions, url) => {
      const res = await fetch(url);
      const data = await res.json();
      if (data.error.code == "200") {
        actions.setSignedOut(true);
      } else {
        actions.setSignedOut(false);
      }
    }),
    signedOut: null,
    setSignedOut: action((state, bool) => {
      state.signedOut = bool;
    })
  }
};
