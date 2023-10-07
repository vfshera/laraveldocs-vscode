import { EXT_NAME } from "../constants";
import * as kleur from 'kleur';


export function logger(logText: string) {

    console.log(`${kleur.bgRed().white().bold(" "+EXT_NAME+" ")} ${logText}`);


}