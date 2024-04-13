import {PartialType} from "@nestJs/mapped-types";
import { createEnderecoDTO } from "./create-endereco.dto";

export class UpdateEnderecoDTO extends PartialType(createEnderecoDTO) {

}
