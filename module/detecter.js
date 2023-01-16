const detecter = string => {
    return string
		.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
		.replace(/-/g, '\\x2d')
}

module.exports = {
    detecter : detecter
}