import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioLogin } from './interfaces/usuarios.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async login(user) {
    const payload = { nome: user.nome, login: user.login,};

    return {
      sucesso: true,
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(login: string, senha: string) {
    let usuario: UsuarioLogin[];
    let usuarioLogado: UsuarioLogin;

    try {
      const ususarioRep = this.prisma.usuario.findUnique({
        where: { login },
      });
    } catch (error) {
      return null;
    }
    let aceitaLogar = false;
    if (usuario.length > 0) {
      usuario.forEach((x) => {
        const isPasswordValid = compareSync(senha, x.senha);
        if (isPasswordValid) {
          aceitaLogar = true;
          usuarioLogado = x;
        }
      });
    }
    if (!aceitaLogar) return null;

    return usuarioLogado;
  }
}

