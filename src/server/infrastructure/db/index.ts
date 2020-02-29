import lowdb from 'lowdb';
import FileASync from 'lowdb/adapters/FileASync';
import path from 'path';
import fs from 'fs-extra';
import { app } from 'electron';

const appHome = app.getPath('userData')
const dbPath = path.join(appHome, 'AppData')
if (!fs.pathExistsSync(dbPath)) {
    fs.mkdirpSync(dbPath)
}
console.log('appHome:', appHome)

export const createDbHandler = <T>(dbFile: string, defaultValue?: T) => {
    const adapter = new FileASync(path.join(dbPath, dbFile), {
        defaultValue
    })

    return lowdb(adapter)
}