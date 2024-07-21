// test/config.js
function generateUniqueName(baseName) {
    const timestamp = Date.now(); // Menggunakan timestamp untuk keunikan
    return `${baseName}_${timestamp}`;
}

function generateUniqueEmail(baseEmail) {
    const [localPart, domain] = baseEmail.split('@');
    const timestamp = Date.now(); // Menggunakan timestamp untuk keunikan
    return `${localPart}+${timestamp}@${domain}`;
}

const baseName = 'Ros9';
const baseEmail = 'mrthnsgn24@gmail.com';

export default {
    baseUrl: 'https://kasir-api.zelz.my.id',
    credentials: {
        name: generateUniqueName(baseName),
        email: generateUniqueEmail(baseEmail),
        password: '123adsfadf'
    }
};


