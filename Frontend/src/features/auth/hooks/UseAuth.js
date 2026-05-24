import { useContext, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import { register, loginUser, getAllUser, updateUser, deleteUser } from "../services/AuthApi";
import { getUser } from "../services/AuthApi";

export const UseAuth = () => {

    const context = useContext(AuthContext);
    const { user, setUser, loading, setLoading } = context;

    const handleLogin = async ({
        email,
        password
    }) => {

        setLoading(true);

        try {

            const data = await loginUser({
                email,
                password
            });

            console.log(data);

            // setUser(data.data.data.user);

            // localStorage.setItem(
            //     "user",
            //     JSON.stringify(data.data.data.user)
            // );

            // localStorage.setItem(
            //     "accessToken",
            //     data.data.data.accessToken
            // );

            // localStorage.setItem(
            //     "userId",
            //     data.data.data.user.userId
            // );

            setUser(data.data.user);

            localStorage.setItem(
                "user",
                JSON.stringify(data.data.user)
            );

            localStorage.setItem(
                "accessToken",
                data.data.accessToken
            );

            localStorage.setItem(
                "userId",
                data.data.user.userId
            );

            return true;

        } catch (error) {

            console.log(error);

            return false;

        } finally {

            setLoading(false);

        }

    };

    const handleRegister = async ({ name, email, password, gender }) => {
        setLoading(true);
        try {
            const data =await  register({ name, email, password, gender });
            setUser(data.user);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    const handleLogout = async ({ userId }) => {
        setLoading(true);
        try {
            const data = await logoutUser({ userId });
            setUser(null);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    const handleUpdateUser = async ({ userId, name, email, gender }) => {
        setLoading(true);
        try {
            const data = await updateUser({ userId, name, email, gender });
            setUser(data.user);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    const handleDeleteUser = async ({ userId }) => {
        setLoading(true);
        try {
            const data = await  deleteUser({ userId });
            setUser(null);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }
    const handlegetAllUser = async () => {
        setLoading(true);
        try {
            const data = await getAllUser({ userId });
            setUser(null);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const getAndSetUser = async () => {
            try {
                const userId = localStorage.getItem("userId");

                if (!userId) {
                    setLoading(false);
                    return;
                }

                const data = await getUser({ userId });

                // setUser(data.user);
                setUser(data.data);

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        getAndSetUser();
    }, []);

    return {
        user,
        loading,
        handleLogin,
        handleRegister,
        handleLogout,
        handleUpdateUser,
        handleDeleteUser,
        handlegetAllUser
    };


}