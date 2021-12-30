import { pdfmake } from "pdfmake";
import { TGovermentAgencyObject } from "./../store/interface";
import { TGovermentAgencyRaw } from "@/store/interface";
import {utils} from "@/utils/utils";

type TTableColumns = {
  title: string;
  datakey: TDataKey;
};
type TDataKey = "position" | "fullname" | "count";

type TEntityMap = Map<number, any[]>;
export class DocumentBuilder {
  buildDocumentAsObject(
    gaStructureRaw: TGovermentAgencyRaw
  ): TGovermentAgencyObject {
    const reducer = (acc: TEntityMap, entity, parentType: string) => {
      if (entity.status) {
        //Если тип равен должности
        if (parentType === "departmentId") {
          entity.employees = entity.employees
            ? [...entity.employees, empoyees.get(entity.id)].flat()
            : empoyees.get(entity.id);
        }
        if (acc.has(entity[parentType])) {
          acc.get(entity[parentType]).push(entity);
        } else {
          acc.set(entity[parentType], [entity]);
        }
      }
    };

    const empoyees = gaStructureRaw.employeeDto.reduce(
      (acc: TEntityMap, employee) => {
        reducer(acc, employee, "position");
        return acc;
      },
      new Map()
    );
    const positions = gaStructureRaw.positionsDto.reduce(
      (acc: TEntityMap, position) => {
        reducer(acc, position, "departmentId");
        return acc;
      },
      new Map()
    );
    const departaments = gaStructureRaw.departmentDto.reduce(
      (acc, { nameRus, nameKaz, nameEng, status, id }) => {
        if (status) {
          acc.push({
            nameRus,
            nameKaz,
            nameEng,
            positions: positions.get(id),
          });
        }
        return acc;
      },
      []
    );
    return departaments;
  }

  makePdf(gaStructureRaw: TGovermentAgencyRaw) {
    const tableBody = () => {
      const departaments = this.buildDocumentAsObject(gaStructureRaw);
      const res = departaments.reduce((acc, departament) => {
          acc.push([
              {
                  text: utils.fixPdfName(departament.nameRus),
                  colSpan: 4,
                  style: {
                      bold: true,
                  },
                  alignment: "center",
              },
              {},
              {},
              {},
          ]);
          departament.positions && departament.positions["forEach"](({ nameRu, employees }) => {
              console.log(employees)
              const employeeUsername: string = employees
                  ? employees[0].userObject.username
                  : "";
              const employeeRole: string = employees
                  ? employees[0].userObject.rolesList[0].nameRus
                  : "";
              return acc.push([
                  "",
                  {
                      text: utils.fixPdfName(nameRu),
                      style: "position",
                  },
                  employeeUsername,
                  employeeRole
              ]);
          });

        return acc;
      }, []);
      return res;
    };
    const dd = {
      content: [
        {
          text: `Приложение 2 
          \n к приказу Министру экологии, 
          \n геологиии природных ресурсов 
          \n Республики Казахстан 
          \n от <11> июня 2021 года № 300`,
          style: "headerDoc",
          alignment: "right",
        },
        {
          text: `Утверждена 
          \n приказом исполняющего обязанности 
          \n Ответственного секретаря Министерства
          \n Экологии,гелогии и природных 
          \n ресурсов Республики Казахстан 
          \n от 8 января 2021 года №6`,
          alignment: "right",
          style: "headerDoc",
        },
        {
          text: `Структура 
          \n ${gaStructureRaw.ddepartmentIinDto.nameRus} 
          \n Республики Казахстан 37/123`,
          style: "header",
          alignment: "center",
        },
        {
          table: {
            widths: [20, 300, 90, 70],
            style: "tableHeader",
            body: [
              ["", "Должность", "ФИО", "Роль"],
              ...tableBody(),
            ],
          },
        },
      ],
      styles: {
        header: {
          bold: true,
          lineHeight: 0.8,
          margin: [0, 0, 20, 20],
        },
        headerDoc: {
          lineHeight: 0.5,
          marginBottom: 10,
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          lineHeight: 0.5,
        },
      },
    };
    window["pdfMake"]["createPdf"](dd).download();
  }
}

export const documentBuilder = new DocumentBuilder();
