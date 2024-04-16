import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { Strategy } from "passport-jwt";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private readonly authService: AuthService){
        super({
            usernameField: 'login',
        });
    }

    async validate(login: string, senha: string){
        const usuario = await this.authService.validateUser(login, senha);

        if (!usuario) throw new UnauthorizedException('Login ou senha incorretos');

        return usuario;
    }
}