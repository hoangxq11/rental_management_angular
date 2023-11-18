import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ClientDto } from 'src/app/commons/dto/client';
import { ClientService } from 'src/app/services/client.service';
import { ModalAdminCreateClientComponent } from '../modal/modal-admin-create-client/modal-admin-create-client.component';

@Component({
  selector: 'app-admin-client-list',
  templateUrl: './admin-client-list.component.html',
  styleUrls: ['./admin-client-list.component.scss']
})
export class AdminClientListComponent {
  constructor(
    private modalService: NzModalService,
    private notification: NzNotificationService,
    private clientService: ClientService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllClient();
  }

  listOfDisplayData: ClientDto[] = [];

  total = 1;
  loading = true;
  pageSize = 10;
  pageIndex = 1;

  getAllClient(): void {
    this.clientService.getAllClient().subscribe(response => {
      this.listOfDisplayData = response.data;
      this.loading = false;
    }, error => {
      this.notification.create(
        'error',
        'Lỗi server',
        'Lỗi truyền tải dữ liệu'
      );
    });
  }

  showModalCreateClient(): void {
    const modal = this.modalService.create({
      nzTitle: 'Thêm mới khách hàng',
      nzContent: ModalAdminCreateClientComponent,
      nzWidth: 750,
    });
    modal.afterClose.subscribe(() => this.getAllClient())
  }

  onProcessContract(clientId: number): void {
    this.modalService.confirm({
      nzTitle: '<i>Xác nhận</i>',
      nzContent: '<b>Bạn muốn xem lịch sử thuê phòng của khách hàng này?</b>',
      nzOnOk: () => this.router.navigate(['/admin/contract', clientId])
    });
  }
}
