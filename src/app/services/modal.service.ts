import { Injectable } from '@angular/core';

interface IModal {
  id: string;
  visible: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modals: IModal[] = []

  constructor() { }

  register(id: string) {
    this.modals.push({
      id,
      visible: false
    })
  }

  isModalOpen(id: string) : boolean {
    //the following line may be confusing in use of a double negation
    return !!this.modals.find(element => element.id === id)?.visible
    //another way to do this is wrapping it around the boolean
    // Boolean(this.modals.find(element => element.id === id)?.visible)
    //for best practice
  }

  toggleModal(id: string) {
    const modal = this.modals.find(element => element.id === id)

    if(modal) {
      modal.visible = !modal.visible
    }
    // this.visible = !this.visible
  }
}
