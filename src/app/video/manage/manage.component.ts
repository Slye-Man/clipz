import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { ClipService } from 'src/app/services/clip.service';
import IClip from 'src/app/models/clip.model';
import { ModalService } from 'src/app/services/modal.service';
@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  videoOrder = '1'
  clips: IClip[] = []

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clipService: ClipService,
    private modal: ModalService
    ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params: Params) => {
      this.videoOrder = params['sort'] === '2' ? params['sort'] : '1'
    })
    this.clipService.getUserClips().subscribe(docs => {
      this.clips = []

      docs.forEach(doc => {
        this.clips.push({
          docID: doc.id,
          ...doc.data()
        })
      })
    })
  }
    sort(event: Event) {
      const { value } = (event.target as HTMLSelectElement)

      this.router.navigate([], {
        //configuration object
        relativeTo: this.route,
        queryParams: {
          sort: value
        }
      })
    }

    openModal($event: Event, clip: IClip) {
      $event.preventDefault()

      this.modal.toggleModal('editClip')
    }
}
