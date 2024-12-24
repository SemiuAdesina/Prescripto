import axios from 'axios';

const paystackInstance = {
    initializeTransaction: async (data) => {
        return axios.post(
            'https://api.paystack.co/transaction/initialize',
            data,
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );
    },
    verifyTransaction: async (reference) => {
        return axios.get(
            `https://api.paystack.co/transaction/verify/${reference}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                },
            }
        );
    },
};

export default paystackInstance;
