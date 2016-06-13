const fileReaderWithPromise = (file, readAs = 'readAsDataURL', hookType= 'onload') => {
  return new Promise((resolve, reject) => {
    let fileReader = new FileReader();
    fileReader[hookType] = () => resolve(fileReader)
    fileReader.onerror = () => reject
    fileReader[readAs](file)
  })
}

const angleToInt = (degree, minute, second) => {
  const { numerator: degreeNumerator } = degree
  const { numerator: minuteNumerator, denominator: minuteDenominator} = minute
  const { numerator: secondNumerator, denominator: secondDenominator} = second

  return degreeNumerator + minuteNumerator/(60 * minuteDenominator) + secondNumerator/(3600 * secondDenominator)

}

const createUniqObject = () =>{
  return {
    uuid: new Date().getTime()
  }
}

export {fileReaderWithPromise, angleToInt, createUniqObject}
