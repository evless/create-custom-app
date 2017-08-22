import * as SCHEMA_NAME from './schemaName';

export default {
    [SCHEMA_NAME.WDIO_CUCUMBER]: require('../schema/wdio'),
    [SCHEMA_NAME.FRONT_BACK]: require('../schema/frontBack')
}