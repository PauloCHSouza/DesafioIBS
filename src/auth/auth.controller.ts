import { Body, Controller, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsuarioLogin } from './interfaces/usuarios.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() user: UsuarioLogin) {
    const validatedUser = await this.authService.validateUser(user);
    console.log(validatedUser);
    
    if (!validatedUser) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const accessToken = await this.authService.login(validatedUser);
    return { access_token: accessToken };
  }

  @Post('protected')
  @UseGuards(AuthGuard('jwt'))
  async protectedRoute() {
    // This route is protected, only accessible with a valid JWT
    return { message: 'This is a protected route.' };
  }
}
