import { FormControl, FormGroup } from '@angular/forms';
import { MyValidators } from './validators'

fdescribe('Test for MyValidators', () => {

    describe('Test for validPassword', () => {

        it('should return null when password is right', () => {
            //Arrange
            const control = new FormControl();
            control.setValue('password1')

            //Act
            const rta = MyValidators.validPassword(control);

            //Assert
            expect(rta).toBeNull();
        });

        it('should return null when password is wrong', () => {
            //Arrange
            const control = new FormControl();
            control.setValue('password')

            //Act
            const rta = MyValidators.validPassword(control);

            //Assert
            expect(rta?.invalid_password).toBeTrue();
        });

    })

    describe('Test for matchPasswords', () => {

        it('should return null', () => {
            const group = new FormGroup({
                password: new FormControl('123456'),
                confirmPassword: new FormControl('123456')
            })

            const rta = MyValidators.matchPasswords(group);
            expect(rta).toBeNull()
        })

        it('should return obj with the error', () => {
            const group = new FormGroup({
                password: new FormControl('123456'),
                confirmPassword: new FormControl('1234sdfsdf56')
            })

            const rta = MyValidators.matchPasswords(group);
            expect(rta?.match_password).toBeTrue()
        })

        it('should return obj with the error', () => {
            const group = new FormGroup({
                otro: new FormControl('123456'),
                otro2: new FormControl('1234sdfsdf56')
            })

            const fn = () => {
                MyValidators.matchPasswords(group)
            }

            expect(fn).toThrow(new Error('matchsPasswords: field not found'))
        })

    })


})