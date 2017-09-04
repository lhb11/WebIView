/* ===============================================
 *                公 用 资 源 函 数
 * ===============================================
 * */
import config from '../config/config'

let util = {
  title: title => {
    title = title || config.title
    window.document.title = title
  },
  uuid() {
    /* eslint one-var: ["error", "always"] */
    /* eslint-env es6 */
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      let r = Math.random() * 16 | 0,
        v = c === 'x'
          ? r
          : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  },
  // 获取昨日为今年第几日
  /* eslint one-var: ["error", "always"] */
  /* eslint-env es6 */
  getDayOfYear: function(val) {
    let date = new Date(val),
      year = date.getFullYear(),
      month = date.getMonth(),
      day = date.getDate(),
      days = [
        31,
        (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
          ? 29
          : 28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31
      ]
    return days
      .slice(1, month)
      .reduce((acculator, num) => acculator + num, days[0]) + day
  }
}
export default util
