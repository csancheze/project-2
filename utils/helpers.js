module.exports = {
  format_date: (date) => {
    return date.toLocaleDateString();
  },
  format_time: (date) => {
    return date.toLocaleTimeString();
  },
  format_time2: (date) => {
    const hour = () => {
      let singlehour = `${new Date(date).getHours()}`
      if (singlehour.length == 1) {
        return `0${singlehour}`
      }else {
        return singlehour
      }   
    }
    const minutes = () => {
        let singleminute = `${new Date(date).getMinutes()}`
        if (singleminute.length == 1) {
          return `0${singleminute}`
        }else {
          return singleminute
        }   
      }
    return `${hour()}:${minutes()}`
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
