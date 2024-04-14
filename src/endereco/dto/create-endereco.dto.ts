import {IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class createEnderecoDTO {

    @IsOptional()
    @IsNumber()
    idenderecos: number;

    @IsString()
    cep: string;

    @IsString()
    endereco: string;

    @IsString()
    numero: string;

    @IsString()
    @IsOptional()
    complemento: string;

    @IsString()
    bairro: string;

    @IsString()
    estado: string;

    @IsString()
    cidade: string;

    @IsOptional()
    @IsNumber()
    idpessoas: number;
}