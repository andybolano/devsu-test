import { AbstractControl, FormGroup } from '@angular/forms';

export interface SearchReactiveForm {
    searchInput: string;
}

type SearchFormControl = { [key in keyof SearchReactiveForm]: AbstractControl }
export type SearchForm = FormGroup & { value: SearchReactiveForm, controls: SearchFormControl}