import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersService } from 'src/app/services/user.service';
import { query, getText, queryById, setInputValue } from 'src/testing';

import { RegisterFormComponent } from './register-form.component';

fdescribe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let userService: jasmine.SpyObj<UsersService>

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UsersService', ['create'])

    await TestBed.configureTestingModule({
      declarations: [RegisterFormComponent],
      imports: [
        ReactiveFormsModule,
      ],
      providers: [
        { provide: UsersService, useValue: spy }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should the form be invalid', () => {

    component.form.patchValue({
      name: 'name',
      email: 'email@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      checkTerms: false,
    })

    expect(component.form.invalid).toBeTruthy();

  })

  describe('test for emailField', () => {
    it('should the email be invalid', () => {
      component.emailField?.setValue('esto es un correo');
      expect(component.emailField?.invalid).withContext('wrong emial').toBeTruthy();

      component.emailField?.setValue('');
      expect(component.emailField?.invalid).withContext('empty').toBeTruthy();
    })
    
    it('should the email be invalid FROM UI', () => {
      
      const inputDe = query(fixture, 'input#email');
      const inputEL:HTMLInputElement = inputDe.nativeElement;

      inputEL.value = 'esto no es un correo';
      inputEL.dispatchEvent(new Event('input'));
      inputEL.dispatchEvent(new Event('blur'));
      fixture.detectChanges();
      expect(component.emailField?.invalid).withContext('wrong email').toBeTruthy();

      const textError = getText(fixture, 'emailField-email');
      expect(textError).toEqual("*It's not a email")

    })

    it('should the email be invalid FROM UI with helpers', () => {
      
      setInputValue(fixture, 'input#email', 'Its not a valid email');
      
      fixture.detectChanges();
      expect(component.emailField?.invalid).withContext('wrong email').toBeTruthy();

      const textError = getText(fixture, 'emailField-email');
      expect(textError).toEqual("*It's not a email")

    })
 
  })

  describe('test for password field', () => {

    it('should the password field be invalid', () => {

      component.passwordField?.setValue('');
      expect(component.passwordField?.invalid).withContext('empty').toBeTruthy();

      component.passwordField?.setValue('12345');
      expect(component.passwordField?.invalid).withContext('12345').toBeTruthy();
      
      component.passwordField?.setValue('adfasdfasdfasdfadsfadf');
      expect(component.passwordField?.invalid).withContext('text dont contain number').toBeTruthy();

      component.passwordField?.setValue('adfasdfasdfasdfadsfadf1');
      expect(component.passwordField?.valid).withContext('right').toBeTruthy();

    })

  })


});
