import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioLogin } from './interfaces/usuarios.interface';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async login(user: UsuarioLogin) {
    const payload = { nome: user.nome, login: user.login };
    const accessToken = this.jwtService.sign(payload);
    return { access_token: accessToken };
  }

  async validateUser(payload: any): Promise<any> {
    const { login, senha } = payload;
    if (!senha || !login) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const usuario = await this.prisma.usuario.findUnique({
      where: { login },
    });

    if (!usuario) {
      throw new UnauthorizedException('Usuário não encontrado');
    }
    console.log(usuario);
    
    const senhaValida = await bcrypt.compare(payload.senha, usuario.senha);
    if (!senhaValida) {
      throw new UnauthorizedException('Senha inválida');
    }

    return { nome: usuario.nome, login: usuario.login };
  }
}
