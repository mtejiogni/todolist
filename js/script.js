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
        document.querySelector('#refresh').classList.remove('hide');
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
                        elt.querySelector('.edit').onclick= function() {
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
                        elt.ondblclick= function() {
                            if(res.datas[i].statut == 'En cours') {
                                self.updateStatut(res.datas[i].reference, 'Terminée');
                            }
                            else {
                                self.updateStatut(res.datas[i].reference, 'En cours');
                            }
                        }

                        if(res.datas[i].statut == 'Terminée') {
                            elt.classList.add('bg-second-color');
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

            document.querySelector('#refresh').classList.add('hide');
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




    updateStatut(reference, statut) {
        let self= this;
        let xhttp= new XMLHttpRequest();
        xhttp.open('POST', this.urlapi + '?action=update_statut', true);
        xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhttp.send(`reference=${reference}&statut=${statut}`);
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
let app_form= document.querySelector('#app_form');
let db= new Database();
db.readAll();



// Gestion de la navigation
document.querySelector('#menu_add').onclick= function() {
    app_form.classList.toggle('hide');
    app_form.classList.toggle('anim');
}



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
    app_form.classList.add('hide');
    app_form.classList.remove('anim');
}

// Gestion de la barre de recherche
document.querySelector('#search').onkeyup= function(e) {
    let search= this.value.toLower().trim();
    let elements= document.querySelectorAll('.element');
}