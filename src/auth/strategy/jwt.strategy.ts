import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_KEY,
        });
    }

    async validate(payload: any) {
        return { id: payload.sub, nome: payload.nome, email: payload.email, arquivo: payload.arquivo, monitory: payload.monitory, permissoes: payload.permissoes };
    }
}
