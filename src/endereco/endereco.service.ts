import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createEnderecoDTO } from './dto/create-endereco.dto';
import { UpdateEnderecoDTO } from './dto/update-endereco.dto';

@Injectable()
export class EnderecoService {

    constructor(private readonly prisma: PrismaService) {}

    async list() {
        return await this.prisma.enderecos.findMany({
            include: {
                pessoas: true
            }
        });
    }

    async showById(id: number) {
        return await this.prisma.enderecos.findUnique({
            where: {
                idenderecos: id
            },
            include: {
                pessoas: true
            }
        });
    }

    async create({cep, endereco, numero, complemento, bairro, estado, cidade, idpessoas }: createEnderecoDTO){
        return await this.prisma.enderecos.create({
            data: {
                cep,
                endereco,
                numero,
                complemento: complemento ? complemento : '',
                bairro,
                estado,
                cidade,
                idpessoas
            },
            include: {
                pessoas: true
            }
        });
    }

    async update({cep, endereco, numero, complemento, bairro, estado, cidade}: UpdateEnderecoDTO, id: number) {

        await this.existe(id);

        return await this.prisma.enderecos.update({
            data: {
                cep,
                endereco,
                numero,
                complemento,
                bairro,
                estado,
                cidade
            },
            where: {
                idenderecos: id
            },
            include: {
                pessoas: true
            }
        });
    }

    async delete(id: number) {

        await this.existe(id);

        return await this.prisma.enderecos.delete({
            where: {
                idenderecos: id
            }
        });
    }

    async existe(id: number) {
        if(!(await this.showById(id))){
            throw new NotFoundException(`A Pessoa ${id} não existe.`);
        }
    }
}
