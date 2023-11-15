import {Encrypt} from "../../app/utils/encrypt";
import jwt from "jsonwebtoken";
import {jwt as jwtConfig} from "../config/config";


export class EncryptImpl implements Encrypt{
    encrypt(data: any): string {
        const token = jwt.sign(data, jwtConfig.secretKey, { expiresIn: jwtConfig.expirationTime });
        return token;
        throw new Error("Method not implemented");
    }

    decrypt(text: string): string {
        throw new Error("Method not implemented");
    }

}