import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FeatureListComponent } from './feature-list/feature-list.component';
import { fromEvent } from 'rxjs';
import { filter, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { Feature } from './model/feature.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{
  title = 'frontend';
  keys_not_allowed = ['Enter', 'Meta', 'Shift', 'Alt']
  @ViewChild(FeatureListComponent, {static: false}) 
  featureListComponent: FeatureListComponent;

  @ViewChild("generalSearchInput", {static: false}) 
  generalSearchInput;

  ngAfterViewInit(): void {
    fromEvent<KeyboardEvent>(this.generalSearchInput.inputElement.nativeElement, 'keyup')
          .pipe(
            filter(Boolean),
            debounceTime(700),
            distinctUntilChanged(),
            tap(
              (text: KeyboardEvent) => {
                let _value = this.generalSearchInput.inputElement.nativeElement.value;

                if(this.keys_not_allowed.indexOf(text.key) > -1){
                  console.log("Not allowed key:", text.key);
                  return;
                }

                this.featureListComponent.getFilteredFeatures(_value);
              }
              

            )
          ).subscribe()
  }

  onSearchChange(searchValue: string): void {  
    this.featureListComponent.getFilteredFeatures(searchValue);
  }
  
}
