import AppError from "@modules/errors/AppError";
import {Request, Response, NextFunction} from "express";
import {verify} from "jsonwebtoken";
import {auth} from "../../../config/Auth";

export default function userAuthenticated(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new AppError("JWT token is missing", "Bad Request", 400);
    }

    // indico que a primeira posição não desejo pegar, e a segunda e o meu token
    // Bearer diasohdasdojnisahdikansdlk
    const [, token] = authHeader.split(" ");
    console.log(token)
    try {
        // esse metodo pega o token, e a chave hash que foi especificada, verificando se esse token foi
        // criado com essa secret
        const decodeToken = verify(
            token, authConfig.jwt.secret) as {[key: string]: any};

        const idUser = decodeToken.id

        req.body.userId = idUser
        return next();
    } catch {
        throw new AppError("Invalid Token", "Unauthorized", 401);
    }
}