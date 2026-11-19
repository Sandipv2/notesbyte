import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({
            success: false,
            message: "Not registered or login. Token not found."
        })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;

    next();
}

export const optionalVerifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return next();

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
    } catch {
        
    }

    next();
}