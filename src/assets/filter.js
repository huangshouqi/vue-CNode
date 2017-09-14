// 将tab标题转为中文
let toString = (value) => {
  if (!value) return '分享'
  switch (value) {
    case 'ask':
      return '问答'
      break
    case 'share':
      return '分享'
      break
    case 'good':
      return '精华'
      break
    case 'job':
      return '招聘'
      break
    default:
      return '分享'
  }
}

// 将UTC时间转换为发布计时
let getTime = (value) => {
  if (!value) return '暂无数据'
  let publish_time = new Date(value).getTime()
  let now_time = new Date().getTime()

  let time_s = (now_time - publish_time) / 1000

  let years = parseInt(time_s / 3600 / 24 / 30 / 12)
  let months = parseInt(time_s / 3600 / 24 / 30)
  let days = parseInt(time_s / 3600 / 24)
  let hours = parseInt(time_s / 3600 % 24)
  let minutes = parseInt(time_s / 60 % 60)
  let seconds = parseInt(time_s % 60)

  let r_years = months % 12 // 月数大于6则看做一年

  if (years && r_years > 6) {
    return years + 1 + ' 年前';
  } else if (years || months === 12) {
    return years + ' 年前';
  } else if (months && months < 12) {
    return months + ' 月前';
  } else if (days) {
    return days + ' 天前';
  } else if (hours) {
    return hours + ' 小时前'
  } else if (minutes) {
    return minutes + ' 分钟前'
  } else if (seconds) {
    return ' 刚刚发布'
  }
}

export {toString, getTime}
