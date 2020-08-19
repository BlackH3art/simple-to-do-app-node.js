const colors = require('colors');
const fs = require('fs');


const handleData = (type, title) => {
  //type - number ( 1 - add, 2 - remove, 3 - list)
  //title - string || null
  const data = fs.readFileSync('datadb.json'); // generuje obiekt Buffer 
  // const data = fs.readFileSync('datadb.json', 'utf-8'); // zwraca stringa
  // let data = fs.readFileSync('datadb.json');
  // data = data.toString(); // też zwróci stringa
  let tasks = JSON.parse(data) // przetwarza na string, a potem na obiekt

  if(type == 1 || type == 2) {
    isExisted = tasks.find(task => task.title == title) ? true : false;
    if(type == 1 && isExisted) {
      return console.log('zadanie już istnieje!'.bgRed);
    } else if(type == 2 && !isExisted) {
      return console.log('Nie można usunąć zadania, które nie istnieje'.bgRed);
    }
  }

  let dataJSON = "";
  switch (type) {
    case 1:
      tasks = tasks.map((task, index) => ({id: index + 1, title: task.title}))

      const id = tasks.length + 1;
      tasks.push({id: id, title: title})

      dataJSON = JSON.stringify(tasks);

      fs.writeFileSync('datadb.json', dataJSON);
      console.log(`dodaję zadanie: ${title}`.bgGreen);

      break;
    
    case 2:
      console.log('odejmuję zadanie'.bgGreen);

      const index = tasks.findIndex(task => task.title === title)
      tasks.splice(index, 1);

      tasks = tasks.map((task, index) => ({id: index + 1, title: task.title}))

      dataJSON = JSON.stringify(tasks);
      
      fs.writeFile('datadb.json', dataJSON, 'utf-8', (error) => {
        if(error) throw error;
        console.log(`Zadanie "${title}" zostało usunięte`.bgGreen);
      })

      break;
    
    case 3:
      console.log(`Lista zadań do zrobienia (${tasks.length}). Wykonaj: `.bgGreen);
      if(tasks.length) { 
        tasks.forEach((task, index) => {
          if(index % 2) return console.log(task.title.green);
          return console.log(task.title.yellow);
        })
      }
      break;

    default:
      console.log('nie wiem o co chodzi'.bgRed);
  }
}


module.exports = handleData;