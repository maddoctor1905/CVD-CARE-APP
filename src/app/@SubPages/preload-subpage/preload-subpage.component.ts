import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CheckForUpdateService} from '../../@Services/check-for-update.service';

@Component({
  selector: 'app-preload-subpage',
  templateUrl: './preload-subpage.component.html',
  styleUrls: ['./preload-subpage.component.scss']
})
export class PreloadSubpageComponent implements OnInit {
  get taskName(): string {
    return this._taskName;
  }

  set taskName(value: string) {
    this._taskName = value;
  }

  @Input() cardMode = false;
  @Output() done = new EventEmitter<void>();
  private currentIndex = 0;
  private assets = [
    '/10-es2015.9331e81f9aa30d8ab80c.js',
    '/10-es5.9331e81f9aa30d8ab80c.js',
    '/11-es2015.b458cc47db7936008676.js',
    '/11-es5.b458cc47db7936008676.js',
    '/12-es2015.2e244d553e117bc38acf.js',
    '/12-es2015.ca33954f2dadf3904972.js',
    '/12-es5.2e244d553e117bc38acf.js',
    '/12-es5.ca33954f2dadf3904972.js',
    '/13-es2015.67bbadd8154c5fff676f.js',
    '/13-es2015.a7d1866c6b2ab1dd7a34.js',
    '/13-es2015.cd125e9e730df4d8ab51.js',
    '/13-es2015.f8da96626ae28cb744c8.js',
    '/13-es5.67bbadd8154c5fff676f.js',
    '/13-es5.a7d1866c6b2ab1dd7a34.js',
    '/13-es5.cd125e9e730df4d8ab51.js',
    '/13-es5.f8da96626ae28cb744c8.js',
    '/14-es2015.261193fcbdb123accc3a.js',
    '/14-es5.261193fcbdb123accc3a.js',
    '/15-es2015.60b7cacd2e1b829a2a6d.js',
    '/15-es2015.de4e3e2ea78584a4d4a4.js',
    '/15-es5.60b7cacd2e1b829a2a6d.js',
    '/15-es5.de4e3e2ea78584a4d4a4.js',
    '/16-es2015.980e366762df053d0d69.js',
    '/16-es5.980e366762df053d0d69.js',
    '/6-es2015.8606de27ebd2e8402e3d.js',
    '/6-es5.8606de27ebd2e8402e3d.js',
    '/7-es2015.bf39b4cae9435aa607ba.js',
    '/7-es5.bf39b4cae9435aa607ba.js',
    '/8-es2015.a118aaad2f10b673ab21.js',
    '/8-es5.a118aaad2f10b673ab21.js',
    '/9-es2015.4c1ca7a700658eccb5b3.js',
    '/9-es2015.869f71320d60394c9c9b.js',
    '/9-es5.4c1ca7a700658eccb5b3.js',
    '/9-es5.869f71320d60394c9c9b.js',
    '/assets/caretaker.png',
    '/assets/css/bulma-checkradio.min.css',
    '/assets/doctor.png',
    '/assets/exercise.jpeg',
    '/assets/i18n/en-US.json',
    '/assets/i18n/fr-FR.json',
    '/assets/i18n/kn-IN.json',
    '/assets/icons/dislike.png',
    '/assets/icons/icon-128x128.png',
    '/assets/icons/icon-144x144.png',
    '/assets/icons/icon-152x152.png',
    '/assets/icons/icon-192x192.png',
    '/assets/icons/icon-384x384.png',
    '/assets/icons/icon-512x512.png',
    '/assets/icons/icon-72x72.png',
    '/assets/icons/icon-96x96.png',
    '/assets/icons/like.png',
    '/assets/logo.png',
    '/assets/logo_with_text_dark.png',
    '/assets/logo_with_text_white.png',
    '/assets/vegetables.jpg',
    '/assets/woman.svg',
    '/common-es2015.dc9d62a8550c306eec1a.js',
    '/common-es5.dc9d62a8550c306eec1a.js',
    '/dexie.min.js',
    '/favicon.ico',
    '/index.html',
    '/main-es2015.23130975ebe092504d18.js',
    '/main-es2015.8db0509b568bf06979c2.js',
    '/main-es2015.b263f7f6640fab09999c.js',
    '/main-es5.23130975ebe092504d18.js',
    '/main-es5.8db0509b568bf06979c2.js',
    '/main-es5.b263f7f6640fab09999c.js',
    '/manifest.webmanifest',
    '/ngsw-worker.js',
    '/polyfills-es2015.0ed4e5313a48d5aed4f8.js',
    '/polyfills-es5.a47da67aa9106f424095.js',
    '/runtime-es2015.02e907ddf9e7f2c4bfe1.js',
    '/runtime-es2015.208d2b194042ea2ba05f.js',
    '/runtime-es2015.5bdf9d4019d0d8b24c24.js',
    '/runtime-es2015.b19f568401e52feca153.js',
    '/runtime-es2015.d699ad2ec3644916c033.js',
    '/runtime-es5.02e907ddf9e7f2c4bfe1.js',
    '/runtime-es5.208d2b194042ea2ba05f.js',
    '/runtime-es5.5bdf9d4019d0d8b24c24.js',
    '/runtime-es5.b19f568401e52feca153.js',
    '/runtime-es5.d699ad2ec3644916c033.js',
    '/safety-worker.js',
    '/styles.828cd94950cfaeb10bd8.css',
    '/sw-master.js',
    '/sw-sync.js',
    '/worker-basic.min.js',
  ];
  @Input() title = '';
  private _taskName = '';

  constructor(
    private httpClient: HttpClient,
    private checkForUpdateService: CheckForUpdateService,
  ) {
    this.checkForUpdateService.checkForUpdate();
  }

  ngOnInit() {
    this.init();
  }

  getPercent() {
    const max = this.assets.length;
    const current = this.currentIndex;
    return (current / max) * 100;
  }

  private wait(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  private async init() {
    const result: any = await this.getAssets().toPromise();
    this.assets = [];
    result.assetGroups.forEach((assetGroup) => {
      this.assets.push(...assetGroup.urls);
    });
    this.preload();
  }

  private async preload() {
    let result;
    for (const asset of this.assets) {
      this.taskName = asset;
      let attempt = 0;
      // tslint:disable-next-line:no-conditional-assignment
      while (!(result = (await caches.match(asset)))) {
        console.info('[SW] Caching: ' + asset);
        attempt++;
        await this.wait(1000);
        if (attempt === 10) {
          console.error(`Trying to cache 10 times: ${asset}`);
        }
      }
      if (result) {
        this.currentIndex++;
      }
      if (!this.assets[this.currentIndex]) {
        this.done.emit();
      }
    }
  }

  private getAssets() {
    const headers = new HttpHeaders();
    headers.append('ngsw-bypass', 'true');
    return this.httpClient.get('/ngsw.json?ngsw-bypass=true', {headers});
  }
}
