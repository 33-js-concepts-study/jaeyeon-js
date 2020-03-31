
const solution = (truck, w) => {
    // set initialize
    let answer = new Array(w.length);
    for (let i = 0; i < answer.length; i++)
        answer[i] = -1;
    for (let i = 0; i < w.length; i++) {
        for (let j = 0; j < truck.length; j++) {
            if (truck[j] >= w[i] && w[i] != 0) {
                // shipping package
                truck[j] -= w[i];
                w[i] = 0;
                answer[i] = j+1;
            }
        }
    }
    return answer;
};


const result1 = solution([1,4,5,2,4], [2,4,4,3,2]);
const result2 = solution([2,7,4,9], [7,6,8]);

console.log(result1);
console.log(result2);
