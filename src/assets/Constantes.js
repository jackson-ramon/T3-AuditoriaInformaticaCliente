const columnsDatosHuerfanos = [
    { width: 400, header: 'Nombre de la tabla', dataKey: 'TableName' },
    { width: 400, header: 'Cantidad encontrada', dataKey: 'OrphanCount', flexGrow: 1},
];

const columnsValoresRepetidos = [
    { width: 400, header: 'Nombre de la tabla', dataKey: 'TableName' },
    { width: 400, header: 'Cantidad encontrada', dataKey: 'DuplicateCount', flexGrow: 1},
];

const columnsCumplirFK = [
    { width: 400, header: 'Nombre de la tabla', dataKey: 'Table' },
    { width: 400, header: 'Constraint', dataKey: 'Constraint' },
    { width: 400, header: 'Clausula', dataKey: 'Where', flexGrow: 1},
];

const columnsIntegridadRefDelUpd = [
    { width: 400, header: 'Clave foránea', dataKey: 'ForeignKeyName' },
    { width: 400, header: 'Tabla padre', dataKey: 'ParentTable' },
    { width: 400, header: 'Tabla referenciada', dataKey: 'ReferencedTable' },
    { width: 400, header: 'Acción de eliminación', dataKey: 'DeleteAction' },
    { width: 400, header: 'Acción de actualización', dataKey: 'UpdateAction', flexGrow: 1},
];

const columnsIntegridadRefInser = [
    { width: 300, header: 'Clave foránea', dataKey: 'ForeignKeyName' },
    { width: 200, header: 'Tabla padre', dataKey: 'ParentTable' },
    { width: 200, header: 'Tabla referenciada', dataKey: 'ReferencedTable' },
    { width: 200, header: 'Columna padre', dataKey: 'ParentColumn' },
    { width: 400, header: 'Es nulo', dataKey: 'IsNullable', flexGrow: 1},
];

const columnsDefinicionesPK = [
    { width: 400, header: 'Nombre de la tabla', dataKey: 'TableName' },
    { width: 400, header: 'Estado de las llaves primarias', dataKey: 'PrimaryKeyStatus', flexGrow: 1},
];

const columnsPosiblesRelacionesExis = [
    { width: 150, header: 'Nombre del trigger', dataKey: 'TriggerName' },
    { width: 150, header: 'Tabla padre', dataKey: 'ParentTable' },
    { width: 150, header: 'Nombre de la tabla', dataKey: 'TableName' },
    { width: 400, header: 'Definición del trigger', dataKey: 'TriggerDefinition', flexGrow: 1 },
];

const columnsPosiblesRelacionesDebExis = [
    { width: 400, header: 'Tabla padre', dataKey: 'ParentTable' },
    { width: 400, header: 'Columna padre', dataKey: 'ParentColumn' },
    { width: 400, header: 'Potencial tabla referenciada', dataKey: 'PotentialReferencedTable', flexGrow: 1},
];

const columnsRelacionesExisten = [
    { width: 300, header: 'Clave foránea', dataKey: 'ForeignKeyName' },
    { width: 200, header: 'Tabla padre', dataKey: 'ParentTable' },
    { width: 200, header: 'Columna padre', dataKey: 'ParentColumn' },
    { width: 200, header: 'Tabla referenciada', dataKey: 'ReferencedTable' },
    { width: 400, header: 'Columna referenciada', dataKey: 'ReferencedColumn', flexGrow: 1},
];

export { 
    columnsDatosHuerfanos,
    columnsValoresRepetidos,
    columnsCumplirFK,
    columnsIntegridadRefDelUpd,
    columnsIntegridadRefInser,
    columnsDefinicionesPK,
    columnsPosiblesRelacionesExis,
    columnsPosiblesRelacionesDebExis,
    columnsRelacionesExisten,
};