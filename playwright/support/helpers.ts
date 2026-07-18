export function generateOrderCode() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numbers = '0123456789'
    const pattern = ['L', 'N', 'N', 'L', 'L', 'L']

    let code = 'VLO-'

    for (let i = 0; i < pattern.length; i++) {
        const source = pattern[i] === 'L' ? letters : numbers
        code += source[Math.floor(Math.random() * source.length)]
    }

    return code
}
