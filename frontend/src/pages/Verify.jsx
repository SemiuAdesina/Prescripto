import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const Verify = () => {
    const [searchParams] = useSearchParams();

    const reference = searchParams.get("reference"); // Paystack sends back a reference parameter
    const appointmentId = searchParams.get("appointmentId");

    const { backendUrl, token } = useContext(AppContext);

    const navigate = useNavigate();

    // Function to verify Paystack payment
    const verifyPaystack = async () => {
        try {
            const { data } = await axios.post(
                backendUrl + "/api/user/verifyPaystack",
                { reference, appointmentId },
                { headers: { token } }
            );

            if (data.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }

            navigate("/my-appointments");
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    };

    useEffect(() => {
        if (token && reference && appointmentId) {
            verifyPaystack();
        }
    }, [token]);

    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="w-20 h-20 border-4 border-gray-300 border-t-4 border-t-primary rounded-full animate-spin"></div>
        </div>
    );
};

export default Verify;
