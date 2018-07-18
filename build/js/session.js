$(document).ready(function () {
    //
    // Define your database
    //
    var db = new Dexie("dbusuario");
    db.version(1).stores({
        user: '&id,cpf,email'
    });
    db.open().catch (function (err) {
        console.error('Failed to open db: ' + (err.stack || err));
    });
    db.user.get('1').then((res)=>{
        if(res === undefined){
            db.user.put({id:'1',isLogado:'false',nome:'',cpf:'',email:''}).then(()=>{
                console.log('Criado');
            });
        }else{
            console.log('Existe');
        }
    }).catch((err)=>{
        console.error('Failed to open db: ' + (err.stack || err));
    });
});