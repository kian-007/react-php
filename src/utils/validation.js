const ValidateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};


const ValidateSubject = (subject) => subject.length > 8;
const ValidateUsername = (username) => username.length > 6 || username.length == 0;
const ValidatePassword = (password) => {
  // var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  // var regularExpression = /(?=.*([A-Z]+))(?=.*([0-9]+))(?=.*([!@#$%^&*.]+))/;
  var regularExpression = /(?=.*([A-Z]+))(?=.*([0-9]+))/;
  return regularExpression.test(password)
};


export { ValidateEmail, ValidateSubject, ValidateUsername, ValidatePassword };


