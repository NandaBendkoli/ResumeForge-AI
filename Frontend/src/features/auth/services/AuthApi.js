import axios from "axios";


const api = axios.create({
    baseURL: "http://localhost:8070/ResumeForge-AI/web/v1",
    withCredentials: true,
});


api.interceptors.request.use(

    (config) => {

        const accessToken =
            localStorage.getItem("accessToken");

        if (accessToken) {

            config.headers.Authorization =
                `Bearer ${accessToken}`;

        }

        return config;

    },

    (error) => {

        return Promise.reject(error);

    }

);

export const register = async ({ name, email, password, gender }) => {
    try {

        const response = await api.post("/user/createUser",
            { name, email, password, gender }
        );

        return response.data;
    } catch (error) {
        console.log(error)

    }

}

export const loginUser = async ({ email, password }) => {
    try {

        const response = await api.post("/user/loginUser",
            { email, password }
        );

        return response.data;
    } catch (error) {
        console.log(error)

    }

}

export const logoutUser = async ({ userId }) => {
    try {
        const response = await api.get("/user/logoutUser", { userId });
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export const getAllUser = async () => {
    try {
        const response = await api.get("/user/getAllUser");
        return response.data;

    } catch (error) {
        console.log(error)

    }

}


export const updateUser = async ({ userId, name, email, gender }) => {
    try {
        const response = await api.post("/user/updateUser", {
            userId,
            name,
            email,
            gender
        });
        return response.data;

    } catch (error) {
        console.log(error)

    }
}

export const deleteUser = async ({ userId }) => {
    try {
        const response = await api.post("/user/deleteUser", { userId });
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export const getUser = async ({ userId }) => {
    try {
        const response = await api.post("/user/getUser", { userId });
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
