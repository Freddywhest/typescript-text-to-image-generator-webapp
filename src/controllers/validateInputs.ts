import { NextFunction, Request, Response } from "express";

interface RequestData{
    imageNumber: number,
    imageName: string
}

export default function validateInputs (req: Request, res: Response, next: NextFunction) {
    console.log(req.body);
    const { imageName, imageNumber }: RequestData  = req.body;
    
    if(!imageName && !imageNumber) return res.send({ status: false, message: "Image name and Image number shouldn't be empty!" });
    if(!imageNumber) return res.send({ status: false, message: "Image number shouldn't be empty!" });
    if(!imageName) return res.send({ status: false, message: "Image name shouldn't be empty!" });
    if(imageNumber > 10 ) return res.send({ status: false, message: "Image number shouldn't be less than 10!" });
    next();
}