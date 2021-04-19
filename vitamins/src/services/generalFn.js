export const checkParentsClass = (element, classname) => {
    if(element.className.split(' ').includes(classname)) return true;
    if(element.parentNode.className) return checkParentsClass(element.parentNode, classname);
    else return false;
}

export const getDateFormated = (date) => {
    date = new Date(date);
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if(month.toString().length < 2) month = '0' + month;
    if(day.toString().length < 2)   day   = '0' + day;
    return `${day}-${month}-${date.getFullYear()}`;
}

export const htmlEntities = (str) => String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
