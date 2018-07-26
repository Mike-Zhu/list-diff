function diff(oldList, newList, key) {
    const newKeyList = getKey(newList, key),
        oldKeyList = getKey(oldList, key),
        diffList = [],
        length = newList.length
    //不变
    const oldSortList = oldKeyList.map(res => newKeyList.indexOf(res) >= 0 ? newKeyList.indexOf(res) : null)
    let i = 0,
        j = 0
    while (i < oldSortList.length) {
        if (oldSortList[i] === null) {
            diffList.push({
                index: i - j,
                type: 0//删除
            })
            j++
        }
        i++
    }
    let filterList = oldSortList.filter(res => res !== null)
    let k = 0
    while (k < filterList.length) {
        let oldIndex = filterList.indexOf(k)
        if (k !== oldIndex) {
            let insert = filterList.splice(oldIndex, 1)[0]
            filterList.splice(k, 0, insert)
            diffList.push({
                index: k,
                itemIndex: oldIndex,
                type: 2 //换位置
            })
        }
        k++
    }
    let l = 0,
        newLength = newKeyList.length
    while (filterList.length < newLength) {
        if (filterList.indexOf(l) < 0) {
            filterList.push(l)
            diffList.push({
                index: k,
                item: newList[l],
                type: 1 //新增
            })
        }
        l++
    }
    return diffList
}

function getKey(list, key) {
    const pureList = Array.isArray(list) ? list : []
    return isFunction(key) ? pureList.map(key) : pureList.map(item => item[key || 'key'])
}

function isFunction(data) {
    return toString.call(data) === "[object Function]"
}