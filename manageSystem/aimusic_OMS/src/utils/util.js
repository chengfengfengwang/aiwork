function getPosition(e) {
    var x= e.getBoundingClientRect().left;

　　var y =e.getBoundingClientRect().top;
    return { x, y }
};
 export {getPosition}