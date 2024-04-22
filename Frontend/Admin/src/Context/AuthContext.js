import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isLogin: JSON.parse(localStorage.getItem("isLogin")) || false,
  loading: JSON.parse(localStorage.getItem("loading")) || false,
  error: JSON.parse(localStorage.getItem("error")) || null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        user: null,
        isLogin: false,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isLogin: true,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        user: null,
        isLogin: false,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isLogin: false,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
    localStorage.setItem("isLogin", JSON.stringify(state.isLogin));
    localStorage.setItem("loading", JSON.stringify(state.loading));
    localStorage.setItem("error", JSON.stringify(state.error));
  }, [state.user, state.isLogin, state.loading, state.error]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isLogin: state.isLogin,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};