class Filter {
    constructor(e) {
        let t = e ? e.list : void 0;
        t || (t = require("./filtersets/en.json")
                .filter), this.useRegex = !!e && e.useRegex, this.useRegex ? this.filter = new Set(t.map(e => RegExp(e, "g"))) : this.filter = new Set(t), this.config = {}, this.cleanWith = e && e.cleanWith ? e.cleanWith : "*", this.minFiltered = this.useRegex ? 0 : this.filter.values()
            .next()
            .value.length, this.useRegex || this.filter.forEach(e => {
                e.length < this.minFiltered && (this.minFiltered = e.length)
            }), this.replacements = new Map([
                [/!/g, "i"],
                [/@/g, "a"],
                [/4/g, "a"],
                [/\$/g, "s"],
                [/3/g, "e"],
                [/8/g, "b"],
                [/1/g, "i"],
                [/0/g, "o"],
                [/4/g, "h"],
                [/7/g, "t"],
                [/9/g, "g"],
                [/6/g, "b"],
                [/8/g, "b"],
            ])
    }
    normalize(e) {
        return e = e.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, ""), this.replacements.forEach((t, l) => e = e.replace(l, t)), e.replace(/[^a-zA-Z\s]/g, "")
    }
    clean(e) {
        let t = new Set(this.getUncleanWordIndexes(e));
        return e.split(/ +/g)
            .map((e, l) => t.has(l) ? this.cleanWith.repeat(e.length) : e)
            .join(" ")
    }
    getAllCombos(e) {
        return e.split(/ +/g)
            .map(e => /(.)\1{1,}/.test(e) && e.length > this.minFiltered ? allPossibleCases(combos(e)) : [e])
    }
    debug(e) {
        console.log(`Normalized:
	${this.normalize(e)}`), console.log(`isUnclean:
	${this.isUnclean(e)}`), console.log(`uncleanWordIndexes:
	${this.getUncleanWordIndexes(e)}`), console.log(`cleaned:
	${this.clean(e)}`), console.log(`getCombos:
	${this.getAllCombos(e)}`)
    }
    getUncleanWordIndexes(e) {
        e = this.normalize(e);
        let t = [],
            l = this.getAllCombos(this.normalize(e));
        for (let s = 0; s < l.length; s++)
            for (let n = 0; n < l[s].length; n++) this.isWordUnclean(l[s][n]) && t.push(s);
        return t
    }
    isUnclean(e) {
        let t = this.getAllCombos(this.normalize(e));
        for (let l = 0; l < t.length; l++)
            for (let s = 0; s < t[l].length; s++)
                if (this.isWordUnclean(t[l][s])) return !0;
        return !1
    }
    isWordUnclean(e) {
        if (!this.useRegex) return this.filter.has(e); {
            let t = !1;
            return this.filter.forEach(l => {
                l.test(e) && (t = !0)
            }), t
        }
    }
}

function allPossibleCases(e) {
    if (1 == e.length) return e[0];
    for (var t = [], l = allPossibleCases(e.slice(1)), s = 0; s < l.length; s++)
        for (var n = 0; n < e[0].length; n++) t.push(e[0][n] + l[s]);
    return t
}

function combos(e) {
    let t = [],
        l = e[0];
    for (let s = 1; s <= e.length; s++) l[0] == e[s] ? l += e[s] : (t.push(l), l = e[s]);
    let n = [];
    for (let i = 0; i < t.length; i++) {
        let r = [];
        t[i].length >= 2 && r.push(t[i][0].repeat(2)), r.push(t[i][0]), n.push(r)
    }
    return n
}
module.exports = Filter;