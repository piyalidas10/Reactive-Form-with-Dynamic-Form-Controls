import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ValidatorFn, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public registerForm: FormGroup;
  formFields = [];
  isShow = false;
  submitData = [];

  constructor(private formBuilder: FormBuilder) {
    this.formFields = [
      {
        key: 'email',
        input: 'email',
        valids: [
          {
            valid: 'required',
            error: 'email is required'
          },
          {
            valid: 'email',
            error: 'email must be valid'
           }
        ]
      },
      {
        key: 'username',
        input: 'text',
        valids: [
          {
            valid: 'required',
            error: 'username is required'
          },
          {
            valid: 'pattern',
            validator: '^[a-zA-Z]+$',
            error: 'username is accept only text'
          },
          {
            valid: 'minlength',
            length: 3,
            error: 'username must be at least 3 characters'
          }
        ]
      },
      {
        key: 'password',
        input: 'password',
        valids: [
          {
            valid: 'required',
            error: 'password is required'
          },
          {
            valid: 'minlength',
            length: 6,
            error: 'Password must be at least 6 characters'
          }
        ]
      },
      {
        key: 'phone',
        input: 'text',
        valids: [
          {
            valid: 'required',
            error: 'phone is required'
          },
          {
            valid: 'pattern',
            validator: '^[0-9]{10}$',
            error: 'phone is accept only number and maximum 10 numbers '
          }
        ]
      },
      {
        key: 'gender',
        input: 'radio',
        items: [
          {
            name: 'male',
            id: 0
          },
          {
            name: 'female',
            id: 1
          }
        ],
        valids: []
      },
      {
        key: 'country',
        input: 'select',
        items: [
          {
            name: 'india',
            id: 0
          },
          {
            name: 'bangladesh',
            id: 1
          }
        ],
        valids: [
          {
            valid: 'required',
            error: 'country is required'
          }
        ]
      }
    ];
   }

  ngOnInit() {
    this.makeForm();
  }

  makeForm() {
    this.registerForm = new FormGroup({});
    this.formFields.forEach(element => {
      const validatorsArr: ValidatorFn[] = [];
      if (element.valids.length > 0) {

        element.valids.forEach(val => {
          if (val.valid === 'required') {
            validatorsArr.push(Validators[val.valid]);
          }
          if (val.valid === 'pattern') {
            validatorsArr.push(
              Validators.pattern(val.validator)
            );
          }
          if (val.valid === 'minlength') {
            validatorsArr.push(
              Validators.minLength(val.length)
            );
          }
        });

        this.registerForm.addControl(element.key, new FormControl('', validatorsArr));
      } else {
        this.registerForm.addControl(element.key, new FormControl(''));
      }
      console.log('validatorsArr => ', validatorsArr);
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
    this.submitData = this.registerForm.value;
    console.log('Form value => ', this.registerForm.value);
    console.log('Form Valid => ', this.registerForm.valid);
    console.log('Form control => ', this.registerForm.controls);
    console.log('Form password errors => ', this.registerForm.get('password').errors);
    console.log('Form username errors => ', this.registerForm.get('username').errors);
  }

}
