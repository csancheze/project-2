module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  format_time: (date) => {
    return date.toLocaleTimeString();
  },
  format_date2: (date) => {

    const month = () => {
      let singlemonth = `${new Date(date).getMonth() + 1}`
      if (singlemonth.length == 1) {
        return `0${singlemonth}`
      }else {
        return singlemonth
      }
    } 

    const day = () => {
      let singleday = `${new Date(date).getDate()}`
      if (singleday.length == 1) {
        return `0${singleday}`
      }else {
        return singleday
      }
    } 

    return `${new Date(date).getFullYear()}-${month()}-${day()}`;
  },

}