import jwt from 'jsonwebtoken';


export const verifyToken = (request, response, next) => {
    try {
        let token = request.header('Authorization');

        if (!token) {
            return response.status(403).json({ msg: "Authorization denied" });
        }
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length).trimLeft();
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        request.user = verified;
        next();
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
};