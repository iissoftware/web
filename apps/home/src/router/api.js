exports.alertBox = ( parent, msg, cls, isTrue ) => {
    let elem = document.createElement('span');
        elem.innerHTML = msg;
        elem.className = cls;
    let isExist = parent.querySelector( '.' + cls );
    if( !isExist ) {        //不存在才添加，防止多次添加节点
        parent.appendChild( elem );
    }
    if( isTrue ) {
        setTimeout(()=>{
            parent.removeChild(elem);           //2秒后移除该节点
        },2000);
    }
}
exports.rmAlertBox = ( parent, cls ) => {           //移除节点
    let childNode = parent.querySelector(cls);
    if( childNode ) {       //存在才移除
        parent.removeAttribute('class');
        parent.removeChild( childNode );
    }
}