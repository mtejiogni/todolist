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
        str= str + '<i class="fas fa-pencil-alt edit"></i>';
        str= str + '<i class="far fa-trash-alt delete"></i>';
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
        elt.id= this.reference;
        elt.innerHTML= str;
        return elt;
    }
}

class Database {
    constructor() {
        this.urlapi= 'http://localhost/inubil/todolist/controller/tacheController.php';
    }


    readAll() {
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
                        document.querySelector('#elements').appendChild(tache.convertToHTML());
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



// Créer une tâche
document.querySelector('#form_todolist').onsubmit= function(e) {
    e.preventDefault();
    let objet= document.querySelector('#objet').value;
    let description= document.querySelector('#description').value;
    let priorite= document.querySelector('#priorite').value;
    let date_echeance= document.querySelector('#date').value;
    let tache= new Tache(null, objet, description, priorite, null, date_echeance);
    let db= new Database();
    db.create(tache);
}
