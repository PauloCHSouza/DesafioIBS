import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private readonly authService: AuthService){
        super({
            usernameField: 'login',
        });
    }

    async validate(login: string, password: string){
        const usuario = await this.authService.validateUser(login, password);

        if (!usuario) throw new UnauthorizedException('Login ou senha incorretos');

        return usuario;
    }
}