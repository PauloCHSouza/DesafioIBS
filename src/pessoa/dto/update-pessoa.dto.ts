import { createPessoaDTO } from "./create-pessoa.dto";
import {PartialType} from "@nestJs/mapped-types";

export class UpdatePessoaDTO extends PartialType(createPessoaDTO) {

}
