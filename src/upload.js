import multer from 'multer';
import path from 'path';

// Configuração do destino e nome dos arquivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/images/'); // Diretório onde as imagens serão salvas
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});

// Filtros para garantir que o arquivo seja uma imagem
const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (mimeType && extname) {
        return cb(null, true);
    }
    cb(new Error('Arquivo não é uma imagem válida.'));
};

// Configurando o middleware do Multer
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5MB
    fileFilter,
});

export default upload;
