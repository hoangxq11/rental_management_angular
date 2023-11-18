import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { RoomDto } from 'src/app/commons/dto/room';
import { ModalAdminCreateRoomComponent } from '../modal/modal-admin-create-room/modal-admin-create-room.component';
import { RoomService } from './../../../services/room.service';

@Component({
  selector: 'app-admin-motel-room',
  templateUrl: './admin-motel-room.component.html',
  styleUrls: ['./admin-motel-room.component.scss']
})
export class AdminMotelRoomComponent {

  constructor(
    private modalService: NzModalService,
    private notification: NzNotificationService,
    private roomService: RoomService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllRoom();
  }

  listOfDisplayData: RoomDto[] = [];

  total = 1;
  loading = true;
  pageSize = 10;
  pageIndex = 1;

  getAllRoom(): void {
    this.roomService.getAllRoom().subscribe(response => {
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

  showModalCreateRoom(): void {
    const modal = this.modalService.create({
      nzTitle: 'Thêm mới phòng trọ',
      nzContent: ModalAdminCreateRoomComponent,
      nzWidth: 750,
    });
    modal.afterClose.subscribe(() => this.getAllRoom())
  }

  onViewDetail(roomId: number): void {
    this.modalService.confirm({
      nzTitle: '<i>Xác nhận</i>',
      nzContent: '<b>Bạn muốn xem thông tin chi tiết của phòng #' + roomId + '</b>',
      nzOnOk: () => this.router.navigate(['/admin/room', roomId])
    });
  }
}
