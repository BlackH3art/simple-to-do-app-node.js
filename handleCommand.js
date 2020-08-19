const handleData = require('./handleData')

const handleCommand = ({add, remove, list}) => {
  if(add) {
    if(typeof add !== "string") {
      return console.log('Jakie zadanie chcesz dodać? Użyj tekstu!'.red);
    } else if (add.length < 7) {
      return console.log('Zadanie musi mieć więcej niż 7 znaków'.red);
    }
    handleData(1, add);
  } else if(remove) {
      if(typeof remove !== "string" || remove.length < 7) {
        return console.log('Jakie zadanie usunąć? TEKST powyżej 6 znaków'.red);
      } 
      handleData(2, remove);
  } else if(list || list === "") {
    console.log('drusuu brbrrbrbrbrrrr');
    handleData(3, null);
  } else {
    console.log(`nie wiem o co Ci chodzi, użyj:
    --add="nazwa zadania",
    --remove="nazwa zadania",
    --list`);
  }
}

module.exports = handleCommand;
