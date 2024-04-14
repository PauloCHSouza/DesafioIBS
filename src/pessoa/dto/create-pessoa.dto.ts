import { Type } from "class-transformer";
import { IsDateString, IsString, ValidateNested } from "class-validator";
import { createEnderecoDTO } from "src/endereco/dto/create-endereco.dto";

export class createPessoaDTO {

    @IsString()
    nome: string;

    @IsString()
    sexo: string;

    @IsDateString()
    dtNascimento: string;

    @IsString()
    estadoCivil: string;

    @ValidateNested()
    @Type(() => createEnderecoDTO)
    enderecos: createEnderecoDTO[];
}