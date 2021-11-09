import { IGovermentAgencyRaw } from "@/store/interface";
import autoTable from "jspdf-autotable";
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
        if (positionsParentDepartament) {
          tableRoads.push(tr(positionsParentDepartament.nameRus));
          tableRoads.push(td(position.nameRus));
          if (positionsParentDepartament.employees)
            positionsParentDepartament.employees.forEach((employee) =>
              tableRoads.push(employee["nameRus"])
            );
        }
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
    this.demo(source);
    source.innerHTML += documentAsPdf;
    const head = [["ID", "Country", "Index", "Capital"]];
    const data = [
      [1, "Finland", 7.632, "Helsinki"],
      [2, "Norway", 7.594, "Oslo"],
      [3, "Denmark", 7.555, "Copenhagen"],
      [4, "Iceland", 7.495, "Reykjavík"],
      [5, "Switzerland", 7.487, "Bern"],
      [9, "Sweden", 7.314, "Stockholm"],
      [73, "Belarus", 5.483, "Minsk"],
    ];

    const doc = new jsPDF();
    autoTable(doc, {
      head: head,
      body: data,
      didDrawCell: (data) => {
        console.log(data.column.index);
      },
    });

    doc.save("table.pdf");
    return "";
  }

  demo(source) {
    var pdf = new window["jsPDF"]("p", "pt", "letter");
    // source can be HTML-formatted string, or a reference
    // to an actual DOM element from which the text will be scraped.

    // we support special element handlers. Register them with jQuery-style
    // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
    // There is no support for any other type of selectors
    // (class, of compound) at this time.
    let specialElementHandlers = {
      // element with id of "bypass" - jQuery style selector
      "#bypassme": function (element, renderer) {
        // true = "handled elsewhere, bypass text extraction"
        return true;
      },
    };
    let margins = {
      top: 80,
      bottom: 60,
      left: 40,
      width: 522,
    };
    // all coords and widths are in jsPDF instance's declared units
    // 'inches' in this case
    console.log(source);
    pdf.fromHTML(
      source, // HTML string or DOM elem ref.
      margins.left, // x coord
      margins.top,
      {
        // y coord
        width: margins.width, // max width of content on PDF
        elementHandlers: specialElementHandlers,
      },
      function (dispose) {
        // dispose: object with X, Y of the last line add to the PDF
        //          this allow the insertion of new lines after html
        pdf.save("MyColumn.pdf");
      },
      margins
    );
  }
}

export const documentBuilder = new DocumentBuilder();
