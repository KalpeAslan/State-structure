import { IGovermentAgencyRaw } from "@/store/interface";
import jsPDF from "jspdf";

export class DocumentBuilder {
  buildDocument(gaStructureRaw: IGovermentAgencyRaw): string {
    const applicationHeader =
      "Приложение2 \n к приказу Министру экологии, \n геологиии природных ресурсов \n Республики Казахстан \n от <11> июня 2021 года № 300";
    const applyHeader =
      "Утверждена \n приказом исполняющего обязанности \n Ответственного секретаря Министерства Экологии,\n гелогии и природных \n ресурсов Республики Казахстан \n от 8 января 2021 года №6";

    const tr = (item: string): string => `<tr>${item}</tr>`;
    const th = (item: string): string => `<th>${item}</th>`;
    const td = (item: string): string => `<td>${item}</td>`;
    const tableRoads = () => {
      const tableRoads: string[] = [];
      gaStructureRaw.positionsDto.forEach((position) => {
        const positionsParentDepartament = gaStructureRaw.departmentDto.filter(
          (departament) => departament.id === position.departmentId
        )[0];
        tableRoads.push(tr(positionsParentDepartament.nameRus));
        tableRoads.push(td(position.nameRus));
        if (positionsParentDepartament.employees)
          positionsParentDepartament.employees.forEach((employee) =>
            tableRoads.push(employee["nameRus"])
          );
      });
    };
    const documentAsPdf = `
            <h1>Структура</h1>
            <h3>Комитета геологии</h3>
            <h3>Комитета геологии</h3>
            <h3>Министерства Экологии, гелогии и природных ресурсов </h3>
            <h3>Республики Казахстан</h3>
            <table>
            <thead>${gaStructureRaw.ddepartmentIinDto.nameRus}</thead>
            <tbody>
            ${tableRoads()}
            </tbody>
            </table>
          `;
    const source: HTMLDivElement = document.createElement("div");
    source.innerHTML += documentAsPdf;
    var doc = new jsPDF();
    var elementHandler = {
      "#ignorePDF": function (element, renderer) {
        return true;
      },
    };
    console.log(source);
    doc.fromHTML(source, 15, 15, {
      width: 180,
      elementHandlers: elementHandler,
    });

    doc.output("dataurlnewwindow");
    doc.save("test.pdf");
    return "";
  }
}

export const documentBuilder = new DocumentBuilder();
