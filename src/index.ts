import { imageUrl, removeAttributes, renameAttributes } from "./config/config";
import { processJsonFiles } from "./util/utils";


const jsonDir = 'C:/Users/Rооt/OneDrive/Desktop/Projects/Other/Typescript/Formatingjson2/json';


processJsonFiles(jsonDir, removeAttributes, renameAttributes, imageUrl);
