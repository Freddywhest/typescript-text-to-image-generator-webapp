import express, { Application, Request, Response, NextFunction } from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import validateInputs from './controllers/validateInputs';
import { Configuration, OpenAIApi } from 'openai';

interface RequestData{
    imageNumber: string,
    imageName: string
}
const app: Application = express();
config();
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.set("view engine", 'ejs');

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.get('/', (req: Request, res: Response) => {
    res.render('index', { title: "Home" });
});

app.post('/generate-image', validateInputs, async (req: Request, res: Response) => {
    const { imageName, imageNumber }: RequestData  = req.body;
    try {
        const response = await openai.createImage({
            prompt: imageName,
            n: parseInt(imageNumber),
            size: "1024x1024",
        });

        res.send({status: true, data: response.data.data});
        
    } catch (error) {
        res.send({status: true, data: error});
        
    }
})

app.listen(process.env.PORT, () => {
    console.log(`
        App running on port:${process.env.PORT} \n
        http://localhost:${process.env.PORT} \n
        http://127.0.0.1:${process.env.PORT}
    `);
});
