module.exports = {
  format_time: (date) => {
      if (date instanceof Date) {
          return date.toLocaleTimeString();
      } else {
          console.error("Invalid date object in format_time function.");
          return "N/A";
      }
  },
  format_date: (date) => {
      return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
  },
};


  