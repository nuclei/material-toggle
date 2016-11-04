/**
 * toggle attribute
 */
export default function(el, attr, condition, value = ''){
    if(condition === true){
        return el.setAttribute(attr,value);
    }else{
        return el.removeAttribute(attr);
    }
}
