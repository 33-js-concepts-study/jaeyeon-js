
const solution = (customer, K) => {
    let result = new Set();
    let waiting = [];

    customer.forEach((person) => {
        let id = person[0];
        let reserve = person[1];
        if (reserve === 1) {
            if (result.size < K) {
                result.add(id);
            }
            else
                waiting.push(id);
        } else { // 예약취소를 한 경우.
            // 방배정에서 제거
            if (result.has(id)) {
                result.delete(id);
                // 대기자에서 1순위 고객 빼고 방배정에 넣기
                let firstWaiting = waiting.shift();
                if (firstWaiting != undefined && result.size < K)
                    result.add(firstWaiting);
            }

            if (waiting.indexOf(id) != -1 && !result.has(id)) {
                // 대기자에서 취소를 한것이다.
                let idx = waiting.indexOf(id);
                waiting.splice(idx, 1);
            }
        }
    });
    let room = Array.from(result);
    room.sort((a, b) => {
        return a - b;
    });
    return room;
};




// let result1 = solution([[1,1],[2,1],[3,1],[2,0],[2,1]], 2)
let result2 = solution([[2,1],[1,1],[3,1],[1,0],[1,1],[2,0],[2,1]], 1);
// let result3 = solution([[2, 1], [3, 1], [4, 1], [3, 0], [1, 1], [2, 0], [4, 0], [2, 1]], 3);
// let result4 = solution([[3, 1], [4, 1], [4, 0], [3, 0], [2, 1], [1, 1]], 2);
// console.log(result1);
console.log(result2); // 기대값 [3]
// console.log(result3);
// console.log(result4);

