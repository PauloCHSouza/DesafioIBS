import { Injectable, NotFoundException } from '@nestjs/common';
import { createPessoaDTO } from './dto/create-pessoa.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePessoaDTO } from './dto/update-pessoa.dto';

@Injectable()
export class PessoaService {

    constructor(private readonly prisma: PrismaService) {}

    async list() {
        return await this.prisma.pessoas.findMany({
            include: {
                enderecos: true
            }
        });
    }

    async showById(id: number) {
        return await this.prisma.pessoas.findUnique({
            where: {
                idpessoas: id
            },
            include: {
                enderecos: true
            }
        });
    }

    async create({nome, sexo, dtNascimento, estadoCivil, enderecos}: createPessoaDTO){
        return await this.prisma.pessoas.create({
            data: {
                nome,
                sexo,
                dtNascimento: new Date(dtNascimento),
                estadoCivil,
                enderecos: {
                    create: enderecos
                }
            },
            include: {
                enderecos: true
            }
        });
    }

    async update({nome, sexo, dtNascimento, estadoCivil}: UpdatePessoaDTO, id: number) {
        
        await this.existe(id);
        

        return await this.prisma.pessoas.update({
            data: {
                nome,
                sexo,
                dtNascimento: new Date(dtNascimento), 
                estadoCivil
            },
            include: {
              enderecos: true,
            },
            where: {
                idpessoas: id
            }
        });
    }

    async delete(id: number) {

        await this.existe(id);

        return await this.prisma.pessoas.delete({
            where: {
                idpessoas: id
            }
        });
    }

    async existe(id: number) {
        if(!(await this.showById(id))){
            throw new NotFoundException(`A Pessoa ${id} não existe.`);
        }
        return true
    }
}
