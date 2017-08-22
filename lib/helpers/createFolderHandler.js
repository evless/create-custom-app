import createFolder from './createFolder';

export default function(items) {
    if (Array.isArray(items)) {
        items.map(createFolder);
    } else if ('string' === typeof items) {
        createFolder(items);
    }
}