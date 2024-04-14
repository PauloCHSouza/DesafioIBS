import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { createPessoaDTO } from './dto/create-pessoa.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePessoaDTO } from './dto/update-pessoa.dto';
import { validate } from 'class-validator';

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
      const pessoa = new createPessoaDTO();
      pessoa.nome = nome;
      pessoa.sexo = sexo;
      pessoa.dtNascimento = dtNascimento;
      pessoa.estadoCivil = estadoCivil;
      pessoa.enderecos = enderecos;

      try {
          await this.validateInput(pessoa);
      } catch (errors) {
          throw new BadRequestException('Dados de entrada inválidos.', errors);
      }

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

  async update({ nome, sexo, dtNascimento, estadoCivil, enderecos }: UpdatePessoaDTO, id: number) {
      await this.existe(id);

      const pessoa = new UpdatePessoaDTO();
      pessoa.nome = nome;
      pessoa.sexo = sexo;
      pessoa.dtNascimento = dtNascimento;
      pessoa.estadoCivil = estadoCivil;
      pessoa.enderecos = enderecos;

      try {
          await this.validateInput(pessoa);
      } catch (errors) {
          throw new BadRequestException('Dados de entrada inválidos.', errors);
      }

      const enderecosParaCriar = enderecos.filter(x => x.idenderecos === undefined);
      const enderecosParaEditar = enderecos.filter(x => x.idenderecos !== undefined);

      const pessoaUpdate = {
          nome,
          sexo,
          dtNascimento: new Date(dtNascimento),
          estadoCivil,
          enderecos: {
              create: enderecosParaCriar.map(endereco => ({
                  cep: endereco.cep,
                  endereco: endereco.endereco,
                  numero: endereco.numero,
                  complemento: endereco.complemento,
                  bairro: endereco.bairro,
                  cidade: endereco.cidade,
                  estado: endereco.estado
              })),
              updateMany: enderecosParaEditar.map(endereco => ({
                  data: {
                      cep: endereco.cep,
                      endereco: endereco.endereco,
                      numero: endereco.numero,
                      complemento: endereco.complemento,
                      bairro: endereco.bairro,
                      cidade: endereco.cidade,
                      estado: endereco.estado
                  },
                  where: { idenderecos: endereco.idenderecos }
              }))
          }
      };

      const retornoPessoa = await this.prisma.pessoas.update({
          data: pessoaUpdate,
          where: { idpessoas: id },
          include: { enderecos: true }
      });

      return retornoPessoa;
  }

  async delete(id: number) {
      await this.existe(id);

      await this.prisma.enderecos.deleteMany({
          where: {
              pessoas: {idpessoas: id}
          }
      });

      return await this.prisma.pessoas.delete({
          where: {
              idpessoas: id
          }
      });
  }

  async existe(id: number) {
      const pessoa = await this.showById(id);
      if (!pessoa) {
          throw new NotFoundException(`A Pessoa ${id} não existe.`);
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
