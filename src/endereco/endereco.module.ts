import { EnderecoService } from './endereco.service';
import { EnderecoController } from './endereco.controller';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EnderecoController],
  providers: [EnderecoService],
  exports: [EnderecoService]
})
export class EnderecoModule {}
