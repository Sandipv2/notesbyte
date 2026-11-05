import axios from "axios";
import "dotenv/config";

export const brevoClient = axios.create({
    baseURL: "https://api.brevo.com/v3/smtp/email",
    headers: {
        "api-key": process.env.BREVO_API_KEY,
        "Content-Type": "application/json",
    },
    timeout: 10000
});
