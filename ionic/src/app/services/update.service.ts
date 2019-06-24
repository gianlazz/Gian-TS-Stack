import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(
    private swUpdate: SwUpdate
    ) { 
      if (this.swUpdate.isEnabled) {
        this.swUpdate.available.subscribe(() => {
            if(confirm("New version available. Load New Version?")) {
                window.location.reload();
            }
        });
      } else {
        console.log('swUpdate not enabled.');
      }
    }

  checkForUpdate() {
    console.log("checking if sw is enabled.")
      if (this.swUpdate.isEnabled) {
        this.swUpdate.checkForUpdate().then(() => {
          console.log("Checking for updates...");
        }).catch((error) => {
          console.log("Error when checking for update", error);
      });
    } else {
      console.log('swUpdate not enabled.');
    }
  }

  updateToLatest(): void {
    console.log('Update to latest version.');
    this.swUpdate.activateUpdate().then(() => document.location.reload());
  }
}
