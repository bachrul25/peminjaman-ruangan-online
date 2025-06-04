import { API } from "../_api";

export const getRooms = async (page = 1) => {
  const { data } = await API.get(`/ruangan?page=${page}`);
  return data.data; // bagian "data" dalam response JSON
};

export const showRoom = async (id_ruangan) => {
    try {
        const { data } = await API.get(`/ruangan/${id_ruangan}`)
        return data.data;
    } catch (error) {
        console.error("Error fetching room:", error);
        throw error; 
    }
};

export const checkAvailableRoom = async (sesi) => {
    try {
        const { data } = await API.post(`ruangans/available`, sesi);
        return data;
    } catch (error) {
        console.error("Error checking available room:", error);
        throw error; 
    }
}