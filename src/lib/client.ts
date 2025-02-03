import axios from 'axios';

const baseURL = `${process.env.NEXT_PUBLIC_BASE_URL}/api`;

export const httpClient = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/get-token`);
        const data = await response.json();
        const accessToken = data.token;
        return axios.create({
            baseURL,
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error("Something went wrong while getting the accessToken", error);
        return axios.create({
            baseURL,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
};
