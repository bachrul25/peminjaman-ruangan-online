import { API } from "../_api";

// export const checkAvailableRoom = async ({ ruangan_idruangan, sesi_idsesi, tanggal_pinjam }) => {
//     try {
//         const response = await API.post('/pinjam/check-availability', {
//             ruangan_idruangan,
//             sesi_idsesi,
//             tanggal_pinjam,
//         }, {
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem('token')}`,
//             }
//         });
//         return response.data;
//     } catch (error) {
//         console.error('Error checking available room:', error);
//         throw error;
//     }
// }

export const checkMultipleAvailability = async (tanggal_pinjam, ruangan_ids) => {
    try {
        if (localStorage.getItem('token')){
            const response = await API.post('/pinjam/check-availability', {
                tanggal_pinjam,
                ruangan_ids,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });

            return response.data;
        }
    } catch (error) {
        console.error('Error checking multiple room availability:', error);
        throw error;
    }
};

export const createLoan = async (data) => {
    try {
        const response = await API.post('/pinjam', data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating loan:', error);
        throw error;
    }
}

export const getLoans = async (queryString = '') => {
    try {
        const response = await API.get(`/pinjam${queryString}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching loans:', error);
        throw error;
    }
}