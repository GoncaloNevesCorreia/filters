// definimos a classe
class Observable {
  // cada instância da classe Observer
  // começa com um array vazio de observadores/observers
  // que reagem a uma mudança de estado
  constructor() {
    this.observers = [];
  }

  // adicione a capacidade de inscrever um novo objeto / Elemento DOM
  // essencialmente, adicione algo ao array de observadores
  subscribe(f) {
    this.observers.push(f);
  }

  // adicione a capacidade de cancelar a inscrição de um objeto em particular
  // essencilamente, remove algum item do array de observadores
  unsubscribe(f) {
    this.observers = this.observers.filter(subscriber => subscriber !== f);
  }

  // atualiza todos os objetos inscritos / Elementos DOM
  // e passa alguns dados para cada um deles
  notify(data) {
    this.observers.forEach(observer => observer(data));
  }
}



/*
  Este construtor cria um objeto que contem os dados 
  correspondentes a uma propriedade de css "filter"
  com a syntax: 
	
	objeto {
		name -> Nome da propriedade
		selected -> checkbox correspondente está selecionada
		type -> tipo de dados
		min -> minimo valor aceite
		max -> maximo valor
		default -> valor por defeito
		value -> valor atual
	}

*/
function objBuilder(obj, property, name, selected, type, min, max, def, value) {

  obj[property] = {
    name: name,
    selected: selected,
    type: type,
    min: min,
    max: max,
    default: def,
    value: value
  }
  return obj;
}

export { Observable, objBuilder };
