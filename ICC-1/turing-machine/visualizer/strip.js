class Strip {
  constructor(nums) {
    this.nums = nums.split("");
    
    this.blankCells = 10;
    this.cells = new Array(nums.length + this.blankCells * 2); 
    this.initialCells = this.cells.map(n => n);
    
    // add blank spaces
    for (let i = 0; i < this.blankCells; i++) {
      this.nums.unshift(undefined);
      this.nums.push(undefined);
    }
    this.initialNums = this.nums.map(n => n);
    
    this.currentCell = this.nums.length - 1 - this.blankCells;
    this.initialCurrentCell = this.currentCell;
    
    // this.state can be: RUNNING or ENDED
    this.state = "RUNNING"; 
    
    this.initialNum = parseInt(nums, 2);
    
    this.stripHasMoved = false;
  }
  
  show() {
    const cellDimensions = 50;
    
    for (let i = 0; i < this.cells.length; i++) {
      
      const currentX = width / 2 - (cellDimensions * (this.cells.length / 2)) + i * cellDimensions;
    const currentY = height - 200;
      
      
      // draw cell
      if (this.currentCell == i) {
        strokeWeight(4);
        stroke(150, 30, 30);
        line(currentX + cellDimensions, currentY, currentX + cellDimensions, currentY + cellDimensions);
        square(currentX, currentY, cellDimensions);
      } else {
        strokeWeight(2);
        stroke(30, 30, 30);
        square(currentX, currentY, cellDimensions);
      }
      
      // draw left stroke of highlighted cell (it is overlapped by the cell on the right)
      if (this.currentCell == i - 1) {
        strokeWeight(4);
        stroke(150, 30, 30);
        line(currentX, currentY, currentX, currentY + cellDimensions);
      }
      
      // draw nums
      if (this.nums[i]) {
        textSize(24);
        strokeWeight(1);
        stroke(30)
        textAlign(CENTER, CENTER);
        text(this.nums[i], currentX + cellDimensions / 2, currentY + cellDimensions / 2 + 3)
      }
    }
  }
  
  showStripInfo() {
    // user navigation
    textSize(18);
    strokeWeight(1);
    stroke(30)
    textAlign(CENTER, CENTER);
    text("Cique em qualquer lugar para ir para o próximo passo!", width / 2, 30);

    textSize(24);
    strokeWeight(1);
    stroke(30)
    textAlign(CENTER, CENTER);  
    
    text(`Estado atual: ${this.state == "RUNNING" ? "0" : "Programa Encerrado"}`, width / 2, height / 2 - 180);
    
    // program status
    if (this.state == "RUNNING") {
      
      text(`Entrada atual: ${this.nums[this.currentCell] ? this.nums[this.currentCell] : "Espaço em Branco"}`, width / 2, height / 2 - 140);
      
      const editInstruction = Number(this.nums[this.currentCell]) ? "Escreva 0" : "Escreva 1";
      textSize(20);
      text(`Instrução de edição: ${editInstruction}`, width / 2, height / 2 - 80);
      
      const movementInstruction = Number(this.nums[this.currentCell]) ? "Mova a fita para a direita" : "Nada";
      text(`Instrução de movimento: ${movementInstruction}`, width / 2, height / 2 - 50);
      
      const nextState = Number(this.nums[this.currentCell]) ? "0" : "Programa Encerrado";
      text(`Próximo estado: ${nextState}`, width / 2, height / 2 - 20);
      
    } else if (this.state == "ENDED") {
      textSize(24);
      strokeWeight(1);
      stroke(30)
      textAlign(CENTER, CENTER);
      text(`Fim do programa!`, width / 2, height / 2 - 100);
      textSize(18);
      text(`Clique em qualquer lugar para reiniciar.`, width / 2, height / 2 - 70);
    }
    
    // number on strip info
    const currentNum = parseInt(this.nums.join(""), 2)
    
    textSize(20);
    strokeWeight(1);
    stroke(30)
    textAlign(CENTER, CENTER);
    
    text(`Número inicial: ${this.initialNum}  Objetivo: ${this.initialNum + 1}`, width / 2, height - 100);
    text(`Número atual: ${currentNum}`, width / 2, height - 70);
    
  }
  
  // "previous" num   
  moveStripLeft() {
    this.nums.shift();
    this.cells.shift();
    this.currentCell--;
  }
  
  // "next" num 
  moveStripRight() {
    this.nums.unshift(undefined);
    this.cells.unshift(undefined);
    this.currentCell++;
  }
  
  update() {
    
    /*
      1 Leia a entrada
      2 Se a entrada for 0:
      3   Escreva 1
      4   Pare o programa
      5 Se a entrada for 1:
      6   Escreva 0
      7   Mova a fita para a direita
      8   Volte para a linha 1
      9 Se a entrada for um espaço em branco:
      10  Escreva 1
      11  Pare o programa
    */
    
    if (this.state == "RUNNING") {
      const num = this.nums[this.currentCell];

      if (num == 0) {
        this.nums[this.currentCell] = "1";
        this.state = "ENDED";
        this.stripHasMoved = true;
        return true;
      } else if (num == 1) {
        this.nums[this.currentCell] = "0";
        this.currentCell--;
        this.stripHasMoved = false;
      } else {
        this.nums[this.currentCell] = "1";
        this.state = "ENDED";
        this.stripHasMoved = true;
        return true;
      }
    } else {
      // reset
      this.nums = this.initialNums.map(n => n);
      this.cells = this.initialCells.map(n => n);
      this.currentCell = this.initialCurrentCell;
      this.state = "RUNNING";
    }
    
    
    // check if it is necessary to move the strip
    if (this.currentCell - this.initialCurrentCell < -6 && !this.stripHasMoved) {
      this.moveStripRight();
      this.stripHasMoved = true;
    }
    
    
    return false;
  }
}