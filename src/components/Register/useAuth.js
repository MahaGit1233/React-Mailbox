import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../Store/redux";

const useAuth = () => {
    const isLogin = useSelector(state => state.auth.isLogin);
    const dispatch = useDispatch();

    const authUrl = isLogin
        ? 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDH-EyAyyknxTa5hCgJ-ZZEFnrKoB1K4Uw'
        : 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDH-EyAyyknxTa5hCgJ-ZZEFnrKoB1K4Uw';

    const switchModeHandler = () => {
        dispatch(authActions.toggle());
    };

    const authenticateUser = async (email, password, setError, resetForm) => {
        if (!email || !password) {
            setError("All fields are required.");
            return;
        }

        try {
            const response = await fetch(authUrl, {
                method: 'POST',
                body: JSON.stringify({ email, password, returnSecureToken: true }),
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error?.message || "Authentication failed!");
            }

            localStorage.setItem('email', email.replace(/[@.]/g, '_'));

            if (isLogin) {
                dispatch(authActions.login({ token: data.idToken }));
            } else {
                dispatch(authActions.signup({ token: data.idToken }));
            }

            resetForm();
        } catch (error) {
            setError(error.message);
        }
    };

    return { isLogin, switchModeHandler, authenticateUser };
};

export default useAuth;
