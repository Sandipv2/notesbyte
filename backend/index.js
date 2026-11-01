import express from 'express';

const PORT = process.env.PORT || 3000;

const app = express();

app.get('/', (req,res) => {
    res.json({
        message: "Sab changa si!"
    })
})

app.listen(PORT, () => {
    console.log(`Server running http://localost:${PORT}`);
})