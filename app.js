require('colors');

const { saveDB, readDB } = require('./helpers/database');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmacion, mostrarListadoChecklist } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

console.clear();

const main = async () => {
    let opt = '0';
    const tareas = new Tareas(readDB());

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const desc = await leerInput('Descripción:');
                tareas.crearTarea(desc);
                break;
            case '2':
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listarPendientesCompletadas(true);
                break;
            case '4':
                tareas.listarPendientesCompletadas(false);
                break;
            case '5':
                const ids = await mostrarListadoChecklist(tareas.choicesToComplete());
                tareas.toggleIds(ids);
                break;
            case '6':
                const id = await listadoTareasBorrar(tareas.choicesToDelete());
                if (id !== '0') {
                    const result = await confirmacion(`¿Está seguro?`);
                    if (result) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada');
                    }
                }
                break;
        }

        saveDB(tareas.listadoArr);

        if (opt !== '0') await pausa();
    } while (opt !== '0');
}

main().catch((err) => console.log('Error', err));