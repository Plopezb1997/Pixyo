import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, AbstractControlDirective } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-show-errors',
    templateUrl: './show-errors.component.html',
    styleUrls: ['./show-errors.component.css']
})
export class ShowErrorsComponent {
    @Input()
    private control: AbstractControlDirective | AbstractControl;

    @Input()
    private force:boolean;

    constructor(private translate: TranslateService) {
        const language = sessionStorage.getItem('language') ? sessionStorage.getItem('language') : translate.getDefaultLang();
        translate.use(language);
    }

    private readonly errorMessages = {
        'required': (params) => this.translate.instant("validations.required"),
        'minlength': (params) => this.translate.instant("validations.minlength", { minlength: params.requiredLength }),
        'maxlength': (params) => this.translate.instant("validations.maxlength", { maxlength: params.requiredLength }),
        'min': (params) => this.translate.instant("validations.min", { min: params.min }),
        'max': (params) => this.translate.instant("validations.max", { max: params.max }),
        'pattern': (params) => this.translate.instant("validations.pattern"),
        'email': (params) => this.translate.instant("validations.email"),
        'date': (params) => this.translate.instant("validations.date"),
        'matchpassword': (params) => this.translate.instant("validations.matchpassword"),
        'matcholdpassword': (params) => this.translate.instant("validations.matcholdpassword"),
        'number': (params) => this.translate.instant("validations.number"),
        'double': (params) => this.translate.instant("validations.double"),
        'ngbDate': (params) => this.translate.instant("validations.pattern"),
        'datelessthan': (params) => this.translate.instant("validations.datelessthan", { dateini: params.dateini, datefin: params.datefin }),
        'datelessthaneq': (params) => this.translate.instant("validations.datelessthaneq", { dateini: params.dateini, datefin: params.datefin }),
        'lessthan': (params) => this.translate.instant("validations.lessthan", { valueini: params.valueini, valuefin: params.valuefin }),
        'lessthaneq': (params) => this.translate.instant("validations.lessthaneq", { valueini: params.valueini, valuefin: params.valuefin }),
        'greaterThanValue': (params) => this.translate.instant("validations.greaterThanValue", { initialText: params.initialText, finalText: params.finalText }),
        'greaterOrEqualValue': (params) => this.translate.instant("validations.greaterOrEqualValue", { initialText: params.initialText, finalText: params.finalText }),
        'lessThanValue': (params) => this.translate.instant("validations.lessThanValue", { initialText: params.initialText, finalText: params.finalText }),
        'lessOrEqualValue': (params) => this.translate.instant("validations.lessOrEqualValue", { initialText: params.initialText, finalText: params.finalText }),
        'notzero': (params) => this.translate.instant("validations.notzero"),
        'positive': (params) => this.translate.instant("validations.positive"),
        'incorrect': (params) => this.translate.instant("validations.incorrect"),
        'custom': (params) => params,
        'mask': (params) => '',

    };
    shouldShowErrors(): boolean {
        return (this.control &&
            this.control.errors &&
            (this.control.dirty || this.control.touched)||this.force);
    }

    listOfErrors(): string[] {
        return Object.keys(this.control.errors)
            .map(field => this.getMessage(field, this.control.errors[field], this.control));
    }

    getError(): string {
        const errors = Object.keys(this.control.errors)
            .map(field => this.getMessage(field, this.control.errors[field], this.control));
        return errors[0];
    }
    private getMessage(type: string, params: any, control: any) {
        let fname = this.getControlName(control);
        fname = fname.replace('_', ' ').replace(' id', '').toLowerCase();
        fname = fname.replace(/\b\w/g, l => l.toUpperCase());
        const msg = type === 'error' ? params : this.errorMessages[type](params);
        return msg.replace('##FIELD##', fname);
    }

    getControlName(c: AbstractControl): string | null {
        const formGroup = c.parent.controls;
        return Object.keys(formGroup).find(name => c === formGroup[name]) || null;
    }
}
