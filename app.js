
// Fungsi untuk menghitung GCD menggunakan algoritma Euclid dan menampilkan langkahnya
function gcdWithSteps(a, b) {
let steps = [];
while (b != 0) {
    steps.push(`GCD(${a}, ${b}): ${a} % ${b} = ${a % b}`);
    let temp = b;
    b = a % b;
    a = temp;
}
steps.push(`GCD adalah ${a}`);
return { gcd: a, steps: steps };
}

// Fungsi untuk menghitung Extended Euclid untuk mencari x dan y, juga menampilkan langkahnya
function extendedEuclid(a, b) {
if (b == 0) {
    return {
    x: 1,
    y: 0,
    steps: [`Extended Euclid(${a}, ${b}): x = 1, y = 0`],
    };
}
let result = extendedEuclid(b, a % b);
let x1 = result.x;
let y1 = result.y;
let x = y1;
let y = x1 - Math.floor(a / b) * y1;
result.steps.push(`Extended Euclid(${a}, ${b}): x = ${x}, y = ${y}`);
return { x: x, y: y, steps: result.steps };
}

// Fungsi untuk menghasilkan penjelasan solusi dalam bentuk template seperti yang diminta
function generateSolutionTemplate(
a,
b,
c,
x0,
y0,
g,
gcdSteps,
euclidSteps,
s,
t
) {
// Penjelasan GCD
let explanation = `Diketahui ${a}x + ${b}y = ${c}.<br>`;
explanation += `Langkah mencari GCD:<br><ul>`;
gcdSteps.forEach((step) => {
    explanation += `<li>${step}</li>`;
});
explanation += `</ul><br>Diperoleh gcd(${a}, ${b}) = ${g} dan ${g} | ${c}, sehingga ${a}x + ${b}y memiliki solusi.<br>`;

// Penjelasan Extended Euclid
explanation += `Untuk mencari salah satu solusinya, digunakan algoritma Euclid yang diperluas.<br>`;
explanation += `Langkah mencari Euclid yang diperluas:<br><ul>`;
euclidSteps.forEach((step) => {
    explanation += `<li>${step}</li>`;
});
explanation += `</ul><br>Salah satu solusinya adalah s = ${s}, dan t = ${t}.<br>`;
explanation += `Karena c = ${c}, sehingga x<sub>0</sub> = ${x0} dan y<sub>0</sub> = ${y0}.<br><br>`;

// Solusi umum
explanation += `Diperoleh bahwa semua solusinya berbentuk:<br>`;
explanation += `x = ${x0} + (${b}/${g})n = ${x0} + ${b / g}n<br>`;
explanation += `y = ${y0} - (${a}/${g})n = ${y0} - ${a / g}n<br>`;
explanation += `dimana n elemen bilangan bulat.<br><br>`;

// Contoh pengecekan solusi
explanation += `Cek beberapa solusi:<br>`;
explanation += `n = 0 => x = ${x0}, y = ${y0}<br>`;
explanation += `n = 1 => x = ${x0 + b / g}, y = ${y0 - a / g}<br>`;
explanation += `n = 2 => x = ${x0 + 2 * (b / g)}, y = ${
    y0 - 2 * (a / g)
}<br>`;
explanation += `dst.<br>`;

return explanation;
}

// Fungsi untuk menghitung solusi persamaan Diophantine
function solveDiophantine() {
// Ambil nilai input
let a = parseInt(document.getElementById("a").value);
let b = parseInt(document.getElementById("b").value);
let c = parseInt(document.getElementById("c").value);

// Cek input valid atau tidak
if (isNaN(a) || isNaN(b) || isNaN(c)) {
    document.getElementById(
    "result"
    ).innerHTML = `<div class="alert alert-danger">Harap masukkan nilai valid untuk a, b, dan c.</div>`;
    return;
}

// Langkah GCD
let gcdResult = gcdWithSteps(a, b);
let g = gcdResult.gcd;

// Cek apakah GCD membagi c
if (c % g != 0) {
    document.getElementById(
    "result"
    ).innerHTML = `<div class="alert alert-danger">Tidak ada solusi karena GCD(a, b) tidak membagi c.</div>`;
} else {
    // Temukan solusi dasar menggunakan Extended Euclid
    let extendedResult = extendedEuclid(a, b);
    let s = extendedResult.x;
    let t = extendedResult.y;

    // Sesuaikan solusi dasar untuk mendapatkan solusi untuk persamaan ax + by = c
    let factor = c / g;
    let x0 = s * factor;
    let y0 = t * factor;

    // Buat template solusi yang diminta dengan langkah-langkah GCD dan Extended Euclid
    let solutionTemplate = generateSolutionTemplate(
    a,
    b,
    c,
    x0,
    y0,
    g,
    gcdResult.steps,
    extendedResult.steps,
    s,
    t
    );

    // Tampilkan solusi lengkap
    document.getElementById(
    "result"
    ).innerHTML = `<div class="alert alert-success">${solutionTemplate}</div>`;
}
}
