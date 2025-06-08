import { API } from "../_api";

export const checkAvailableRoom = async ({ ruangan_idruangan, sesi_idsesi, tanggal_pinjam }) => {
    try {
        const response = await API.post('/pinjam/check-availability', {
            ruangan_idruangan,
            sesi_idsesi,
            tanggal_pinjam,
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error checking available room:', error);
        throw error;
    }
}