import { API } from "../_api";

export const getCheckIn = async (id) => {
    try {
        const response = await API.get(`/checkin/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        });
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const checkIn = async (pinjam_idpinjam) => {
    try {
        const response = await API.post('/checkin', {pinjam_idpinjam}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        });
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const checkOut = async (checkin_idcheckin) => {
    try {
        const response = await API.post('/checkout', {checkin_idcheckin}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        });
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const getCheckOut = async (checkin_idcheckin) => {
    try {
        const response = await API.get(`/checkout/${checkin_idcheckin}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        });
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw error
    }
}