import { useDispatch } from "react-redux";
import { authActions } from "../Store/redux";

const useAuth = () => {
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(authActions.logout());
    };

    return { logout };
};

export default useAuth;
