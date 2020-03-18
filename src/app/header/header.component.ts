import { Component, OnInit, HostListener } from '@angular/core';
import { MessageItem } from '../message/message-item';
import { MessageHistoryService } from '../message/message-history.service';
import { SidebarService } from '../sidebar/sidebar.service';

@Component({
  styleUrls: ['./header.component.css'],
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  sidebarVisible: boolean = true;
  username: string = 'Guest';
  messages: MessageItem[];

  constructor(private messageHistoryService: MessageHistoryService, public sidebarService: SidebarService) {
  }

  @HostListener('window:resize', ['$event'])
  checkForMobile() {
    if (window.innerWidth < 640) {
      this.sidebarService.toggleHide$.next();
    }
  }

  doLogout(): void {
    if (this.isLoggedIn) {
      // this.keycloak.logout();
    }
  }

  doAccount(): void {
    if (this.isLoggedIn) {
      // window.open(this.accountUrl, '_blank');
    }
  }

  clear() {
    this.messageHistoryService.clear();
  }

  ngOnInit(): void {
    this.messages = this.messageHistoryService.getHistory();
  }

  ngAfterViewInit(): void {
    // hide sidebar by default on mobile
    this.checkForMobile();
  }
}
