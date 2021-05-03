// Feito por Arthur Vergaças como atividade da disciplina de ICC 1. ICMC | USP

/*
* Sobre o programa:  
*   Esse programa tem como objetivo facilitar o entendimento do incremento de um número binário usando uma Máquina de Turing.   
*
* Como usar:
*    Clique no botão de play no canto direito da tela para iniciar o programa 
*    Clique em qualquer lugar da tela para continuar a execução da máquina (basicamente mover a fita).
*
*    Sinta-se livre para investigar o código e fazer críticas ou sugestões. Eu não sei exatamente como funciona a edição 
*    do código na plataforma do p5.js online (rs), mas qualquer coisa só me mandar mensagem!
*/

// Mude essa variável para um número fixo se deseja testar algum valor específico
const numero = Math.floor(Math.random() * 511);


const num = Number(numero).toString(2);
let strip = new Strip(num);

let hasEnded = false;

function setup() {
  createCanvas(540, 540);
}

function draw() {
  background(210);
  
  strip.show();
  strip.showStripInfo();
  
  if (hasEnded) {
    const numero = Math.floor(Math.random() * 511);
    const num = Number(numero).toString(2);
    strip = new Strip(num);
  }
  
  if (!hasEnded) {
    hasEnded = strip.update();
  } else {
    hasEnded = false;
  }
  
  noLoop();
}


function mousePressed() {
  loop();
}
