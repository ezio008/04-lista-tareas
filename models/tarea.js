const { v4: uuidv4 } = require('uuid');

class Tarea {
    id = '';
    desc = '';
    completadoEn = null;

    constructor(desc = '') {
        this.id = uuidv4();
        this.desc = desc;
    }

    parseTarea(data) {
        const tarea = new Tarea(data['desc']);
        tarea.id = data['id'];
        tarea.completadoEn = data['completadoEn'];
        return tarea;
    }
}

module.exports = Tarea;