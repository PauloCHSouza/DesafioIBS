import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createEnderecoDTO } from './dto/create-endereco.dto';
import { UpdateEnderecoDTO } from './dto/update-endereco.dto';
import { validate } from 'class-validator';

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
        const enderecoData = new createEnderecoDTO();
        enderecoData.cep = cep;
        enderecoData.endereco = endereco;
        enderecoData.numero = numero;
        enderecoData.complemento = complemento ? complemento : '';
        enderecoData.bairro = bairro;
        enderecoData.estado = estado;
        enderecoData.cidade = cidade;
        enderecoData.idpessoas = idpessoas;

        try {
            await this.validateInput(enderecoData);
        } catch (errors) {
            throw new BadRequestException('Dados de entrada inválidos.', errors);
        }

        return await this.prisma.enderecos.create({
            data: enderecoData,
            include: {
                pessoas: true
            }
        });
    }

    async update({cep, endereco, numero, complemento, bairro, estado, cidade}: UpdateEnderecoDTO, id: number) {

        await this.existe(id);

        const enderecoData = new UpdateEnderecoDTO();
        enderecoData.cep = cep;
        enderecoData.endereco = endereco;
        enderecoData.numero = numero;
        enderecoData.complemento = complemento;
        enderecoData.bairro = bairro;
        enderecoData.estado = estado;
        enderecoData.cidade = cidade;

        try {
            await this.validateInput(enderecoData);
        } catch (errors) {
            throw new BadRequestException('Dados de entrada inválidos.', errors);
        }

        return await this.prisma.enderecos.update({
            data: enderecoData,
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
        const endereco = await this.showById(id);
        if (!endereco) {
            throw new NotFoundException(`O Endereço ${id} não existe.`);
        }
    }

    private async validateInput(input: any): Promise<void> {
        const errors = await validate(input);
        if (errors.length > 0) {
            const validationErrors = this.formatValidationErrors(errors);
            throw validationErrors;
        }
    }

    private formatValidationErrors(errors: any[]): string {
        const formattedErrors = errors.map(error => {
            const constraints = Object.values(error.constraints).join(', ');
            return `${error.property}: ${constraints}`;
        });
        return formattedErrors.join('; ');
    }
}
