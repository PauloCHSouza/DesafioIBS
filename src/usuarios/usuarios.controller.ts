import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { createPessoaDTO } from './dto/create-usuario.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('usuarios')
@UseGuards(AuthGuard('jwt'))
export class UsuariosController {
    constructor(private readonly usuariosService: UsuariosService) {}
  
    @Post()
    async cadastrarUsuario(@Body() body: createPessoaDTO) {
      const usuario = await this.usuariosService.criarUsuario(body);
      return usuario;
    }
}
