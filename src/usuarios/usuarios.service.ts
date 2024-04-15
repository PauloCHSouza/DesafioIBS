import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createPessoaDTO } from './dto/create-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
    constructor(private readonly prisma: PrismaService) {}
  
    async criarUsuario({nome, login, senha}: createPessoaDTO) {
      const senhaHash = await bcrypt.hash(senha, 10);
  
      const usuario = await this.prisma.usuario.create({
        data: {
          nome,
          login,
          senha: senhaHash,
        },
      });
  
      return usuario;
    }
}
