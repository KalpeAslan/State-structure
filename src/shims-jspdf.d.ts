declare module "jspdf" {
  import { jsPDF } from "jspdf";
  interface jsPDF{
   autoTable: (...args): void => {};
  } 
  export { jsPDF };
}

declare module "jspdf-autotable" {
  import { autoTable } from "jspdf-autotable";
  export default autoTable;
}
