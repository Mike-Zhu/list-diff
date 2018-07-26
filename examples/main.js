var newList = Array(2000).fill(1).map((res, index) => ({
    id: index
}))
var oldList = Array(2000).fill(1).map((res, index) => ({
    id: index
})).sort((a, b) => Math.random() * 2 - 1)
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
                ul.insertBefore(childNodes[res.itemIndex], childNodes[res.index])
                break
        }
    })
    let time2 = new Date().getTime()
    console.log(`list length is ${moves.length} and rerender use ${time2 - time1} ms`)
}, 3000)