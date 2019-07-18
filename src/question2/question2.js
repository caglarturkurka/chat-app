class Question2 {
  convert(object) {
    let string = object.tmpl;
    if (Object.keys(object.data).length) {
      Object.keys(object.data).map(function (key) {
        string = string.replace(new RegExp("{" + key + "}"), object.data[key]);
      });
    }
    return string;
  }

   operation(data) {
    switch (data.constructor.name) {
      case 'String': {
        return data;
      }
      case 'Array': {
        let results = [];
        for (let index = 0; index < data.length; index++) {
          results.push(this.convert(data[index]));
        }
        return results.join('\n');
      }
      case 'Object': {
        return this.convert(data);
      }
    }
  };
}
let question2 = new Question2();
let stringEx = "I once ate 7 cheesburgers";

let objEx = {tmpl: "My friend is a {opt1}", data: {opt1: "jedi"}};

let arrayEx = [];
arrayEx.push(stringEx);
arrayEx.push(objEx);

let nestedArrEx = [];
nestedArrEx.push(objEx);
nestedArrEx.push(stringEx);
nestedArrEx.push(arrayEx);
nestedArrEx.push(arrayEx.concat([arrayEx.slice()]));

const stringResult = question2.operation(stringEx);
console.log('String: ', stringResult);

const objectResult = question2.operation(objEx);
console.log('Object: ', objectResult);

const arrayResult = question2.operation(arrayEx);
console.log('Array: ', arrayResult);

const nestedArrayResult = question2.operation(nestedArrEx);
console.log('Nested Array: ', nestedArrayResult);
