var oldList = [1, 2, 3, 5, 9].map(res => ({
    id: res,
}))
var newList = [1, 10, 7, 4, 9, 5, 8, 11, 12, 13, 14, 15, 16, 17, 18, 19].map(res => ({
    id: res,
}))
var moves = diff(oldList, newList, "id")

var app = document.querySelector('#app'),
    ul = document.createElement('ul')

oldList.forEach(res => {
    let li = getLi(res)
    ul.appendChild(li)
})

function getLi(res) {
    let li = document.createElement('li')
    li.innerHTML = res.id
    return li
}

app.appendChild(ul)
console.log(`moves' length is ${moves.length}`)
console.log(moves)
setTimeout(() => {
    let time1 = new Date().getTime()
    let childNodes = ul.childNodes
    moves.forEach(res => {
        switch (res.type) {
            //delete
            case 0:
                ul.removeChild(childNodes[res.index])
                break
            //add
            case 1:
                if (childNodes.length > res.index) {
                    ul.insertBefore(getLi(res.item), childNodes[res.index])
                } else {
                    ul.appendChild(getLi(res.item))
                }
                break
            //move
            case 2:
                ul.insertBefore(childNodes[res.oldIndex], childNodes[res.newIndex])
                break
        }
    })
    let time2 = new Date().getTime()
    console.log(`list length is ${moves.length} and rerender use ${time2 - time1} ms`)
}, 1500)