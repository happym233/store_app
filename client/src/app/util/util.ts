export function getCookie(key: string) {
  const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
}

export function dollarFormat(v: number) { 
  return `\$ ${ (v / 100).toFixed(2) }`;
}

export function timeFormat(time: string) { 
  const dateTimeSplit = time.split('T');
  const hourMinSplit = dateTimeSplit[1].split(":");
  return dateTimeSplit[0] + " " + hourMinSplit[0] + ":" + hourMinSplit[1];
}