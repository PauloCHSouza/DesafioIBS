import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { createPessoaDTO } from './dto/create-pessoa.dto';
import { UpdatePessoaDTO } from './dto/update-pessoa.dto';
import { PessoaService } from './pessoa.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('pessoas')
@UseGuards(AuthGuard('jwt'))
export class PessoaController {

    constructor(private readonly pessoasService: PessoaService) {}

    @Get()
    async read(){
        return this.pessoasService.list();
    }

    @Get(`:id`)
    async readById(@Param(`id`, ParseIntPipe) id: number){
        return this.pessoasService.showById(id);
    }

    @Post()
    async create(@Body() body: createPessoaDTO){
        return this.pessoasService.create(body);
    }

    @Patch(`:id`)
    async update(@Body() body: UpdatePessoaDTO, @Param(`id`, ParseIntPipe) id: number) {
        return this.pessoasService.update(body, id);
    }

    @Delete(`:id`)
    async delete(@Param(`id`, ParseIntPipe) id: number) {
        return this.pessoasService.delete(id);
    }
}
