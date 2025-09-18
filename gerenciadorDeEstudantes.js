// ---------------------------------------------
// Sistema para gerenciamento de estudantes em JavaScript.
// ---------------------------------------------

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let alunos = []; // lista dos alunos

// Função para validar dados
function validar(nome, idade, notas) {
  if (!nome || nome.trim() === "") {
    console.log("Nome inválido!");
    return false;
  }
  if (isNaN(idade) || idade <= 0) {
    console.log("Idade inválida!");
    return false;
  }
  if (!Array.isArray(notas) || notas.length === 0 || notas.some(n => isNaN(n) || n < 0 || n > 10)) {
    console.log("Notas inválidas!");
    return false;
  }
  return true;
}

// Cadastrar aluno
function cadastrarAluno() {
  rl.question("Nome do aluno: ", function(nome) {
    rl.question("Idade do aluno: ", function(idade) {
      rl.question("Notas separadas por vírgula: ", function(notasTxt) {
        let notas = notasTxt.split(",").map(Number);
        if (validar(nome, Number(idade), notas)) {
          let aluno = {nome: nome, idade: Number(idade), notas: notas};
          alunos.push(aluno);
          console.log("Aluno cadastrado!\n");
        }
        menu();
      });
    });
  });
}

// Listar alunos
function listarAlunos() {
  if (alunos.length == 0) {
    console.log("Nenhum aluno cadastrado.\n");
  } else {
    alunos.map((a, i) => {
      console.log((i+1) + ". " + a.nome + " - Idade: " + a.idade + " - Notas: " + a.notas.join(", "));
    });
    console.log();
  }
  menu();
}

// Buscar aluno por nome
function buscarAluno() {
  rl.question("Digite parte do nome: ", function(busca) {
    let resultado = alunos.filter(a => a.nome.toLowerCase().includes(busca.toLowerCase()));
    if (resultado.length == 0) {
      console.log("Nenhum aluno encontrado.\n");
    } else {
      resultado.forEach(a => console.log("Encontrado: " + a.nome + " - Idade: " + a.idade));
      console.log();
    }
    menu();
  });
}

// Calcular médias
function calcularMedias() {
  if (alunos.length == 0) {
    console.log("Nenhum aluno cadastrado.\n");
    menu();
    return;
  }

  alunos.forEach(a => {
    a.media = a.notas.reduce((soma, n) => soma + n, 0) / a.notas.length;
    console.log(a.nome + " - Média: " + a.media.toFixed(2));
  });

  let mediaGeral = alunos.reduce((soma, a) => soma + a.media, 0) / alunos.length;
  let melhorAluno = alunos.reduce((m, a) => (a.media > m.media ? a : m));

  console.log("Média da turma: " + mediaGeral.toFixed(2));
  console.log("Melhor aluno: " + melhorAluno.nome + " (" + melhorAluno.media.toFixed(2) + ")\n");

  menu();
}

// Relatório
function relatorio() {
  if (alunos.length == 0) {
    console.log("Nenhum aluno cadastrado.\n");
    menu();
    return;
  }

  console.log("Relatório de situação:");
  alunos.forEach(a => {
    let situacao = "";
    if (a.media >= 7) {
      situacao = "Aprovado";
    } else if (a.media >= 5) {
      situacao = "Recuperação";
    } else {
      situacao = "Reprovado";
    }
    console.log(a.nome + " - Média: " + a.media.toFixed(2) + " - " + situacao);
  });
  console.log();
  menu();
}

// Menu
function menu() {
  console.log("===== MENU =====");
  console.log("1. Cadastrar aluno");
  console.log("2. Listar alunos");
  console.log("3. Buscar aluno");
  console.log("4. Calcular médias");
  console.log("5. Relatório");
  console.log("0. Sair");

  rl.question("Escolha: ", function(op) {
    if (op == "1") {
      cadastrarAluno();
    } else if (op == "2") {
      listarAlunos();
    } else if (op == "3") {
      buscarAluno();
    } else if (op == "4") {
      calcularMedias();
    } else if (op == "5") {
      calcularMedias();
      relatorio();
    } else if (op == "0") {
      console.log("Saindo...");
      rl.close();
    } else {
      console.log("Opção inválida.\n");
      menu();
    }
  });
}

// Início
menu();
