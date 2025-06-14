import { API } from "../_api";

export const getTypes = async () => {
    try {
        const { data } = await API.get('/tipes');
        return data;
    } catch (error) {
        console.log(error);
        throw error
    }
}