import { API } from "../_api";

export const getRooms = async (queryString = '') => {
    try {
        const response = await API.get(`/ruangans${queryString}`);
        const resData = response.data.data;

        return {
            data: resData.data, // array data rooms
            current_page: resData.current_page,
            last_page: resData.last_page,
        };
    } catch (error) {
        console.error("Error fetching rooms:", error);
        throw error;
    }
};

export const showRoom = async (id_ruangan) => {
    try {
        const { data } = await API.get(`/ruangans/${id_ruangan}`)
        return data.data;
    } catch (error) {
        console.error("Error fetching room:", error);
        throw error; 
    }
};

// export const checkAvailableRoom = async (sesi) => {
//     try {
//         const { data } = await API.post(`ruangans/available`, sesi);
//         return data;
//     } catch (error) {
//         console.error("Error checking available room:", error);
//         throw error; 
//     }
// }