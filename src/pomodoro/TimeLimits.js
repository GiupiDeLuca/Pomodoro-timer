

export function checkFocusTime(time) {
    if (time > 3600) {
      time = 3600
    } else if (time < 300) {
      time =  300
    }
    return time 
}

export function checkBreakTime(time) {
    if (time > 900) {
      return 900
    } else if (time < 60) {
      return 60
    }
    return time 
}