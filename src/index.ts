import { outputFile } from "./config/config";
import { deleteFilesWithArrowAttribute } from "./util/utils";


const jsonDir = 'C:/Users/Rооt/OneDrive/Desktop/Projects/Other/Typescript/Formatingjson2/json';

deleteFilesWithArrowAttribute(jsonDir, outputFile)

// countFilesWithArrowAttribute(jsonDir).then((count) => {
//   console.log(`Количество файлов с атрибутом "arrow": ${count}`);
// })