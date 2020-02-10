export function calculateTimes(time: Date): string {
  const dateNow = new Date(Date.now());
  const diff = dateNow.getTime() - new Date(time).getTime();
  let msec = diff;

  const hh = Math.floor(msec / 1000 / 60 / 60);
  msec -= hh * 1000 * 60 * 60;
  const mm = Math.floor(msec / 1000 / 60);
  msec -= mm * 1000 * 60;
  const ss = Math.floor(msec / 1000);
  msec -= ss * 1000;

  let timeString = '';
  if (hh !== 0 && mm !== 0) {
    return (timeString =
      ss === 0
        ? `${hh <= 9 ? '0' + hh : hh}h ${mm <= 9 ? '0' + mm : mm}m ago`
        : `${hh <= 9 ? '0' + hh : hh}h ${mm <= 9 ? '0' + mm : mm}m ${
            ss <= 9 ? '0' + ss : ss
          }s ago`);
  }

  if (hh === 0) {
    if (mm === 0) {
      return (timeString =
        ss === 0 ? 'now' : `${ss <= 9 ? '0' + ss : ss}s ago`);
    }
    return (timeString =
      ss === 0
        ? `${mm <= 9 ? '0' + mm : mm}m ago`
        : `${mm <= 9 ? '0' + mm : mm}m ${ss <= 9 ? '0' + ss : ss}s ago`);
  }
  if (mm === 0) {
    return (timeString =
      ss === 0
        ? 'now'
        : `$${hh <= 9 ? '0' + hh : hh}h ${ss <= 9 ? '0' + ss : ss}s ago`);
  }
  return (timeString =
    ss === 0
      ? 'now'
      : `${hh <= 9 ? '0' + hh : hh}h ${mm <= 9 ? '0' + mm : mm}m ${
          ss <= 9 ? '0' + ss : ss
        }s ago`);
}
