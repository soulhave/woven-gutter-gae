import { Component, OnInit } from '@angular/core';
import { FeaturesService } from '../services/features.service';
import { filter, flatMap, reduce, map, debounce, toArray, catchError } from 'rxjs/operators';
import { Feature } from "../model/feature.model"
import { empty } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.scss']
})
export class FeatureListComponent implements OnInit {

  features:Feature[] = [];
  showLoad = true;
  errorMessage: string = null;
  constructor(private service: FeaturesService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getFilteredFeatures(null);
  }

  getFilteredFeatures(searchQuery) {
    this.showLoad = true;
    this.service.loadAll().pipe(
      flatMap(
        (d) => {
          this.features = [];
          return d;
        }
      ),
      filter(
        (data: Feature) => {
          if(searchQuery == null || searchQuery == '') {
            return true;
          }
          
          if(data.id.toLowerCase().indexOf(searchQuery) > -1){
            return true;
          }

          return false;

        }
      ),
      reduce<Feature, Feature[]>(
        (acc: Feature[], d: Feature) => {
          if(!(acc instanceof Array)) {
            acc = [acc];
          }
          acc.push(d);
          return acc;
        }
      ),
      catchError(
        (err, caught) => {
          this.errorMessage = err.message;
          console.error("Error Toggle :: ", caught, "::",  err.message);
          this.handleErrors(err.message);
          return empty();
        }
      )
    ).subscribe(      
      (data) => {
        if(!(data instanceof Array)) {
          return this.features = [data];
        }

        return this.features = data;
      },
      err => {
        this.errorMessage = err.message;
        console.log(err.message);
        this.handleErrors(err.message);
      },
      () => {
        this.showLoad = false;
      }
    )
  }

  getFeature(item) {
    if (item && "id" in item) {
      var _item = item.id.split(":");
      if (_item.length == 2) {
        _item = [_item[1]];
      }

      _item = _item[0].split("#");

      return `${_item[0]} ${_item[1]} ${_item[2]}`
    }

  }

  getFeatureParent(item) {
    if (item && "id" in item) {
      var _item = item.id.split(":");
      if (_item.length == 2) {
        return this.getFeature({ "id": _item[0] });
      }
    }
  }

  hasParent(item) {
    if (item && "id" in item) {
      return item.id.indexOf(":") !== -1;
    }
  }

  isOn(flag: Feature) {
    
    if(this.isSync(flag)){
      return false;
    }

    if (flag && "state" in flag) {
      if (flag.state == 'GLOBAL') {
        return true;
      }
    }
    
    return false;
  }

  isOff(flag: Feature) {
    if(this.isSync(flag)){
      return false;
    }

    return !this.isOn(flag);
  }

  isSync(flag: Feature) {
    if(flag.sync) {
      return true;
    }
    return false;
  }

  onPatchFeature(feature: Feature, state: string): void {
    this.update_list_features(feature, state);
  }

  private handleErrors(err: string): void {
    this.snackBar.open(err, 'CLOSE', {duration: 5000, horizontalPosition: 'left'});
  }

  private update_list_features(feature: Feature, state: string) {
    feature.sync = true;
    this.service.updateStatus(feature, state).subscribe(
      resp => {
        let _index = this.features.findIndex(v => v.id == resp.id);
        feature.state = state;
        this.features[_index] = resp;
        feature.sync = false;
      },
      err => {
        console.error("err", err);
        this.errorMessage = err.message;
      },
      () => {
        console.info("complete");
        feature.sync = false;
      }
    )
  }
}
