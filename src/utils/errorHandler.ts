import { AxiosError } from 'axios';

export const axiosErrorHandler = (error: AxiosError) => {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("Data", error.response.data);
        console.log("Status", error.response.status);
        console.log("Headers", error.response.headers);

        return new Error((error.response?.data as any)?.message);
    }
    else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        throw new Error(error.request);
    }
    else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        throw new Error(error.message);
    }
}