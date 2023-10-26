const fs = require('fs/promises');
const handlebars = require('handlebars');


const htmlCompiler = async (file, context) => {
    const emailFile = await fs.readFile(file);
    const compiler = handlebars.compile(emailFile.toString());
    const emailFileString = compiler(context)
    return emailFileString
}

module.exports = htmlCompiler;