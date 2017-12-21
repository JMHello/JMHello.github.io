const data = [
  {
    id: 1,
    name: 1
  },
  {
    id: 2,
    name: 2
  },
  {
    id: 3,
    name: 3
  },
  {
    id: 4,
    name: 4
  },
  {
    id: 5,
    name: 5
  },
  {
    id: 6,
    name: 6
  },
  {
    id: 7,
    name: 7
  },
  {
    id: 8,
    name: 8
  },
  {
    id: 9,
    name: 9
  },
  {
    id: 10,
    name: 10
  },
  {
    id: 11,
    name: 11
  },
  {
    id: 12,
    name: 12
  },
  {
    id: 13,
    name: 13
  },
  {
    id: 14,
    name: 14
  },
  {
    id: 15,
    name: 15
  },
  {
    id: 16,
    name: 16
  },
  {
    id: 17,
    name: 17
  },
  {
    id: 18,
    name: 18
  },
  {
    id: 19,
    name: 19
  },
  {
    id: 20,
    name: 20
  },
  {
    id: 21,
    name: 21
  }
]

/**
 * 模拟ajax
 * @param options
 * @returns {Promise}
 */
function ajax (options) {
  return new Promise((resolve, reject) => {
    const len = data.length
    const perPage = options.perPage
    let cP = options.currentPage
    show(cP, perPage)
    resolve({
      currentPage: cP,
      perPage: perPage,
      totalPages: Math.ceil(len / perPage),
      totalRecords: len
    })
  })
}

/**
 * @desc 展示数据的函数
 * @param currentPage 当前页
 * @param perPage 每页展示的数据数
 */
function show (currentPage, perPage) {
  const list = document.getElementById('list')
  let str = ``
  let newData = data.slice((currentPage - 1) * perPage, perPage * currentPage)
  for (let item of newData) {
    str += `<li>${item.id}</li>`
  }
  list.innerHTML = str
}
