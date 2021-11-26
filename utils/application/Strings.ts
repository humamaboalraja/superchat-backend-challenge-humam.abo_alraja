const replaceStringWithArrayValues = (
  sourceString: string,
  replacements: { [name: string]: string }
) => {
  return sourceString.replace(new RegExp('<([A-z]*)>', 'g'), params => {
    return replacements[params.substring(1, params.length - 1)];
  });

};


export default replaceStringWithArrayValues;
