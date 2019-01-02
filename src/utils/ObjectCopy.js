/**
 * Created by ENLINK on 2017/6/29.
 */

export function   deepCopy(p, c) {
    var c = c || {};
    for (var i in p) {
        if (typeof p[i] === 'object') {
            c[i] = (p[i].constructor === Array) ? [] : {};
            this.deepCopy(p[i], c[i]);
        } else {
            c[i] = p[i];
        }
    }
    return c;
}