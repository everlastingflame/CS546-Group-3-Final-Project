function validateString(string, name = "string") {
  if (!string) {
    throw `Error: Did not supply ${name}`;
  }
  if (typeof string !== "string") {
    throw `Error: ${name} is type [${typeof string}], not string`;
  }
  string = string.trim();
  if (string.length === 0) {
    throw `Error: ${name} is empty or just spaces`;
  }
  return string;
}

function validateDate(date, name = "date") {
  date = validateNonEmptyString(date, name);
  if (!date.match(/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}/)) {
    throw `Error: ${date} is not in mm/dd/yyyy format`;
  }
  const _day = dayjs(date, "MM/DD/YYYY", true);
  if (!_day.isValid()) {
    throw `Error: ${date} is invalid`;
  }
  if (_day.isAfter(dayjs(), "day")) {
    throw `Error: ${date} cannot be in the future`;
  }
  if (dayjs().diff(_day, "year") < 13) {
    throw `Error: ${date} user must be at least 13 years old`;
  }

  return date;
}

export default {
  validateString, validateDate
};
