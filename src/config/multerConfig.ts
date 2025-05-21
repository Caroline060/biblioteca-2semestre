import multer from 'multer'; // Responsável por lidar com uploads
import path from 'path'; // Trabalha com caminhos de arquivos
import crypto from 'crypto'; // Pode ser usado para gerar hashes aleatórios (opcional)

// Função que gera uma string aleatória de 16 caracteres (letras e números)
function gerarNomeAleatorio(): string {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let resultado = '';
  for (let i = 0; i < 16; i++) {
    const indice = Math.floor(Math.random() * caracteres.length);
    resultado += caracteres[indice];
  }
  return resultado;
}

// Configuração de armazenamento padrão (não para capas)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '..', '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    const hash = crypto.randomBytes(6).toString('hex'); // 12 caracteres hexadecimais
    const ext = path.extname(file.originalname);
    const uuid = (req.body?.uuid || req.params?.uuid || req.query?.uuid || 'sem-uuid');
    const filename = `${uuid}-${hash}-${file.originalname}`;
    cb(null, filename);
  }
});

// Configuração de armazenamento para imagens de capa
const storageCapa = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '..', '..', 'uploads/cover'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const nomeAleatorio = gerarNomeAleatorio(); // 16 caracteres aleatórios
    const nomeFinal = `${nomeAleatorio}${ext}`;
    cb(null, nomeFinal);
  }
});

// Middlewares de upload
export const upload = multer({ storage });
export const uploadCapa = multer({ storage: storageCapa });
