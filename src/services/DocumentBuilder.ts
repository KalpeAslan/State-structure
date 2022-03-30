import {pdfmake} from "pdfmake";
import {TGovermentAgencyObject} from "./../store/interface";
import {TGovermentAgencyRaw} from "@/store/interface";
import {generetedTranslatedForm, utils} from "@/utils/utils";
import {language} from "@/store/interfaces";

type TTableColumns = {
    title: string;
    datakey: TDataKey;
};
type TDataKey = "position" | "fullname" | "count";

type TEntityMap = Map<number, any[]>;

export class DocumentBuilder {

    private getLocalizatedDocumentHeader(currentLanguage: language, departamentName?: string) {
        const localizatedHeader = {
            application: {
                ru: `Приложение 2 
          \n к приказу Министру экологии, 
          \n геологиии природных ресурсов 
          \n Республики Казахстан 
          \n от <11> июня 2021 года № 300`,
                kz: `Қосымша 2 
           \n экология министрінің бұйрығына, 
          \n Табиғи ресурстар геологиясы 
          \n Қазақстан Республикасы 
          \n 2021 жылғы <11> маусымдағы № 300`,
                en: `Appendix 2 
          \n to the order of the Minister of Ecology, 
          \n geology of natural resources 
          \n of the Republic of Kazakhstan 
          \n from <11> June 2021, No. 300`
            },
            accepted: {
                ru: `Утверждена 
          \n приказом исполняющего обязанности 
          \n Ответственного секретаря Министерства
          \n Экологии,гелогии и природных 
          \n ресурсов Республики Казахстан 
          \n от 8 января 2021 года №6`,
                kz: `Бекітілді 
          \n міндетін атқарушының бұйрығымен 
          Министрліктің Жауапты хатшысының
          \n экология, геология және табиғи ресурстар 
          \n Қазақстан Республикасы ресурстарының 
          \n 2021 жылғы 8 қаңтардағы №6`,
                en: `Approved 
          \n by the order of the acting 
          \n Executive Secretary of the Ministry
          \n Ecology,geology and natural resources 
          \n resources of the Republic of Kazakhstan 
          \n dated January 8, 2021 No. 6`
            },
            structure: {
                ru: `Структура 
          \n ${departamentName} 
          \n Республики Казахстан 37/123`,
                kz: `Құрылым 
          \n ${departamentName} 
          \n Қазақстан Республикасының 37/123`,
                en: `Structure 
          \n ${departamentName} 
          \n Republic of Kazakhstan 37/123`
            }
        }
        return {
            application: localizatedHeader.application[currentLanguage],
            accepted: localizatedHeader.accepted[currentLanguage],
            structure: localizatedHeader.structure[currentLanguage]
        }
    }

    private readonly localizatedColumns = {
        post: {
            ru: 'Должность',
            kz: 'Лауазымы',
            en: 'Должность'
        },
        FCs: {
            ru: 'ФИО',
            kz: 'Аты-жөні',
            en: 'FCs'
        },
        role: {
            ru: 'Роль',
            kz: 'Рөлі',
            en: 'Role'
        }
    }

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
            (acc, {nameRus, nameKaz, nameEng, status, id}) => {
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

    makePdf(gaStructureRaw: TGovermentAgencyRaw, currentLanguage: language) {
        const tableBody = () => {
            const departaments = this.buildDocumentAsObject(gaStructureRaw);
            const res = departaments.reduce((acc, departament) => {
                acc.push([
                    {
                        text: utils.fixPdfName(utils.translate(departament as unknown as generetedTranslatedForm, currentLanguage)),
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
                departament.positions && departament.positions["forEach"](({nameRu, employees}) => {
                    const employeeUsername: string = employees
                        ? employees[0].userObject.username
                        : "";
                    const employeeRole: string = employees
                        ? employees[0].userObject.rolesList[0].nameRus
                        : "";
                    return acc.push([
                        "",
                        {
                            text: utils.fixPdfName(utils.translate(departament as unknown as generetedTranslatedForm, currentLanguage)),
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
                    text: this.getLocalizatedDocumentHeader(currentLanguage).application,
                    style: "headerDoc",
                    alignment: "right",
                },
                {
                    text: this.getLocalizatedDocumentHeader(currentLanguage).accepted,
                    alignment: "right",
                    style: "headerDoc",
                },
                {
                    //@ts-ignore
                    text: this.getLocalizatedDocumentHeader(currentLanguage, utils.translate(gaStructureRaw.ddepartmentIinDto as generetedTranslatedForm, currentLanguage)).structure,
                    style: "header",
                    alignment: "center",
                },
                {
                    table: {
                        widths: [20, 300, 90, 70],
                        style: "tableHeader",
                        body: [
                            ["", this.localizatedColumns.post[currentLanguage], this.localizatedColumns.FCs[currentLanguage], this.localizatedColumns.role[currentLanguage]],
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
                    lineHeight: 0.7,
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
