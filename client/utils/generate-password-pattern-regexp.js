export function generatePasswordPatternRegexp({
  username = '',
  lowerCase,
  upperCase,
  digit,
  specialCharacter,
  allowRepeat,
  useTightPattern,
  useLoosePattern,
  tightCharacterLength = 8,
  looseCharacterLength = 15
} = {}) {
  username = ''
  lowerCase = lowerCase == undefined ? true : false
  digit = digit == undefined ? true : false
  allowRepeat = allowRepeat == undefined ? true : false
  useLoosePattern = useLoosePattern == undefined ? true : false

  var tightChecklist = useTightPattern
    ? [
        lowerCase ? '(?=.*[a-z])' : '', // has at least one lower case character
        upperCase ? '(?=.*[A-Z])' : '', // has at least one upper case character
        digit ? '(?=.*\\d)' : '', // has at least one digit
        specialCharacter ? '(?=.*[!@#$%^&*()])' : '', // has at least one special character
        allowRepeat !== true ? '(?!.*(.)\\1(?=\\1{1,}))' : '', // has not an repeated character more than twice
        `.{${tightCharacterLength},}` // has a length of 8 and more
      ]
    : []

  var looseChecklist = useLoosePattern
    ? [
        `.{${looseCharacterLength},}` // has a length of 15 and more
      ]
    : []

  if (username.length > 0) {
    var checkSameAsUsernameRegex = `(?!.*${username})` // has not userName => set it by a variable
    var usernameChunks = []

    for (var i = 0; i <= username.length - 3; i++) {
      var chunk = username.slice(i, i + 3)
      usernameChunks.push(chunk)
    }

    var usernameChunkChecklist = usernameChunks.map(chunk => `(?!.*${chunk})`)
    tightChecklist.splice(-2, 0, checkSameAsUsernameRegex, ...usernameChunkChecklist)
  }

  var checkList = [
    '^', // from start
    ...tightChecklist,
    tightChecklist.length && looseChecklist.length ? '|' : '',
    ...looseChecklist,
    '$' //to the end"
  ]

  // return checklist.join('')
  return new RegExp(checkList.join(''))
}
