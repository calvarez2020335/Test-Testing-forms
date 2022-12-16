import { By } from "@angular/platform-browser";
import { ComponentFixture } from '@angular/core/testing';
import { Type } from "@angular/core";

export function query<T>(fixture: ComponentFixture<T>, selector:string) {
    return fixture.debugElement.query(By.css(selector));
}

export function queryById<T>(fixture: ComponentFixture<T>, testId:string) {
    const selector = `[data-testid="${testId}"]`
    return query(fixture, selector);
}

export function queryAll<T>(fixture: ComponentFixture<T>, selector:string) {
    return fixture.debugElement.queryAll(By.css(selector));
}

export function queryAllByDirective<T, D>(fixture: ComponentFixture<T>, directive:Type<D>) {
    return fixture.debugElement.queryAll(By.directive(directive));
}