class HomeService {
    getPositions(){
        return new Promise((res)=> {
            setTimeout(()=> {
                res([
                    {
                      name: "Должность 0",
                      id: 0,
                      type: 'position',
                      children: []
                    },
                    {
                      name: "Должность 1",
                      id: 1,
                      type: 'position',
                      children: [],
                    },
                    {
                      name: "Должность 2",
                      id: 3,
                      children: [],

                      type: 'position'
                    },
                    {
                      name: "Должность 3",
                      id: 4,
                      children: [],

                      type: 'position'
                    },
                    {
                      name: "Должность 4",
                      id: 5,
                      children: [],

                      type: 'position'
                    },
                  ])
            }, 500)
        })
    }
}

export const homeService = new HomeService()