class Tache {
    constructor(reference, objet, description, priorite, statut, date_echeance) {
        this.reference= reference;
        this.objet= objet;
        this.description= description;
        this.priorite= priorite;
        this.statut= statut;
        this.date_echeance= date_echeance;
    }

    setFormatRequest(action) {
        let str= 'objet=' + this.objet + '&';
        str= str + 'description=' + this.description + '&';
        str= str + 'priorite=' + this.priorite + '&';
        str= str + 'date_echeance=' + this.date_echeance + '&';
        if(action != 'create') {
            str= str + 'statut=' + this.statut + '&';
            str= str + 'reference=' + this.reference;
        }
        return str;
    }

    convertToHTML() {
        let str= '';
        str= str + '<div class="entete">';
        str= str + '<div class="entete_objet">';
        str= str + this.objet;
        str= str + '</div>';
        str= str + '<div class="entete_options">';
        str= str + '<span class="edit">';
        str= str + '<i class="fas fa-pencil-alt"></i>';
        str= str + '</span>';
        str= str + '<span class="delete">';
        str= str + '<i class="far fa-trash-alt"></i>';
        str= str + '</span>';
        str= str + '</div>';
        str= str + '</div>';
        str= str + '<div class="corps">';
        str= str + this.description;
        str= str + '</div>';
        str= str + '<div class="footer">';
        str= str + '<div class="footer_left">';
        str= str + this.date_echeance;
        str= str + '</div>';
        str= str + '<div class="footer_right">';
        str= str + this.statut;
        str= str + '</div>';
        str= str + '</div>';

        let elt= document.createElement('div');
        elt.classList.add('element');
        elt.id= 'tache_' + this.reference;
        elt.innerHTML= str;
        return elt;
    }
}

class Database {
    constructor() {
        this.urlapi= 'http://localhost/inubil/todolist/controller/tacheController.php';
    }


    readAll() {
        let self= this;
        let xhttp= new XMLHttpRequest();
        xhttp.open('GET', this.urlapi + '?action=readall', true);
        xhttp.send();
        xhttp.onload= function() {
            if(this.status === 200) {
                console.log(this.responseText);
                let res= JSON.parse(this.responseText);
                if(res.status == 'success') {
                    document.querySelector('#elements').innerHTML= '';
                    for(let i= 0; i< res.datas.length; i++) {
                        let tache= new Tache(
                            res.datas[i].reference,
                            res.datas[i].objet,
                            res.datas[i].description,
                            res.datas[i].priorite,
                            res.datas[i].statut,
                            res.datas[i].date_echeance
                        )

                        let elt= tache.convertToHTML();
                        elt.querySelector(`#tache_${res.datas[i].reference} .edit`).onclick= function() {
                            document.querySelector('#objet').value= res.datas[i].objet;
                            document.querySelector('#description').value= res.datas[i].description;
                            document.querySelector('#priorite').value= res.datas[i].priorite;
                            document.querySelector('#date').value= res.datas[i].date_echeance;
                            document.querySelector('#reference').value= res.datas[i].reference;
                            document.querySelector('#statut').value= res.datas[i].statut;
                        }
                        elt.querySelector('.delete').onclick= function() {
                            self.delete(res.datas[i].reference);
                        }

                        document.querySelector('#elements').appendChild(elt);
                    }
                }
                else {
                    console.error('Internal Error : ', res);
                    alert(res.message);
                }
            }
            else {
                console.error('Request Error : ', this.status, this.statusText);
            }
        }

        console.log(document.querySelector('.edit'));
    }



    create(tache) {
        let self= this;
        let xhttp= new XMLHttpRequest();
        xhttp.open('POST', this.urlapi + '?action=create', true);
        xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhttp.send(tache.setFormatRequest('create'));
        xhttp.onload= function() {
            if(this.status === 200) {
                console.log(this.responseText);
                let res= JSON.parse(this.responseText);
                if(res.status == 'success') {
                    let tache= new Tache(
                        res.datas.reference,
                        res.datas.objet,
                        res.datas.description,
                        res.datas.priorite,
                        res.datas.statut,
                        res.datas.date_echeance
                    )
                    alert(res.message);
                    self.readAll();
                }
                else {
                    console.error('Internal Error : ', res);
                    alert(res.message);
                }
            }
            else {
                console.error('Request Error : ', this.status, this.statusText);
            }
        }
    }


    update(tache) {
        let self= this;
        let xhttp= new XMLHttpRequest();
        xhttp.open('POST', this.urlapi + '?action=update', true);
        xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhttp.send(tache.setFormatRequest(null));
        xhttp.onload= function() {
            if(this.status === 200) {
                console.log(this.responseText);
                let res= JSON.parse(this.responseText);
                if(res.status == 'success') {
                    let tache= new Tache(
                        res.datas.reference,
                        res.datas.objet,
                        res.datas.description,
                        res.datas.priorite,
                        res.datas.statut,
                        res.datas.date_echeance
                    )
                    alert(res.message);
                    self.readAll();
                }
                else {
                    console.error('Internal Error : ', res);
                    alert(res.message);
                }
            }
            else {
                console.error('Request Error : ', this.status, this.statusText);
            }
        }
    }




    updateStatut(tache) {
        let self= this;
        let xhttp= new XMLHttpRequest();
        xhttp.open('POST', this.urlapi + '?action=update_statut', true);
        xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhttp.send(tache.setFormatRequest(null));
        xhttp.onload= function() {
            if(this.status === 200) {
                console.log(this.responseText);
                let res= JSON.parse(this.responseText);
                if(res.status == 'success') {
                    let tache= new Tache(
                        res.datas.reference,
                        res.datas.objet,
                        res.datas.description,
                        res.datas.priorite,
                        res.datas.statut,
                        res.datas.date_echeance
                    )
                    alert(res.message);
                    self.readAll();
                }
                else {
                    console.error('Internal Error : ', res);
                    alert(res.message);
                }
            }
            else {
                console.error('Request Error : ', this.status, this.statusText);
            }
        }
    }



    delete(reference) {
        let self= this;
        let xhttp= new XMLHttpRequest();
        xhttp.open('GET', this.urlapi + '?action=delete&reference=' + reference, true);
        xhttp.send();
        xhttp.onload= function() {
            if(this.status === 200) {
                console.log(this.responseText);
                let res= JSON.parse(this.responseText);
                if(res.status == 'success') {
                    alert(res.message);
                    self.readAll();
                }
                else {
                    console.error('Internal Error : ', res);
                    alert(res.message);
                }
            }
            else {
                console.error('Request Error : ', this.status, this.statusText);
            }
        }
    }




    read(reference) {
        let tache= null;
        let xhttp= new XMLHttpRequest();
        xhttp.open('GET', this.urlapi + '?action=read&reference=' + reference, true);
        xhttp.send();
        xhttp.onload= function() {
            if(this.status === 200) {
                console.log(this.responseText);
                let res= JSON.parse(this.responseText);
                if(res.status == 'success') {
                    tache= new Tache(
                        res.datas.reference,
                        res.datas.objet,
                        res.datas.description,
                        res.datas.priorite,
                        res.datas.statut,
                        res.datas.date_echeance
                    )
                }
                else {
                    console.error('Internal Error : ', res);
                    alert(res.message);
                }
            }
            else {
                console.error('Request Error : ', this.status, this.statusText);
            }
        }
        return tache;
    }

}



// Déclaration des objets
let db= new Database();
db.readAll();




// Créer et modifier une tâche
document.querySelector('#form_todolist').onsubmit= function(e) {
    e.preventDefault();
    let objet= document.querySelector('#objet').value;
    let description= document.querySelector('#description').value;
    let priorite= document.querySelector('#priorite').value;
    let date_echeance= document.querySelector('#date').value;
    let reference= document.querySelector('#reference').value;
    let statut= document.querySelector('#statut').value;
    let tache= new Tache(reference, objet, description, priorite, statut, date_echeance);

    if(reference == null || reference == '') {
        db.create(tache);
    }
    else {
        db.update(tache);
        document.querySelector('#reference').value= '';
        document.querySelector('#statut').value= '';
    }
}
