import path from 'path';

import parseSchemaJs from './parseSchemaJs';
import parseSchemaJson from './parseSchemaJson';
import * as SCHEMA_NAME from '../constans/schemaName';
import SCHEMA_LIST from '../constans/schemaList';

export default function({ customSchema, schemaName, ...options }) {
    switch (schemaName) {
        case SCHEMA_NAME.CUSTOM:
            let extname = path.extname(customSchema);
            switch (extname) {
                case '.js':
                    parseSchemaJs({
                        schema: customSchema,
                        schemaName,
                        ...options
                    });
                    break;
                case '.json':
                    parseSchemaJson({
                        schema: customSchema,
                        schemaName,
                        ...options
                    });
                    break;
            }
            break;
        default:
            parseSchemaJs({
                schema: SCHEMA_LIST[schemaName],
                schemaName,
                ...options
            });
            break;
    }
}