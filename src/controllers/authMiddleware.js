import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'sua_chave_secreta';

export const autenticarToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido.' });
    }

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido.' });
        }

        // Passa os dados do usuário para a próxima função
        req.userId = decoded.id;
        next();
    });
};
