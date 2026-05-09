import express from 'express';
import productRoutes from './routes/product.routes.js';

const app = express();

app.use(express.json());
app.use(productRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando no http://localhost:${PORT}`);
});