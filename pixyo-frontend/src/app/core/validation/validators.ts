import { ValidatorFn, FormGroup, ValidationErrors } from "@angular/forms";

export class ValidatorsCustom{

    validador: ValidatorFn = (control: FormGroup): ValidationErrors => {
    
        let ok: boolean = true;
        /*if(!!this.searchSeguimientoPresupuestoForm&&
          !!this.searchSeguimientoPresupuestoForm.get('mesfineq') && 
          !!this.searchSeguimientoPresupuestoForm.get('aniofineq')){
          let mes: number = this.searchSeguimientoPresupuestoForm.get('mesfineq').value;
          let ano: number = this.searchSeguimientoPresupuestoForm.get('aniofineq').value;
          if (mes && ano && mes > 0 && mes <= 12 && ano.toString().length == 4 && this.fechaMaxFin && this.fechaInicio) {
            let inputDate = this.utilService.generarFecha(mes, ano, true);
            if (inputDate == null || this.utilService.compararFechasWithoutHours(inputDate, new Date(this.fechaMaxFin)) > 0 ||
              this.utilService.compararFechasWithoutHours(inputDate, new Date(this.fechaInicio)) < 0) {
              ok = false;
              this.utilService.showError('V184');
            }
          } else {
            ok = false;
          }
        }
        let errorMap = new Map();*/
        
        
        return !ok ? { 'custom': 'Revise este campo' } : null;
      }
    
}