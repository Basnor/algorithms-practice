const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });

let studentsNumber = 0;
let studentsUniversityId = [];

rl.on('line', (line) => {
   if (studentsNumber === 0) {
       studentsNumber = +line;
       return;
   }

   if (studentsUniversityId.length !== studentsNumber) {
       studentsUniversityId = line.split(' ').map(Number).sort((a, b) => a - b);
       return;
   }

   const k = +line;
   const map = new Map();

   for (const id of studentsUniversityId) {
       if (map.has(id)) {
           map.set(id, map.get(id) + 1);
       }
       else {
           map.set(id, 1);
       }
   }

   const result = [...map].sort((a, b) => b[1] - a[1]).slice(0, k).map(([id, /* number */]) => id);

   console.log(result.join(' '));
   rl.close();
});