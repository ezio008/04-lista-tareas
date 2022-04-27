require('colors');

const Tarea = require('./tarea');

class Tareas {

    constructor(list = {}) {
        this._listado = {};
        if (list === null) return;
        this.parseList(list);
    }

    get listadoArr() {
        const listado = [];

        Object.keys(this._listado).forEach(key => {
            listado.push(this._listado[key]);
        });

        return listado;
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    borrarTarea(id = '') {
        if(this._listado[id]) {
            delete this._listado[id];
        }
    }

    parseList(data) {
        const tarea = new Tarea();
        data.forEach(d => {
            this._listado[d.id] = tarea.parseTarea(d);
        })
    }

    listadoCompleto() {
        console.log();

        this.listadoArr.forEach((tarea, i) => {
            const idx = `${i + 1}.`.green;
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn) ? `${completadoEn}`.green : 'Pendiente'.red;

            console.log(`${idx} ${desc} :: ${estado}`);
        });
    }

    listarPendientesCompletadas(completadas = true) {
        console.log();

        const list = this.listadoArr.filter(t => completadas ? t.completadoEn : !t.completadoEn);
        list.forEach((tarea, i) => {
            const idx = `${i + 1}.`.green;
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn) ? `${completadoEn}`.green : 'Pendiente'.red;
            console.log(`${idx} ${desc} :: ${estado}`);
        });
    }

    choicesToDelete() {
        const choices = [{
            value: '0',
            name: `${'0.'.green} Cancelar`
        }];

        this.listadoArr.forEach((tarea, i) => {
            choices.push({
                value: tarea.id,
                name: `${(i + 1).toString().green + '.'.green} ${tarea.desc}`
            });
        });
        return choices;
    }

    choicesToComplete() {
        const choices = [];
                
        this.listadoArr.forEach((tarea, i) => {            
            choices.push({
                value: tarea.id,
                name: `${(i + 1).toString().green + '.'.green} ${tarea.desc}`,
                checked: tarea.completadoEn
            });
        });
        return choices;
    }

    toggleIds(ids = []) {
        Object.keys(this._listado).forEach(key => {            
            if(ids.find(i=> i === this._listado[key].id)) {
                if(!this._listado[key].completadoEn) {
                    this._listado[key].completadoEn = new Date().toISOString();
                }
            } else {
                this._listado[key].completadoEn = null;
            }
        });
    }
}

module.exports = Tareas;