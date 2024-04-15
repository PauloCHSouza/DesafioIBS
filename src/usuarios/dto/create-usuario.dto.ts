import {IsString } from "class-validator";

export class createPessoaDTO {

    @IsString()
    nome: string;

    @IsString()
    login: string;

    @IsString()
    senha: string;
}