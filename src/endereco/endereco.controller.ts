import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { EnderecoService } from './endereco.service';
import { createEnderecoDTO } from './dto/create-endereco.dto';
import { UpdateEnderecoDTO } from './dto/update-endereco.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('enderecos')
@UseGuards(AuthGuard('jwt'))
export class EnderecoController {

    constructor(private readonly enderecoService: EnderecoService) {}

    @Get()
    async read(){
        return this.enderecoService.list();
    }

    @Get(`:id`)
    async readById(@Param(`id`, ParseIntPipe) id: number){
        return this.enderecoService.showById(id);
    }

    @Post()
    async create(@Body() body: createEnderecoDTO){
        return this.enderecoService.create(body);
    }

    @Patch(`:id`)
    async update(@Body() body: UpdateEnderecoDTO, @Param(`id`, ParseIntPipe) id: number) {
        return this.enderecoService.update(body, id);
    }

    @Delete(`:id`)
    async delete(@Param(`id`, ParseIntPipe) id: number) {
        return this.enderecoService.delete(id);
    }
}
