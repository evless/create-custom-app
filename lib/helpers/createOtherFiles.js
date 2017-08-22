import createFile from './createFile';
import npmInit from './npmInit';
import * as FILE from '../constans/fileName';

export default {
    [FILE.BABELRC]: {
        create(content = '{}') {
            createFile('.babelrc', content);
        }
    },

    [FILE.ESLINTRC]: {
        create(content = '{}') {
            createFile('.eslintrc', content);
        }
    },

    [FILE.GITIGNORE]: {
        create(content = 'node_modules') {
            createFile('.gitignore', content);
        }
    },

    [FILE.README]: {
        create(content = 'Readme plz!') {
            createFile('README.md', content);
        }
    },

    [FILE.PACKAGE]: {
        create: npmInit
    }
};