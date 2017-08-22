import createFile from './createFile';

export default function(items) {
    if (Array.isArray(items)) {
        items.map(item => {
            if (item.fileName && item.content)
                createFile(item.fileName, item.content);
        });
    } else if ('object' === typeof items) {
        if (items.fileName && items.content)
            createFile(items.fileName, items.content);
    }
}