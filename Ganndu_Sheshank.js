function lexer(input){
    const tokens = [];
    let cursor = 0;

    while(cursor < input.length){
        let char = input[cursor];

        if(/\s/.test(char)){
            cursor++;
            continue;
        }

        if(/[a-zA-Z_]/.test(char)){
            let word = '';
            while(/[a-zA-Z0-9_]/.test(char) && cursor < input.length){
                word += char;
                cursor++;
                char = input[cursor];
            }

            if(word === 'Gandu_Sheshank_Ye' || word === 'Chutiye_Sheshank_Bol'){
                tokens.push({ type: 'KEYWORD', value: word });
            } else {
                tokens.push({ type: 'IDENTIFIER', value: word });
            }
            continue;
        }

        if(/[0-9]/.test(char)){
            let num = '';
            while(/[0-9]/.test(char) && cursor < input.length){
                num += char;
                cursor++;
                char = input[cursor];
            }
            tokens.push({ type: 'NUMBER', value: parseInt(num) });
            continue;   // ✅ IMPORTANT
        }

        if(/[+\-*/%=]/.test(char)){
            tokens.push({ type: 'OPERATOR', value: char });
            cursor++;
            continue;
        }
    }

    return tokens;
}

function parser(tokens){
    const ast = { type: 'Program', body: [] };
    while(tokens.length > 0){
        const token = tokens.shift();

        if(token.type === 'KEYWORD' && token.value === 'Gandu_Sheshank_Ye'){
            let declaration = {
                type: 'Declaration',
                name: tokens.shift().value,
                value: null
            };

            if(tokens[0].type === 'OPERATOR' && tokens[0].value === '='){
                tokens.shift();

                let expression = '';
                while(tokens.length > 0 && tokens[0].type !== 'KEYWORD'){
                    expression += tokens.shift().value;
                }
                declaration.value = expression.trim();
            }
            ast.body.push(declaration);
        }
        if(token.type === 'KEYWORD' && token.value === 'Chutiye_Sheshank_Bol'){
            ast.body.push({
                type: 'Print',
                expression: tokens.shift().value
            });
        }
    }
    return ast;
}

function CodeGen(node){
    switch(node.type){
        case 'Program':
            return node.body.map(CodeGen).join('\n');
        case 'Declaration':
            return `const ${node.name} = ${node.value};`;
        case 'Print':
            return `console.log(${node.expression});`;
        default:
            throw new TypeError(node.type);
    }
}

function compilier(input){
    const tokens = lexer(input);
    const ast = parser(tokens);
    const executableCode = CodeGen(ast);
    //console.log(executableCode);
    return executableCode;
}

function runner(input){
    eval(input);
}

const code = `
  Gandu_Sheshank_Ye a = 20
  Gandu_Sheshank_Ye b = 10
  Gandu_Sheshank_Ye sum = a / b

  Chutiye_Sheshank_Bol sum
`

const exec=compilier(code);
runner(exec);
