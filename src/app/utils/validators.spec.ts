import { FormControl, FormGroup } from '@angular/forms';
import { UsersService } from '../services/user.service';
import { MyValidators } from './validators'
import { mockObservable } from '../../testing/async-data';

describe('Test for MyValidators', () => {

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

    describe('Test for validateEmailAsync', () => {

        it('should return null with email valid', (doneFn) => {
            // Arrange
            const userService: jasmine.SpyObj<UsersService> = jasmine.createSpyObj('UsersService', ['isAvailableByEmail']);
            const control = new FormControl('nico@mail.com');
            // Act
            userService.isAvailableByEmail.and.returnValue(mockObservable({ isAvailable: true }));
            const validator = MyValidators.validateEmailAsync(userService);
            validator(control).subscribe(rta => {
                expect(rta).toBeNull();
                doneFn();
            });


        })

    })

})