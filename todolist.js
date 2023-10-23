tarefas = [];
class Tarefa {
    constructor(nome, id, concluida){
        this.nome = nome;
        this.id = id;
        this.concluida = concluida;
    }

}
let id = 0;
let first = true;
let mapa = new Map();
function initTarefas(){

}
function addTarefas(){
    let tarefa = document.getElementById("tarefa");
    if(!tarefa.value) return;
    let tarefaObj = new Tarefa(tarefa.value, id, false);
    tarefas.push(tarefaObj);
    console.log(tarefas[id]);
    id++;
    atualizar(tarefaObj);
    localStorage.setItem('id',id);
    localStorage.setItem('tarefa'+tarefaObj.id.toString()+'id', tarefaObj.id);
    localStorage.setItem('tarefa'+tarefaObj.id.toString()+'nome', tarefaObj.nome);
    localStorage.setItem('tarefa'+tarefaObj.id.toString()+'concluida', tarefaObj.concluida);
}
function concluiTarefa(id){
    let tarefa = tarefas.filter(t => t.id == id)[0]
    if(!tarefa) return;
    tarefa.concluida = true;
    let cartao = mapa.get(tarefa.id);
    let label = cartao.querySelector('.label')
    label.style.color = 'green';
    localStorage.setItem('tarefa'+tarefa.id.toString()+'concluida', true);
    
}
function deletaTarefa(id){
    let tarefa = tarefas.filter(t => t.id == id)[0];
    if(!tarefa) return;
    let index = tarefas.indexOf(tarefa);
    tarefas.splice(index, 1);
    let cartao = mapa.get(id);
    cartao.remove();
    mapa.delete(id);
    localStorage.removeItem('tarefa'+tarefa.id+'id');
    localStorage.removeItem('tarefa'+tarefa.id+'nome');
    localStorage.removeItem('tarefa'+tarefa.id+'concluida');
}
function alteraTarefa(id){
    let tarefa = tarefas.filter(t => t.id == id)[0]
    if(!tarefa) return;
    let editarcartao = document.querySelector('.editarcartao');
    editarcartao.hidden = false;
    let editado = editarcartao.querySelector('.editado');
    editado.addEventListener('click', function(){
        alteraNome(tarefa)
    });
}
function alteraNome(tarefa){
    let input = document.querySelector('.edicao');
    let novoNome = input.value;
    tarefa.nome = novoNome;
    let cartao = mapa.get(tarefa.id);
    let label = cartao.querySelector('.label');
    label.textContent = novoNome;
    let editarcartao = document.querySelector('.editarcartao');
    editarcartao.hidden = true;
}
window.onload = function(){
    let idStorage = localStorage.getItem('id');
    if(idStorage){
        id = idStorage;
        for(let i = 0; i < idStorage; i++){
            let keyid = 'tarefa'+i.toString()+'id';
            let keynome = 'tarefa'+i.toString()+'nome';
            let keyconcluida = 'tarefa'+i.toString()+'concluida';
            let tarefaid = localStorage.getItem(keyid);
            if(!tarefaid) continue;
            let tarefanome = localStorage.getItem(keynome);
            let tarefaconcluida = localStorage.getItem(keyconcluida);
            let tarefa = new Tarefa(tarefanome, tarefaid, tarefaconcluida=='true');
            console.log(tarefa.concluida);
            tarefas.push(tarefa);
        }
    }
    
    for(const tarefa of tarefas){
        atualizar(tarefa);
        console.log(tarefa.concluida)
        if(tarefa.concluida) concluiTarefa(tarefa.id);
    }
}
function atualizar(tarefa){
    let cartao = document.querySelector('.cartao');
    let fundo = document.querySelector('.fundo');
    let cartaoClone = cartao.cloneNode(true);
    cartaoClone.style.display = 'flex';
    const label = cartaoClone.querySelector('.label');
    console.log(label);
    label.textContent = tarefa.nome;
    let cardleft = cartaoClone.querySelector('.cardleft');
    let confirma = cartaoClone.querySelector(".confirma");
    let edita = cartaoClone.querySelector(".edita");
    let deleta = cartaoClone.querySelector(".deleta");
    console.log(confirma);
    confirma.addEventListener('click',function(){
        concluiTarefa(tarefa.id)
    });
    edita.addEventListener('click',function(){
        alteraTarefa(tarefa.id)
    });
    deleta.addEventListener('click',function(){
        deletaTarefa(tarefa.id)
    });
    fundo.appendChild(cartaoClone);
    mapa.set(tarefa.id, cartaoClone)
    if(first){
        cartao.style.display = 'none';
        first = false;
    }
}