const vehicules0 = {
  name: "Название ГО",
  children: [
    {
      name: "Департамент 1",
      children: [
        {
          name: "Отдел 1",
        },
        {
          name: "Отдел 2",
        },
      ],
    },
    {
      name: "Департамент 2",
      children: [
        {
          name: "Отдел 1",
        },
        {
          name: "Отдел 2",
        },
      ],
    },
  ],
};
const vehicules1 = {
  name: "Название ГО",
  children: [
    {
      name: "Департамент 1",
      children: [
        {
          name: "Отдел 1",
        },
        {
          name: "Отдел 2",
        },
        {
          name: "Отдел 3",
        },
      ],
    },
    {
      name: "Департамент 2",
      children: [
        {
          name: "Отдел 1",
        },
        {
          name: "Отдел 2",
        },
      ],
    },
  ],
};
class HistoryVersionService {
  getTreeByVersion(id: number | string): object {
    if (id === 0) return vehicules0;
    if (id === 1) return vehicules1;
    return vehicules0;
  }
}

export const historyVersionService = new HistoryVersionService();
